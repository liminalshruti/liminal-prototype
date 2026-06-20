// Tiny zero-dependency static dev server with live-reload.
// Serves the prototype directory; reloads connected browsers when files change.
//
//   npm run dev      → http://localhost:5173
//
// Watches: index.html + any other html/css/js/svg/png at the root.
// Reload mechanism: SSE channel + injected client snippet.

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import { workingTreeState } from './lib/server/working-tree-state.mjs';

const ROOT = path.dirname(url.fileURLToPath(import.meta.url));
const PORT = process.env.PORT ? Number(process.env.PORT) : 5173;
const HOST = '127.0.0.1';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.otf':  'font/otf',
  '.ttf':  'font/ttf',
  '.txt':  'text/plain; charset=utf-8',
  '.md':   'text/plain; charset=utf-8',
};

const RELOAD_SNIPPET = `
<script>
(() => {
  const es = new EventSource('/__reload');
  es.onmessage = (e) => {
    if (e.data === 'reload') location.reload();
  };
  es.onerror = () => { /* server restarted; the next reload will reconnect */ };
  console.log('[liminal dev] live-reload connected · http://${HOST}:${PORT}');
})();
</script>
`;

// SSE clients
const clients = new Set();

function broadcastReload() {
  for (const res of clients) {
    try { res.write('data: reload\n\n'); } catch (_) { /* drop */ }
  }
}

// Watch root for changes (recursive). Reload only on real SOURCE edits — never on
// scratch/tooling churn (Playwright console logs, screenshots, _scratch) which
// otherwise cause an infinite reload loop: a browser interaction writes a log →
// watcher reloads → the reload writes a log → … (the week-long flicker bug).
const SKIP_DIRS = new Set(['.git', 'node_modules', '.playwright-mcp', '_scratch', '_baseline']);
// Only these extensions are real source worth reloading for.
const WATCH_EXT = new Set(['.html', '.css', '.js', '.mjs', '.json', '.svg', '.otf', '.woff', '.woff2']);
const watcher = fs.watch(ROOT, { recursive: true }, (eventType, filename) => {
  if (!filename) return;
  const segs = filename.split(path.sep);
  if (segs.some((s) => SKIP_DIRS.has(s))) return;          // any scratch/tooling dir at any depth
  if (filename === 'server.mjs') return;                   // ignore self
  if (segs.some((s) => s.startsWith('.'))) return;         // any dotfile/dotdir at any depth
  const base = segs[segs.length - 1];
  if (base.startsWith('_') && base.endsWith('.png')) return; // session screenshot scratch (_*.png)
  if (!WATCH_EXT.has(path.extname(base).toLowerCase())) return; // non-source (logs, images, md…)
  console.log(`[liminal dev] changed: ${filename} → reload`);
  broadcastReload();
});
process.on('SIGINT', () => { watcher.close(); process.exit(0); });

// Working-tree state for the Substrate Console (/__state) is provided by
// lib/server/working-tree-state.mjs — read-only git introspection, extracted
// 2026-06-18. Called below with ROOT as the repo root.

// Resolve a request path to a file under ROOT, defaulting to index.html.
function resolveFile(reqPath) {
  let p = decodeURIComponent(reqPath.split('?')[0]);
  if (p === '/' || p === '') p = '/index.html';

  // Normalize and prevent traversal
  const abs = path.normalize(path.join(ROOT, p));
  if (!abs.startsWith(ROOT)) return null;

  try {
    const stat = fs.statSync(abs);
    if (stat.isDirectory()) {
      const candidate = path.join(abs, 'index.html');
      if (fs.existsSync(candidate)) return candidate;
      return null;
    }
    return abs;
  } catch (_) {
    return null;
  }
}

const server = http.createServer((req, res) => {
  // Working-tree state for the Substrate Console (read-only git introspection)
  if (req.url === '/__state') {
    workingTreeState(ROOT).then((state) => {
      res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
      res.end(JSON.stringify(state));
    });
    return;
  }

  // SSE endpoint
  if (req.url === '/__reload') {
    res.writeHead(200, {
      'content-type': 'text/event-stream',
      'cache-control': 'no-cache',
      'connection': 'keep-alive',
      'access-control-allow-origin': '*',
    });
    res.write(': connected\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  const file = resolveFile(req.url);
  if (!file) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end(`404 not found · ${req.url}`);
    return;
  }

  const ext = path.extname(file).toLowerCase();
  const mime = MIME[ext] || 'application/octet-stream';

  // For HTML, inject the reload snippet so any page gets live-reload
  if (ext === '.html') {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) { res.writeHead(500); res.end(String(err)); return; }
      let body = data.includes('</body>')
        ? data.replace('</body>', RELOAD_SNIPPET + '</body>')
        : data + RELOAD_SNIPPET;
      res.writeHead(200, {
        'content-type': mime,
        'cache-control': 'no-store',
      });
      res.end(body);
    });
    return;
  }

  // Other files: stream raw
  res.writeHead(200, {
    'content-type': mime,
    'cache-control': 'no-store',
  });
  fs.createReadStream(file).pipe(res);
});

// Index the cut catalog: scan cuts/*.html, pull each <title>, skip _scaffolds.
function indexCuts() {
  const dir = path.join(ROOT, 'cuts');
  let files;
  try { files = fs.readdirSync(dir); } catch { return []; }
  return files
    .filter(f => f.endsWith('.html') && !f.startsWith('_'))
    .sort()
    .map(f => {
      let title = '';
      try {
        const html = fs.readFileSync(path.join(dir, f), 'utf8');
        const m = html.match(/<title>([^<]*)<\/title>/i);
        title = m ? m[1].trim() : '';
      } catch { /* unreadable · leave title blank */ }
      return { file: f, title };
    });
}

server.listen(PORT, HOST, () => {
  const cuts = indexCuts();
  console.log('');
  console.log(`  liminal-prototype · dev server`);
  console.log(`  ────────────────────────────────`);
  console.log(`  → http://${HOST}:${PORT}`);
  console.log(`  → watching: ${ROOT}`);
  console.log(`  → save any .html/.css/.js to live-reload`);
  console.log('');
  console.log(`  cuts · ${cuts.length} indexed`);
  console.log(`  ────────────────────────────────`);
  for (const { file, title } of cuts) {
    const slug = file.replace(/\.html$/, '');
    const label = title || '(untitled)';
    console.log(`  ${slug.padEnd(20)} ${label}`);
    console.log(`  ${' '.repeat(20)} → http://${HOST}:${PORT}/cuts/${file}`);
  }
  console.log('');
  console.log(`  ─ Ctrl+C to stop`);
  console.log('');
});
