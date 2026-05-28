// ../liminal-test/src/correction/log.ts
class InMemoryEventLog {
  events = [];
  append(event) {
    this.events.push(Object.freeze({ ...event }));
  }
  all() {
    return this.events;
  }
  byCase(caseId) {
    return this.events.filter((e) => ("caseId" in e) && e.caseId === caseId);
  }
}

// ../liminal-test/src/lib/ipc.ts
var _log = new InMemoryEventLog;
function setEventLog(log) {
  _log = log;
}
function invoke(command, args) {
  switch (command) {
    case "append_event":
      _log.append(args);
      return { ok: true };
    case "get_events":
      return _log.all();
    case "get_case_events":
      return _log.byCase(args.caseId);
    default:
      throw new Error(`unrouted command: ${command}`);
  }
}

// ../liminal-test/src/deliberation/specialists.ts
function cite(bundle, pred) {
  return bundle.filter(pred).map((e) => e.id);
}
var kinematics = (bundle) => {
  const cited = cite(bundle, (e) => e.modality === "ais" || e.modality === "sar");
  return {
    input: { name: "kinematics", evidence: bundle, claim: { posterior: 0.62 } },
    raw: {
      verdict: cited.length >= 2 ? "supported" : "weakened",
      summary: "Track shows a dark gap consistent with a brief AIS disablement.",
      cited_observation_ids: cited,
      confidence: 0.62,
      unsupported_assertions: []
    }
  };
};
var identity = (bundle) => {
  const cited = cite(bundle, (e) => e.type === "IDENTITY_FEATURE" || e.source === "GFW" || e.source === "OPENSANCTIONS");
  return {
    input: {
      name: "identity",
      evidence: bundle,
      claim: { posterior: 0.5 },
      identity_features: { dimensions_similarity_score: null, flag_match: false, imo_match: false }
    },
    raw: {
      verdict: "supported",
      summary: "Second identity appears within the predicted ellipse; OFAC/GFW MMSI mismatch.",
      cited_observation_ids: cited,
      confidence: 0.5,
      unsupported_assertions: []
    }
  };
};
var signalIntegrity = (bundle) => {
  const flags = cite(bundle, (e) => e.type === "INTEGRITY_FLAG");
  const contested = flags.length > 0;
  const cited = flags.length ? flags : cite(bundle, () => true).slice(0, 2);
  return {
    input: { name: "signalIntegrity", evidence: bundle, claim: { posterior: contested ? 0.45 : 0.7 } },
    raw: {
      verdict: contested ? "weakened" : "supported",
      summary: contested ? "Source integrity contested: identity churn with single-source confirmation." : "Sources corroborate across modalities.",
      cited_observation_ids: cited,
      confidence: contested ? 0.45 : 0.7,
      unsupported_assertions: []
    }
  };
};
var intent = (bundle) => {
  const indicators = cite(bundle, (e) => e.type === "INTENT_INDICATOR");
  const cited = indicators.length ? indicators : cite(bundle, () => true).slice(0, 2);
  return {
    input: { name: "intent", evidence: bundle, claim: { posterior: 0.45 } },
    raw: {
      verdict: "supported",
      summary: "Pattern is consistent with hostile loitering.",
      cited_observation_ids: cited,
      confidence: 0.45,
      unsupported_assertions: ["hostile loitering"]
    }
  };
};
var collection = (bundle) => {
  const cited = cite(bundle, (e) => e.type === "COLLECTION_GAP" || e.modality === "eo" || e.modality === "sar");
  return {
    input: { name: "collection", evidence: bundle, claim: { posterior: 0.6 } },
    raw: {
      verdict: cited.length >= 2 ? "supported" : "weakened",
      summary: "Second-source EO/SAR tasking would resolve the identity contest.",
      cited_observation_ids: cited,
      confidence: 0.6,
      unsupported_assertions: []
    }
  };
};
var visual = (bundle) => {
  const cited = cite(bundle, (e) => e.modality === "eo");
  return {
    input: { name: "visual", evidence: bundle, claim: { posterior: cited.length ? 0.6 : 0.3 } },
    raw: {
      verdict: cited.length ? "supported" : "refused",
      summary: cited.length ? "EO chip shows a hull profile consistent with the primary track." : "No imagery available for the contested window.",
      cited_observation_ids: cited,
      confidence: cited.length ? 0.6 : 0.3,
      unsupported_assertions: []
    }
  };
};
var SPECIALISTS = {
  kinematics,
  identity,
  signalIntegrity,
  intent,
  collection,
  visual
};

// ../liminal-test/src/deliberation/orchestrator.ts
function runReads(bundle, question) {
  const names = Object.keys(SPECIALISTS);
  const reads = names.map((n) => SPECIALISTS[n](bundle));
  if (question) {
    const intentRead = reads.find((r) => r.input.name === "intent");
    if (intentRead)
      intentRead.input.question = question;
  }
  return reads;
}

// ../liminal-test/src/domain/types.ts
var DEFAULT_CONFIDENCE_FLOOR = 0.4;

// ../liminal-test/src/guard/guard.ts
var INTENT_PHRASE = /\b(hostile|threat|intent)\b/i;
function hasIntentIndicator(evidence) {
  return evidence.some((e) => e.type === "INTENT_INDICATOR");
}
function citedEvidence(input, raw) {
  const ids = new Set(raw.cited_observation_ids);
  return input.evidence.filter((e) => ids.has(e.id));
}
function stripUnsupported(summary, unsupported) {
  const stripped = [];
  let next = summary;
  for (const phrase of unsupported ?? []) {
    if (!phrase)
      continue;
    if (next.includes(phrase)) {
      next = next.split(phrase).join("[redacted]");
      stripped.push(phrase);
    }
  }
  return { summary: next, stripped };
}
function applyGuard(input, raw) {
  const layers = [];
  let verdict = raw.verdict;
  let forced_refused = false;
  let downgraded = false;
  const floor = input.confidence_floor ?? DEFAULT_CONFIDENCE_FLOOR;
  const cited = citedEvidence(input, raw);
  if (input.question && INTENT_PHRASE.test(input.question) && !hasIntentIndicator(input.evidence)) {
    layers.push("question_intent_phrasing_no_indicator");
    if (verdict !== "refused") {
      verdict = "refused";
      forced_refused = true;
    }
  }
  if (verdict === "supported" && raw.cited_observation_ids.length < 2) {
    layers.push("citation_min");
    verdict = "refused";
    forced_refused = true;
  }
  if (verdict !== "refused" && input.name === "intent" && !hasIntentIndicator(input.evidence)) {
    layers.push("intent_indicator");
    verdict = "refused";
    forced_refused = true;
  }
  if (verdict !== "refused" && (input.name === "kinematics" || input.name === "intent")) {
    if (cited.length > 0 && cited.every((e) => e.source === "SHODAN")) {
      layers.push("shodan_vessel_behavior");
      verdict = "refused";
      forced_refused = true;
    }
  }
  if (verdict !== "refused" && input.claim?.posterior !== undefined && input.claim.posterior < floor) {
    layers.push("posterior_floor");
    verdict = "refused";
    forced_refused = true;
  }
  if (verdict === "supported" && input.name === "identity") {
    const idf = input.identity_features;
    if (!idf || idf.dimensions_similarity_score === null && !idf.flag_match && !idf.imo_match) {
      layers.push("identity_weak");
      verdict = "weakened";
      downgraded = true;
    }
  }
  if (verdict === "supported") {
    if (cited.length > 0 && cited.every((e) => e.modality === "text" && !e.observed_at && !e.geometry)) {
      layers.push("textual_only");
      verdict = "weakened";
      downgraded = true;
    }
  }
  const { summary, stripped } = stripUnsupported(raw.summary, raw.unsupported_assertions);
  const guard = {
    applied_layers: layers,
    forced_refused,
    downgraded,
    stripped_assertions: stripped
  };
  return {
    name: input.name,
    verdict,
    summary,
    cited_observation_ids: raw.cited_observation_ids,
    confidence: raw.confidence,
    unsupported_assertions: raw.unsupported_assertions,
    source: "heuristic",
    guard
  };
}

// ../liminal-test/src/guard/index.ts
function guardAll(reads) {
  return reads.map(({ input, raw }) => applyGuard(input, raw));
}

// ../liminal-test/src/custody/case.ts
var DEFAULT_ACTIONS = [
  { id: "escalate", label: "Escalate to command", rank: 1 },
  { id: "request-eo-sar", label: "Request second-source EO/SAR collection", rank: 2 },
  { id: "monitor", label: "Continue monitoring", rank: 3 }
];
function buildCase(caseId, reads, _facts) {
  const contested = reads.some((r) => r.name === "signalIntegrity" && (r.verdict === "weakened" || r.verdict === "refused" || r.guard.applied_layers.length > 0));
  const base = contested ? 0.55 : 0.7;
  const hypotheses = [
    { id: `${caseId}-H1`, label: "Single vessel, identity spoof", posterior: base },
    { id: `${caseId}-H2`, label: "Two distinct vessels", posterior: round(1 - base - 0.1) },
    { id: `${caseId}-H3`, label: "Sensor artifact / dark gap", posterior: 0.1 }
  ];
  const refusals = reads.filter((r) => r.guard.forced_refused).map((r) => ({ name: r.name, layers: r.guard.applied_layers }));
  const actions = contested ? rankBy(DEFAULT_ACTIONS, ["request-eo-sar", "monitor", "escalate"]) : DEFAULT_ACTIONS.map((a) => ({ ...a }));
  return {
    id: caseId,
    hypotheses,
    reads,
    actions,
    signalIntegrity: contested ? "contested" : "clear",
    refusals
  };
}
function applyDoctrine(c, rules, facts) {
  const applied = [];
  let actions = c.actions.map((a) => ({ ...a }));
  for (const rule of rules) {
    const wantsIdentityChurn = rule.conditions.some((x) => x.includes("identity_churn"));
    const wantsSingleSource = rule.conditions.some((x) => x.includes("single_source"));
    const conditionMatches = (!wantsIdentityChurn || facts.identityChurn) && (!wantsSingleSource || facts.singleSource) && (wantsIdentityChurn || wantsSingleSource);
    if (!conditionMatches)
      continue;
    if (rule.action.includes("block_escalation") || rule.action.includes("monitor")) {
      actions = rankBy(actions, ["monitor", "request-eo-sar", "escalate"]).map((a) => a.id === "escalate" ? { ...a, note: `blocked by ${rule.id}` } : a);
      applied.push(rule.id);
    }
  }
  return { case: { ...c, actions }, applied };
}
function rankBy(actions, order) {
  return actions.map((a) => ({ ...a, rank: order.indexOf(a.id) === -1 ? 99 : order.indexOf(a.id) + 1 })).sort((x, y) => x.rank - y.rank);
}
function round(n) {
  return Math.round(n * 100) / 100;
}

// ../liminal-test/src/correction/dsl.ts
var WHEN_THEN = /^\s*WHEN\s+(.+?)\s+THEN\s+(.+?)\s*$/i;
function parseReviewRule(id, text) {
  const m = WHEN_THEN.exec(text);
  if (!m) {
    throw new Error(`Review rule must be 'WHEN <condition> THEN <action>': ${text}`);
  }
  const whenRaw = m[1].trim();
  const thenRaw = m[2].trim();
  const conditions = whenRaw.split(/\s+AND\s+/i).map((s) => s.trim().toLowerCase());
  return { id, text, when: whenRaw, then: thenRaw, conditions, action: thenRaw.toLowerCase() };
}

// ../liminal-test/src/ontology/spine.ts
function projectOntology(events) {
  const nodes = [];
  const edges = [];
  let edgeId = 0;
  const ensureNode = (n) => {
    if (!nodes.find((x) => x.id === n.id))
      nodes.push(n);
  };
  for (const e of events) {
    if (e.kind === "observation.ingested") {
      const caseNodeId = `case:${e.caseId}`;
      ensureNode({ id: caseNodeId, type: "case", title: e.caseId });
      for (const o of e.observations) {
        ensureNode({ id: `obs:${o.id}`, type: "observation", title: o.summary ?? o.id, case_id: e.caseId });
        edges.push({ id: `e${edgeId++}`, type: "DERIVED_FROM", from: caseNodeId, to: `obs:${o.id}`, created_by: "system" });
      }
    }
    if (e.kind === "review_rule.signed") {
      ensureNode({ id: `rule:${e.ruleId}`, type: "reviewRule", title: e.text });
    }
    if (e.kind === "case.committed" && e.chosenHypothesisId) {
      ensureNode({ id: `hyp:${e.chosenHypothesisId}`, type: "hypothesis", title: e.chosenHypothesisId, case_id: e.caseId });
      edges.push({ id: `e${edgeId++}`, type: "REVIEWED_BY", from: `case:${e.caseId}`, to: `hyp:${e.chosenHypothesisId}`, created_by: "operator" });
    }
  }
  const ruleNodes = nodes.filter((n) => n.type === "reviewRule");
  const caseNodes = nodes.filter((n) => n.type === "case");
  for (const r of ruleNodes) {
    for (const c of caseNodes) {
      edges.push({ id: `e${edgeId++}`, type: "APPLIES_TO", from: r.id, to: c.id, created_by: "operator" });
    }
  }
  return { nodes, edges };
}

// ../liminal-test/src/vault/vault.ts
function projectVault(events) {
  return events.filter((e) => e.kind === "case.committed").map((e) => ({
    caseId: e.caseId,
    chosenHypothesisId: e.chosenHypothesisId,
    disposition: e.disposition,
    committed_at: e.ts
  }));
}
function auditChain(events) {
  return events.map((e) => ({
    ts: e.ts,
    kind: e.kind,
    caseId: "caseId" in e ? e.caseId : undefined
  }));
}

// ../liminal-test/src/fixtures/hormuz.ts
var T0 = "2026-05-28T02:00:00Z";
var T1 = "2026-05-28T02:14:00Z";
var CASE_1_BUNDLE = [
  {
    id: "ais-1",
    type: "OBSERVATION",
    source: "AIS",
    modality: "ais",
    observed_at: T0,
    geometry: { lat: 26.57, lon: 56.25 },
    summary: "MMSI-111 track prior to the dark gap"
  },
  {
    id: "ais-2",
    type: "OBSERVATION",
    source: "AIS",
    modality: "ais",
    observed_at: T1,
    geometry: { lat: 26.59, lon: 56.31 },
    summary: "MMSI-222 appears inside the Kalman-predicted ellipse"
  },
  {
    id: "sar-1",
    type: "OBSERVATION",
    source: "SENTINEL",
    modality: "sar",
    observed_at: T1,
    geometry: { lat: 26.58, lon: 56.3 },
    summary: "SAR return near the track break"
  },
  {
    id: "id-1",
    type: "IDENTITY_FEATURE",
    source: "GFW",
    modality: "text",
    summary: "GFW registry shows an MMSI/flag mismatch"
  },
  {
    id: "id-2",
    type: "IDENTITY_FEATURE",
    source: "OPENSANCTIONS",
    modality: "text",
    summary: "OFAC-listed hull associated with the second identity"
  },
  {
    id: "flag-1",
    type: "INTEGRITY_FLAG",
    source: "ROSHAK",
    modality: "text",
    summary: "Single-source confirmation only — integrity contested"
  }
];
var CASE_2_BUNDLE = [
  {
    id: "ais-3",
    type: "OBSERVATION",
    source: "AIS",
    modality: "ais",
    observed_at: T0,
    geometry: { lat: 26.41, lon: 56.12 },
    summary: "MMSI-333 track prior to a dark gap"
  },
  {
    id: "ais-4",
    type: "OBSERVATION",
    source: "AIS",
    modality: "ais",
    observed_at: T1,
    geometry: { lat: 26.44, lon: 56.18 },
    summary: "MMSI-444 appears nearby with a churned identity"
  },
  {
    id: "id-3",
    type: "IDENTITY_FEATURE",
    source: "GFW",
    modality: "text",
    summary: "GFW registry mismatch on the second identity"
  },
  {
    id: "flag-2",
    type: "INTEGRITY_FLAG",
    source: "ROSHAK",
    modality: "text",
    summary: "Single-source confirmation only — integrity contested"
  }
];

// ../liminal-test/src/browser.ts
var now = () => new Date().toISOString();
function createCustodySession() {
  setEventLog(new InMemoryEventLog);
  function ingest(caseId, bundle, facts) {
    invoke("append_event", {
      kind: "observation.ingested",
      ts: now(),
      caseId,
      observations: bundle
    });
    const guarded = guardAll(runReads(bundle));
    invoke("append_event", { kind: "reads.completed", ts: now(), caseId, reads: guarded });
    invoke("append_event", {
      kind: "guard.verdict.recorded",
      ts: now(),
      caseId,
      verdicts: guarded.map((g) => ({ name: g.name, verdict: g.verdict, layers: g.guard.applied_layers }))
    });
    return { reads: guarded, case: buildCase(caseId, guarded, facts) };
  }
  function commit(caseId, c) {
    invoke("append_event", {
      kind: "case.committed",
      ts: now(),
      caseId,
      chosenHypothesisId: c.hypotheses[0]?.id ?? null,
      disposition: c.actions[0]?.id ?? "monitor"
    });
  }
  function signRule(ruleId, text) {
    const rule = parseReviewRule(ruleId, text);
    invoke("append_event", {
      kind: "review_rule.signed",
      ts: now(),
      ruleId,
      text,
      when: rule.when,
      then: rule.then
    });
    return rule;
  }
  function activeRules() {
    return invoke("get_events").filter((e) => e.kind === "review_rule.signed").map((e) => parseReviewRule(e.ruleId, e.text));
  }
  function ingestWithDoctrine(caseId, bundle, facts) {
    const { reads, case: c } = ingest(caseId, bundle, facts);
    const { case: ranked, applied } = applyDoctrine(c, activeRules(), facts);
    return { reads, case: ranked, applied };
  }
  function projections() {
    const events = invoke("get_events");
    return {
      events,
      ontology: projectOntology(events),
      vault: projectVault(events),
      audit: auditChain(events)
    };
  }
  return { ingest, commit, signRule, activeRules, ingestWithDoctrine, projections };
}
export {
  setEventLog,
  runReads,
  projectVault,
  projectOntology,
  parseReviewRule,
  invoke,
  guardAll,
  createCustodySession,
  buildCase,
  auditChain,
  applyDoctrine,
  CASE_2_BUNDLE,
  CASE_1_BUNDLE
};
