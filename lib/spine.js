/* spine.js · the graph-spine ontology, ported to the prototype
 * ══════════════════════════════════════════════════════════════════════
 *
 * A faithful JS port of `liminal-natsec/graph-spine/` (schema.ts · graph.ts ·
 * provenance.ts · archetypes.ts). TypeScript types become runtime validators;
 * everything else is structurally identical, function for function.
 *
 * WHY PORT RATHER THAN INVENT
 * ───────────────────────────
 * The 11 node types and 9 edge types this file carries are not a design
 * exercise — they are the shipped schema of the NatSec Custody submission
 * (top 16 of 102). `graph-spine/schema.ts` opens with a domain-neutrality rule
 * ("Domain adapters must keep domain nouns out of this package; forbidden
 * examples: vessel, AIS, MMSI, AOI, port, harbor") — it was BUILT to travel
 * across domains. Founder owns the schema shape (liminal-natsec/CLAUDE.md,
 * "Shared / overlap": *Schema contract (graph-spine/schema.ts) — Shruti owns
 * shape*). This is a port of our own substrate into our own demo surface.
 *
 * natsec is frozen (its CLAUDE.md: "Do NOT develop new features here"), so this
 * is a one-way copy. If the upstream schema ever moves, this file is the
 * downstream and must be re-synced deliberately — it is NOT a live import.
 *
 * WHAT THE UPSTREAM GIVES US, ALREADY BUILT
 * ─────────────────────────────────────────
 * · traceBack()          — the provenance chain the 3D ontology-travel concept
 *                          animates: actionOption ←TRIGGERS← claim ←SUPPORTS←
 *                          hypothesis →DERIVED_FROM→ anomaly →DERIVED_FROM→
 *                          observation
 * · findContradictions() — the divergence finder, over CONTRADICTS edges
 * · confidence on the EDGE, not the node (EdgeProvenance.confidence 0..1) —
 *   a belief is only as strong as the link that carries it
 * · provenance.created_by — "system" | "operator" | "fixture". An operator
 *   correction is not metadata: it is an edge authored by a human.
 *
 * Source: liminal-natsec/graph-spine/ @ d5cb16d (frozen 2026-07-15)
 */

/* ─── schema.ts ─────────────────────────────────────────────────────── */

export const NODE_TYPES = [
  "observation",
  "entity",
  "track",
  "anomaly",
  "hypothesis",
  "claim",
  "evidence",
  "sourceIntegrityCheck",
  "actionOption",
  "reviewRule",
  "case",
];

export const EDGE_TYPES = [
  "OBSERVED_AS",
  "DERIVED_FROM",
  "SUPPORTS",
  "WEAKENS",
  "CONTRADICTS",
  "TRIGGERS",
  "RECOMMENDS",
  "REVIEWED_BY",
  "APPLIES_TO",
];

export const ARCHETYPE_ROLES = [
  "perception",
  "persistence",
  "epistemic",
  "decision",
  "review_memory",
];

const NODE_TYPE_SET = new Set(NODE_TYPES);
const EDGE_TYPE_SET = new Set(EDGE_TYPES);
const ARCHETYPE_ROLE_SET = new Set(ARCHETYPE_ROLES);

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireString(record, key, label) {
  const value = record[key];
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`${label} must include a non-empty ${key}`);
  }
  return value;
}

function validateTimestamp(value, label) {
  if (typeof value !== "string" || Number.isNaN(Date.parse(value))) {
    throw new Error(`${label} must be an ISO timestamp string`);
  }
}

/* Archetype metadata attaches only to the four judgment-bearing node types
   (archetypes.ts ARCHETYPE_ENABLED_TYPES) — not to raw perception. */
const ARCHETYPE_ENABLED_TYPES = new Set([
  "anomaly",
  "claim",
  "actionOption",
  "reviewRule",
]);

export function supportsArchetypeMetadata(type) {
  return ARCHETYPE_ENABLED_TYPES.has(type);
}

export function archetypeForRole(role) {
  const primaryByRole = {
    perception: "Sage",
    persistence: "Sage",
    epistemic: "Judge",
    decision: "Sovereign",
    review_memory: "Judge",
  };
  return { archetype_primary: primaryByRole[role], archetype_role: role };
}

export function validateArchetypeMetadata(input) {
  if (!isRecord(input)) throw new Error("archetype must be an object");
  if ("archetype_primary" in input && typeof input.archetype_primary !== "string") {
    throw new Error("archetype_primary must be a string when provided");
  }
  if (
    "archetype_role" in input &&
    (typeof input.archetype_role !== "string" ||
      !ARCHETYPE_ROLE_SET.has(input.archetype_role))
  ) {
    throw new Error("archetype_role is unsupported");
  }
  return input;
}

export function validateNode(input) {
  if (!isRecord(input)) throw new Error("Node must be an object");
  requireString(input, "id", "Node");
  const type = requireString(input, "type", "Node");
  requireString(input, "title", "Node");
  if (!NODE_TYPE_SET.has(type)) throw new Error(`Unsupported node type: ${type}`);
  if ("created_at" in input) validateTimestamp(input.created_at, "created_at");
  if ("archetype" in input) validateArchetypeMetadata(input.archetype);
  return input;
}

export function validateEdgeProvenance(input) {
  if (!isRecord(input)) throw new Error("Edge provenance is required");
  validateTimestamp(input.created_at, "provenance.created_at");
  if (typeof input.created_by !== "string" || input.created_by.length === 0) {
    throw new Error("provenance.created_by must be a non-empty string");
  }
  if (
    !Array.isArray(input.source_node_ids) ||
    input.source_node_ids.length === 0 ||
    !input.source_node_ids.every((i) => typeof i === "string" && i.length > 0)
  ) {
    throw new Error("provenance.source_node_ids must be a non-empty string array");
  }
  if (
    "confidence" in input &&
    (typeof input.confidence !== "number" ||
      input.confidence < 0 ||
      input.confidence > 1)
  ) {
    throw new Error("provenance.confidence must be between 0 and 1 when provided");
  }
  return input;
}

export function validateEdge(input) {
  if (!isRecord(input)) throw new Error("Edge must be an object");
  requireString(input, "id", "Edge");
  const type = requireString(input, "type", "Edge");
  requireString(input, "from", "Edge");
  requireString(input, "to", "Edge");
  if (!EDGE_TYPE_SET.has(type)) throw new Error(`Unsupported edge type: ${type}`);
  if (!("provenance" in input)) throw new Error("Edge provenance is required");
  validateEdgeProvenance(input.provenance);
  return input;
}

/* ─── graph.ts ──────────────────────────────────────────────────────── */

export class Graph {
  #nodeMap = new Map();
  #edgeMap = new Map();

  constructor(nodes = [], edges = []) {
    for (const node of nodes) this.addNode(node);
    for (const edge of edges) this.addEdge(edge);
  }

  addNode(input) {
    const node = validateNode(input);
    if (this.#nodeMap.has(node.id)) {
      throw new Error(`Duplicate node id: ${node.id}`);
    }
    this.#nodeMap.set(node.id, node);
    return node;
  }

  addEdge(input) {
    const edge = validateEdge(input);
    if (this.#edgeMap.has(edge.id)) {
      throw new Error(`Duplicate edge id: ${edge.id}`);
    }
    /* Referential integrity is the honesty guarantee: an edge cannot point at
       a node that was never asserted. This is what makes a rendered path a
       claim about real structure rather than a drawing. */
    if (!this.#nodeMap.has(edge.from)) {
      throw new Error(`Edge source node does not exist: ${edge.from}`);
    }
    if (!this.#nodeMap.has(edge.to)) {
      throw new Error(`Edge target node does not exist: ${edge.to}`);
    }
    this.#edgeMap.set(edge.id, edge);
    return edge;
  }

  getNode(id) { return this.#nodeMap.get(id); }

  requireNode(id) {
    const node = this.getNode(id);
    if (!node) throw new Error(`Node not found: ${id}`);
    return node;
  }

  getNodes(type) {
    const nodes = [...this.#nodeMap.values()];
    return type ? nodes.filter((n) => n.type === type) : nodes;
  }

  getEdges(type) {
    const edges = [...this.#edgeMap.values()];
    return type ? edges.filter((e) => e.type === type) : edges;
  }

  outgoing(nodeId, type) {
    return this.getEdges(type).filter((e) => e.from === nodeId);
  }

  incoming(nodeId, type) {
    return this.getEdges(type).filter((e) => e.to === nodeId);
  }

  edgesForNode(nodeId, type) {
    return this.getEdges(type).filter(
      (e) => e.from === nodeId || e.to === nodeId
    );
  }
}

/* ─── provenance.ts ─────────────────────────────────────────────────── */

function firstEdgeToType(graph, edges, endpoint, type) {
  return edges.find((edge) => graph.getNode(edge[endpoint])?.type === type);
}

/* The canonical chain, verbatim from upstream nextTraceEdge(). This ordering IS
   the ontology's spine — the shape the 3D concept travels along. */
function nextTraceEdge(graph, node) {
  if (node.type === "actionOption") {
    return firstEdgeToType(graph, graph.incoming(node.id, "TRIGGERS"), "from", "claim");
  }
  if (node.type === "claim") {
    return firstEdgeToType(graph, graph.incoming(node.id, "SUPPORTS"), "from", "hypothesis");
  }
  if (node.type === "hypothesis") {
    return firstEdgeToType(graph, graph.outgoing(node.id, "DERIVED_FROM"), "to", "anomaly");
  }
  if (node.type === "anomaly") {
    return firstEdgeToType(graph, graph.outgoing(node.id, "DERIVED_FROM"), "to", "observation");
  }
  return undefined;
}

function nextNodeId(node, edge) {
  return edge.from === node.id ? edge.to : edge.from;
}

export function traceBack(graph, nodeId, maxDepth = 8) {
  const start = graph.requireNode(nodeId);
  const steps = [{ node: start }];
  const seen = new Set([start.id]);
  let current = start;

  while (steps.length < maxDepth) {
    const edge = nextTraceEdge(graph, current);
    if (!edge) break;
    const nid = nextNodeId(current, edge);
    if (seen.has(nid)) break;
    const next = graph.requireNode(nid);
    steps.push({ node: next, viaEdge: edge });
    seen.add(next.id);
    current = next;
    if (next.type === "observation") break;
  }

  return { nodeId, nodes: steps.map((s) => s.node), steps };
}

export function findContradictions(graph, claimId) {
  const claim = graph.requireNode(claimId);
  if (claim.type !== "claim") {
    throw new Error(`Expected claim node: ${claimId}`);
  }
  const nodes = [];
  const seen = new Set();
  for (const edge of graph.edgesForNode(claimId, "CONTRADICTS")) {
    const otherId = edge.from === claimId ? edge.to : edge.from;
    if (seen.has(otherId)) continue;
    nodes.push(graph.requireNode(otherId));
    seen.add(otherId);
  }
  return nodes;
}

export function edgeTypesInTrace(trace) {
  return trace.steps.flatMap((s) => (s.viaEdge ? [s.viaEdge.type] : []));
}

/* ─── prototype-local additions (NOT in upstream) ───────────────────── */

/* Polarity classes for rendering. Upstream carries no presentation concern;
   this is the one place this port adds to it, and it is display-only. */
export const EDGE_POLARITY = {
  SUPPORTS: "supports",
  WEAKENS: "weakens",
  CONTRADICTS: "contradicts",
  OBSERVED_AS: "neutral",
  DERIVED_FROM: "neutral",
  TRIGGERS: "neutral",
  RECOMMENDS: "supports",
  REVIEWED_BY: "neutral",
  APPLIES_TO: "neutral",
};

/* An operator correction is an EDGE, authored by a human, with provenance.
   created_by === "operator". Geometry decides the correction_kind:
     inner     · both endpoints inside one read's own trace
     cross     · endpoints in two different reads' traces
     emergence · at least one endpoint the reads never produced
   This is the same taxonomy liminal-desktop persists (migration 001/002),
   derived from position rather than self-reported. */
export function correctionKindFor(edge, traceIdsByRead) {
  const readsTouched = new Set();
  let unknownEndpoint = false;

  for (const endpoint of [edge.from, edge.to]) {
    let found = false;
    for (const [readId, ids] of Object.entries(traceIdsByRead)) {
      if (ids.includes(endpoint)) { readsTouched.add(readId); found = true; }
    }
    if (!found) unknownEndpoint = true;
  }

  if (unknownEndpoint) return "emergence";
  if (readsTouched.size > 1) return "cross";
  return "inner";
}
