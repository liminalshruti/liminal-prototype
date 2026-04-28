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

// Watch root for changes (recursive). Skip .git, node_modules, _baseline (large), server itself.
const SKIP_DIRS = new Set(['.git', 'node_modules']);
const watcher = fs.watch(ROOT, { recursive: true }, (eventType, filename) => {
  if (!filename) return;
  if (SKIP_DIRS.has(filename.split(path.sep)[0])) return;
  if (filename === 'server.mjs') return; // ignore self
  if (/(^|\/)\.[^/]+$/.test(filename)) return; // dotfiles
  console.log(`[liminal dev] changed: ${filename} → reload`);
  broadcastReload();
});
process.on('SIGINT', () => { watcher.close(); process.exit(0); });

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

server.listen(PORT, HOST, () => {
  console.log('');
  console.log(`  liminal-prototype · dev server`);
  console.log(`  ────────────────────────────────`);
  console.log(`  → http://${HOST}:${PORT}`);
  console.log(`  → watching: ${ROOT}`);
  console.log(`  → save any .html/.css/.js to live-reload`);
  console.log(`  ─ Ctrl+C to stop`);
  console.log('');
});
