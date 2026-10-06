#!/usr/bin/env node

import {
  createHash,
  createPublicKey,
  verify as verifySignature,
} from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const PACKET_V1 = "liminal.founder_packet.v1";
const PACKET_V2 = "liminal.founder_packet.v2";
const PACKET_V3 = "liminal.founder_packet.v3";
const CONTRACTS = new Map([
  [PACKET_V1, "ed25519:v1"],
  [PACKET_V2, "ed25519:v1+packet.v2"],
  [PACKET_V3, "ed25519:v1+packet.v3"],
]);
const PACKET_PROVIDER_IDS = new Set([
  "anthropic",
  "openai",
  "gemini",
  "openrouter",
  "xai",
  "mistral",
  "groq",
  "cerebras",
  "opencode-zen",
  "opencode-go",
  "ollama",
  "lm-studio",
  "other",
]);
const ENDPOINT_BOUND_PROVIDER_IDS = new Set(["ollama", "lm-studio", "other"]);
const PACKET_FIELDS_V1 = [
  "id",
  "context",
  "user_correction",
  "chosen_agent",
  "correction_kind",
  "runtime_mode",
  "input_mode",
  "tray_session_id",
  "source_candidate_id",
  "pen_hints",
  "kind",
  "source_packet_id",
  "corpus_refs",
  "created_at",
];
const PACKET_FIELDS_V2 = [
  ...PACKET_FIELDS_V1,
  "decision",
  "revisit_at",
  "panel_signals",
];
const PACKET_FIELDS_V3 = [
  ...PACKET_FIELDS_V2,
  "provider_id",
  "model_id",
  "execution_receipt_id",
  "endpoint_fingerprint",
];
const READ_FIELDS_V1 = [
  "id",
  "packet_id",
  "agent_name",
  "archetype",
  "quoted",
  "situation",
  "hidden_risk",
  "next_move",
  "refusal",
  "refusal_kind",
  "ordinal",
  "created_at",
];
const READ_FIELDS_V2 = [
  ...READ_FIELDS_V1,
  "claim",
  "evidence_ref",
  "confidence",
  "uncertainty",
  "suggested_correction",
  "packet_impact",
];
const CORRECTION_FIELDS = [
  "id",
  "packet_id",
  "source_type",
  "original",
  "corrected",
  "category",
  "correction_kind",
  "created_at",
];

class BundleError extends Error {
  constructor(kind, message) {
    super(message);
    this.name = "BundleError";
    this.kind = kind;
  }
}

function failInvalid(message) {
  throw new BundleError("invalid", message);
}

function failContent(message) {
  throw new BundleError("content", message);
}

function failSignature(message) {
  throw new BundleError("signature", message);
}

function failPublicKey(message) {
  throw new BundleError("public-key", message);
}

function failCorrections(message) {
  throw new BundleError("corrections", message);
}

function failSignerPin(message) {
  throw new BundleError("signer-pin", message);
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function expectRecord(value, path, fail = failInvalid) {
  if (!isRecord(value)) fail(`${path} must be a JSON object`);
  return value;
}

function expectExactKeys(value, expected, path, fail = failInvalid) {
  const actual = Object.keys(expectRecord(value, path, fail)).sort();
  const wanted = [...expected].sort();
  if (actual.length !== wanted.length || actual.some((key, index) => key !== wanted[index])) {
    fail(`${path} keys do not match ${wanted.join(", ")}`);
  }
}

function expectString(value, path, fail = failInvalid) {
  if (typeof value !== "string") fail(`${path} must be a string`);
}

function expectNullableString(value, path, fail = failInvalid) {
  if (value !== null && typeof value !== "string") {
    fail(`${path} must be a string or null`);
  }
}

function stableStringify(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  return `{${Object.keys(value)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
    .join(",")}}`;
}

function sha256Hex(value) {
  return createHash("sha256").update(value).digest("hex");
}

function validateCanonicalPayload(document) {
  expectString(document.schema, "packet.json.schema", failContent);
  if (!CONTRACTS.has(document.schema)) {
    failInvalid(`unsupported canonical version: ${document.schema}`);
  }

  const hasCorrections = Object.hasOwn(document, "corrections");
  expectExactKeys(
    document,
    hasCorrections ? ["schema", "packet", "reads", "corrections"] : ["schema", "packet", "reads"],
    "packet.json",
    failContent,
  );

  const packetFields =
    document.schema === PACKET_V3
      ? PACKET_FIELDS_V3
      : document.schema === PACKET_V2
        ? PACKET_FIELDS_V2
        : PACKET_FIELDS_V1;
  const readFields = document.schema === PACKET_V1 ? READ_FIELDS_V1 : READ_FIELDS_V2;
  expectExactKeys(document.packet, packetFields, "packet.json.packet", failContent);
  for (const field of ["id", "context", "input_mode", "kind", "created_at"]) {
    expectString(document.packet[field], `packet.json.packet.${field}`, failContent);
  }
  for (const field of packetFields.filter(
    (field) =>
      ![
        "id",
        "context",
        "input_mode",
        "kind",
        "created_at",
        "provider_id",
        "model_id",
        "execution_receipt_id",
      ].includes(field),
  )) {
    expectNullableString(document.packet[field], `packet.json.packet.${field}`, failContent);
  }
  if (document.schema === PACKET_V3) {
    for (const field of ["provider_id", "model_id", "execution_receipt_id"]) {
      expectString(document.packet[field], `packet.json.packet.${field}`, failContent);
      if (document.packet[field].trim().length === 0) {
        failContent(`packet.json.packet.${field} must not be blank`);
      }
    }
    if (document.packet.runtime_mode !== "live") {
      failContent("packet.v3 runtime_mode must be live");
    }
    if (!PACKET_PROVIDER_IDS.has(document.packet.provider_id)) {
      failContent("packet.json.packet.provider_id is not part of packet.v3");
    }
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
        document.packet.execution_receipt_id,
      )
    ) {
      failContent("packet.json.packet.execution_receipt_id must be a lowercase UUIDv4");
    }
    if (
      document.packet.endpoint_fingerprint !== null &&
      !/^[0-9a-f]{64}$/.test(document.packet.endpoint_fingerprint)
    ) {
      failContent("packet.json.packet.endpoint_fingerprint must be null or lowercase SHA-256 hex");
    }
    const endpointBound = ENDPOINT_BOUND_PROVIDER_IDS.has(document.packet.provider_id);
    if (endpointBound !== (document.packet.endpoint_fingerprint !== null)) {
      failContent(
        endpointBound
          ? "custom/local packet.v3 attribution requires an endpoint fingerprint"
          : "fixed-provider packet.v3 attribution must not carry an endpoint fingerprint",
      );
    }
  }

  if (!Array.isArray(document.reads)) failContent("packet.json.reads must be an array");
  const ordinals = new Set();
  const reads = document.reads.map((read, index) => {
    expectExactKeys(read, readFields, `packet.json.reads[${index}]`, failContent);
    for (const field of [
      "id",
      "packet_id",
      "agent_name",
      "archetype",
      "quoted",
      "situation",
      "created_at",
    ]) {
      expectString(read[field], `packet.json.reads[${index}].${field}`, failContent);
    }
    if (read.packet_id !== document.packet.id) {
      failContent(`packet.json.reads[${index}].packet_id does not match packet.id`);
    }
    for (const field of readFields.filter(
      (field) =>
        ![
          "id",
          "packet_id",
          "agent_name",
          "archetype",
          "quoted",
          "situation",
          "created_at",
          "ordinal",
          "confidence",
        ].includes(field),
    )) {
      expectNullableString(read[field], `packet.json.reads[${index}].${field}`, failContent);
    }
    if (!Number.isInteger(read.ordinal)) {
      failContent(`packet.json.reads[${index}].ordinal must be an integer`);
    }
    if (ordinals.has(read.ordinal)) failContent(`duplicate read ordinal: ${read.ordinal}`);
    ordinals.add(read.ordinal);
    if (document.schema !== PACKET_V1) {
      if (
        read.confidence !== null &&
        (typeof read.confidence !== "number" ||
          !Number.isFinite(read.confidence) ||
          read.confidence < 0 ||
          read.confidence > 1)
      ) {
        failContent(`packet.json.reads[${index}].confidence must be null or a number in [0,1]`);
      }
    }
    return Object.fromEntries(readFields.map((field) => [field, read[field]]));
  });

  const canonical = {
    schema: document.schema,
    packet: Object.fromEntries(packetFields.map((field) => [field, document.packet[field]])),
    reads: reads.sort((left, right) => left.ordinal - right.ordinal),
  };
  const signedFinding = document.schema !== PACKET_V1 && document.packet.kind === "finding";
  if (hasCorrections !== signedFinding) {
    failContent("packet.json corrections are required only for packet.v2/v3 finding packets");
  }
  if (signedFinding) {
    if (!Array.isArray(document.corrections)) {
      failContent("packet.json.corrections must be an array");
    }
    canonical.corrections = document.corrections
      .map((correction, index) => {
        expectExactKeys(
          correction,
          CORRECTION_FIELDS,
          `packet.json.corrections[${index}]`,
          failContent,
        );
        for (const field of ["id", "source_type", "original", "corrected", "created_at"]) {
          expectString(correction[field], `packet.json.corrections[${index}].${field}`, failContent);
        }
        for (const field of ["packet_id", "category", "correction_kind"]) {
          expectNullableString(
            correction[field],
            `packet.json.corrections[${index}].${field}`,
            failContent,
          );
        }
        if (correction.packet_id !== document.packet.id) {
          failContent(`packet.json.corrections[${index}].packet_id does not match packet.id`);
        }
        return Object.fromEntries(
          CORRECTION_FIELDS.map((field) => [field, correction[field]]),
        );
      })
      .sort((left, right) => left.id.localeCompare(right.id));
  }
  return canonical;
}

function validateCorrectionsRecord(canonical, document) {
  expectExactKeys(
    document,
    ["packet_id", "corrections", "correction_count", "signed_correction_ids", "integrity"],
    "corrections.json",
    failCorrections,
  );
  expectString(document.packet_id, "corrections.json.packet_id", failCorrections);
  expectString(document.integrity, "corrections.json.integrity", failCorrections);
  if (document.packet_id !== canonical.packet.id) {
    failCorrections("corrections.json packet_id does not match packet.json");
  }
  if (!Array.isArray(document.corrections)) {
    failCorrections("corrections.json corrections must be an array");
  }
  if (document.correction_count !== document.corrections.length) {
    failCorrections("correction_count does not match corrections.json");
  }
  if (!Array.isArray(document.signed_correction_ids)) {
    failCorrections("signed_correction_ids must be an array");
  }

  const signed = canonical.corrections ?? [];
  const expectedIds = signed.map((correction) => correction.id).sort();
  const declaredIds = [...document.signed_correction_ids].sort();
  if (stableStringify(expectedIds) !== stableStringify(declaredIds)) {
    failCorrections("signed correction ids disagree with packet.json");
  }
  const narrativeById = new Map(document.corrections.map((correction) => [correction.id, correction]));
  for (const correction of signed) {
    const duplicate = narrativeById.get(correction.id);
    const normalized = duplicate
      ? {
          id: duplicate.id ?? null,
          packet_id: duplicate.packet_id ?? null,
          source_type: duplicate.source_type ?? null,
          original: duplicate.original ?? null,
          corrected: duplicate.reason ?? duplicate.corrected ?? null,
          category: duplicate.category ?? null,
          correction_kind: duplicate.correction_kind ?? null,
          created_at: duplicate.created_at ?? null,
        }
      : null;
    if (stableStringify(normalized) !== stableStringify(correction)) {
      failCorrections(`signed correction ${correction.id} disagrees with corrections.json`);
    }
  }
}

function decodeHex(value, bytes, path) {
  if (typeof value !== "string" || !new RegExp(`^[0-9a-f]{${bytes * 2}}$`).test(value)) {
    failSignature(`${path} must contain exactly ${bytes * 2} lowercase hexadecimal characters`);
  }
  return Buffer.from(value, "hex");
}

function validateAnchor(anchor) {
  if (anchor === undefined) return null;
  expectExactKeys(
    anchor,
    ["txn_id", "anchored_at", "chain", "network"],
    "signature.json.anchor",
  );
  for (const field of ["txn_id", "anchored_at", "chain", "network"]) {
    expectString(anchor[field], `signature.json.anchor.${field}`);
  }
  return {
    txn_id: anchor.txn_id,
    anchored_at: anchor.anchored_at,
    chain: anchor.chain,
    network: anchor.network,
  };
}

function validateSignatureMetadata(signature, schema) {
  expectRecord(signature, "signature.json");
  const fields = [
    "packet_hash",
    "packet_signature",
    "signature_alg",
    "canonical_version",
    "device_public_key",
    "public_key_fingerprint",
  ];
  const keys = signature.anchor === undefined ? fields : [...fields, "anchor"];
  expectExactKeys(signature, keys, "signature.json");
  for (const field of fields) expectString(signature[field], `signature.json.${field}`);

  const anchor = validateAnchor(signature.anchor);
  if (signature.canonical_version !== schema) {
    failInvalid("signature.json canonical_version contradicts packet.json.schema");
  }

  const proofFields = [
    "packet_hash",
    "packet_signature",
    "signature_alg",
    "device_public_key",
    "public_key_fingerprint",
  ];
  const blankCount = proofFields.filter((field) => signature[field].length === 0).length;
  if (blankCount === proofFields.length) {
    return { signed: false, anchor };
  }
  if (blankCount !== 0) failInvalid("signature.json contains partial verification material");

  const expectedAlg = CONTRACTS.get(schema);
  if (signature.signature_alg !== expectedAlg) {
    failInvalid(
      `unsupported signature/canonical tuple: ${signature.signature_alg} + ${signature.canonical_version}`,
    );
  }

  return {
    signed: true,
    anchor,
    packetHash: decodeHex(signature.packet_hash, 32, "signature.json.packet_hash").toString(
      "hex",
    ),
    packetSignature: decodeHex(
      signature.packet_signature,
      64,
      "signature.json.packet_signature",
    ),
    publicKey: decodeHex(signature.device_public_key, 32, "signature.json.device_public_key"),
    fingerprint: decodeHex(
      signature.public_key_fingerprint,
      32,
      "signature.json.public_key_fingerprint",
    ).toString("hex"),
  };
}

function verifyBundle(packetDocument, signatureDocument, correctionsDocument) {
  const canonical = validateCanonicalPayload(packetDocument);
  validateCorrectionsRecord(canonical, correctionsDocument);
  const proof = validateSignatureMetadata(signatureDocument, canonical.schema);
  const recomputedHash = sha256Hex(stableStringify(canonical));

  if (!proof.signed) {
    return {
      state: "UNVERIFIED",
      schema: canonical.schema,
      recomputedHash,
      storedHash: null,
      anchor: proof.anchor,
      message: "packet has no complete device-signature material",
    };
  }
  if (proof.packetHash !== recomputedHash) {
    failContent(`hash mismatch; stored ${proof.packetHash}, recomputed ${recomputedHash}`);
  }
  const fingerprint = sha256Hex(proof.publicKey);
  if (fingerprint !== proof.fingerprint) {
    failPublicKey("public-key fingerprint does not match device_public_key");
  }

  const spkiPrefix = Buffer.from("302a300506032b6570032100", "hex");
  let publicKey;
  try {
    publicKey = createPublicKey({
      key: Buffer.concat([spkiPrefix, proof.publicKey]),
      format: "der",
      type: "spki",
    });
  } catch (error) {
    failSignature(
      `invalid Ed25519 public key: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  let valid;
  try {
    valid = verifySignature(
      null,
      Buffer.from(proof.packetHash, "utf8"),
      publicKey,
      proof.packetSignature,
    );
  } catch (error) {
    failSignature(
      `Ed25519 verification failed: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
  if (!valid) failSignature("Ed25519 signature does not match packet_hash");

  return {
    state: "VERIFIED",
    schema: canonical.schema,
    recomputedHash,
    storedHash: proof.packetHash,
    fingerprint,
    anchor: proof.anchor,
    message:
      canonical.schema === PACKET_V1
        ? "legacy packet.v1 canonical core and embedded signing key verify"
        : canonical.schema === PACKET_V2
          ? "packet.v2 complete judgment and embedded signing key verify"
          : "packet.v3 complete judgment and device-recorded configured-runtime attribution verify; model identity is not provider-attested",
  };
}

function printAnchor(anchor) {
  if (anchor) {
    console.log("\nAnchor information (informational only, not part of proof):");
    console.log(`  Transaction ID: ${anchor.txn_id}`);
    console.log(`  Anchored at:    ${anchor.anchored_at}`);
    console.log(`  Chain:          ${anchor.chain}`);
    console.log(`  Network:        ${anchor.network}`);
  } else {
    console.log("\nNo anchor information (local cryptographic proof only).");
  }
}

function runSelfTest() {
  const v1 = {
    schema: PACKET_V1,
    packet: {
      id: "pkt_known",
      context: "ctx",
      user_correction: null,
      chosen_agent: "analyst",
      correction_kind: null,
      runtime_mode: "live",
      input_mode: "typed",
      tray_session_id: null,
      source_candidate_id: null,
      pen_hints: null,
      kind: "regular",
      source_packet_id: null,
      corpus_refs: null,
      created_at: "2026-05-31T00:00:00.000Z",
    },
    reads: [],
  };
  const v2 = {
    schema: PACKET_V2,
    packet: {
      id: "pkt_v2",
      context: "investor asked about the moat",
      user_correction: "The moat is trust, not the substrate.",
      chosen_agent: "analyst",
      correction_kind: "emergence",
      runtime_mode: "live",
      input_mode: "typed",
      tray_session_id: "tray_2",
      source_candidate_id: "candidate_1",
      pen_hints: '{"tone":"direct"}',
      kind: "regular",
      source_packet_id: "pkt_prev",
      corpus_refs:
        '[{"path":"memo.md","section_anchor":"moat","excerpt_hash":"abc123"}]',
      created_at: "2026-08-03T23:00:00.000Z",
      decision: "pursue",
      revisit_at: null,
      panel_signals:
        '{"signals":{"isDecision":true},"panel":["analyst"]}',
    },
    reads: [
      {
        id: "read_v2",
        packet_id: "pkt_v2",
        agent_name: "analyst",
        archetype: "strategist",
        quoted: "the substrate is not the moat",
        situation: "the evidence points to trust as the defensible layer",
        hidden_risk: "the product may overclaim technical defensibility",
        next_move: "name trust as the moat",
        refusal: "I cannot infer customer trust from architecture alone.",
        refusal_kind: "substrate",
        ordinal: 0,
        created_at: "2026-08-03T23:00:01.000Z",
        claim: "Trust, not the substrate, is the moat.",
        evidence_ref:
          '{"path":"memo.md","section_anchor":"moat","excerpt_hash":"abc123"}',
        confidence: 0.72,
        uncertainty: "A competitor may reproduce the trust loop.",
        suggested_correction: "Reframe the moat around accumulated judgment.",
        packet_impact:
          "Signing the technical-moat framing would overstate defensibility.",
      },
    ],
  };
  const v3 = structuredClone(v2);
  v3.schema = PACKET_V3;
  v3.packet.provider_id = "openai";
  v3.packet.model_id = "gpt-5.3-codex";
  v3.packet.execution_receipt_id = "8f48d59e-2be4-4e03-964f-ccb8e31c9ea0";
  v3.packet.endpoint_fingerprint = null;

  // Integral confidences are the cross-language trap: Rust renders f64 1.0 as
  // "1.0" unless it uses ECMA-262 number formatting, while JavaScript renders
  // "1". These vectors pin the JavaScript bytes the backend must reproduce.
  const withConfidence = (confidence) => {
    const document = structuredClone(v2);
    document.reads[0].confidence = confidence;
    return document;
  };

  const vectors = [
    [v1, "096825b518ee18863c6a440542ae54d5623856b117fc54668aba8bf9541a85fd"],
    [v2, "00a1e934dd7a2d8994be2a40f5d85471b93860995188db72c8a7939b864ccfff"],
    [v3, "ff92c64026ab3fa1eb4d9387ab3875d41fdff4110711328a314497e8d208dfe1"],
    [withConfidence(1), "2617ab9beb2f467d1d6284f0e1bf009e55d8e76f6f3b0188e9bdcf5902f4e716"],
    [withConfidence(0), "681671f44c5ddf818c3f412b8f79736c2ea4b3588175d7de0a1622f5e7ee260a"],
  ];
  for (const [document, expected] of vectors) {
    const actual = sha256Hex(stableStringify(validateCanonicalPayload(document)));
    if (actual !== expected) failInvalid(`self-test hash mismatch for ${document.schema}: ${actual}`);
  }
  const v3Hash = vectors.find(([document]) => document.schema === PACKET_V3)?.[1];
  for (const [field, value] of [
    ["provider_id", "anthropic"],
    ["model_id", "other-model"],
    ["execution_receipt_id", "746dc827-f84d-4579-b6e3-18cdce6bb8d7"],
  ]) {
    const tampered = structuredClone(v3);
    tampered.packet[field] = value;
    const tamperedHash = sha256Hex(stableStringify(validateCanonicalPayload(tampered)));
    if (tamperedHash === v3Hash) failInvalid(`self-test did not bind packet.v3 ${field}`);
  }
  const customV3 = structuredClone(v3);
  customV3.packet.provider_id = "other";
  customV3.packet.endpoint_fingerprint = "a".repeat(64);
  const customHash = sha256Hex(stableStringify(validateCanonicalPayload(customV3)));
  customV3.packet.endpoint_fingerprint = "b".repeat(64);
  const changedEndpointHash = sha256Hex(stableStringify(validateCanonicalPayload(customV3)));
  if (changedEndpointHash === customHash) {
    failInvalid("self-test did not bind packet.v3 endpoint_fingerprint");
  }
  console.log(
    `✓ SELF-TEST PASSED: ${vectors.length}/${vectors.length} packet.v1, packet.v2, and packet.v3 golden vectors verified`,
  );
}

function readJson(path, label) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    failInvalid(`cannot read ${label}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function main() {
  if (process.argv.includes("--self-test")) {
    runSelfTest();
    return;
  }

  const args = process.argv.slice(2);
  let expectedFingerprint = null;
  const pinIndex = args.indexOf("--expect-fingerprint");
  if (pinIndex >= 0) {
    expectedFingerprint = args[pinIndex + 1] ?? null;
    args.splice(pinIndex, 2);
    if (!/^[0-9a-f]{64}$/.test(expectedFingerprint ?? "")) {
      failInvalid("--expect-fingerprint requires exactly 64 lowercase hexadecimal characters");
    }
  }
  if (args.length > 1) {
    failInvalid("usage: node verify.mjs [directory] [--expect-fingerprint <64-char-hex>]");
  }

  const directory = resolve(args[0] ?? ".");
  const packet = readJson(resolve(directory, "packet.json"), "packet.json");
  const signature = readJson(resolve(directory, "signature.json"), "signature.json");
  const corrections = readJson(resolve(directory, "corrections.json"), "corrections.json");
  const result = verifyBundle(packet, signature, corrections);

  console.log(`Computed hash: ${result.recomputedHash}`);
  console.log(`Stored hash:   ${result.storedHash ?? "(missing)"}`);
  console.log(`Canonical payload: ${result.schema}`);
  if (result.state === "VERIFIED") {
    if (expectedFingerprint !== null) {
      if (result.fingerprint !== expectedFingerprint) {
        failSignerPin(
          `expected ${expectedFingerprint}, bundle carries ${result.fingerprint}`,
        );
      }
      console.log("✓ VERIFIED: Signature and independently pinned signer are valid.");
      console.log(result.message);
    } else {
      console.log("INTEGRITY VALID: Content and embedded-key signature verify.");
      console.log(
        "⚠ SIGNER UNPINNED: Authenticated origin was not established. Re-run with --expect-fingerprint using a fingerprint obtained through an independent trusted channel.",
      );
    }
    console.log(`Public key fingerprint: ${result.fingerprint}`);
    console.log(
      "VERIFIER TRUST: obtain this verifier and the expected fingerprint through an independent trusted channel.",
    );
  } else {
    console.log(`UNVERIFIED: ${result.message}`);
    process.exitCode = 2;
  }
  printAnchor(result.anchor);
}

try {
  main();
} catch (error) {
  if (error instanceof BundleError) {
    if (error.kind === "content") {
      console.error(`✗ TAMPERED (content): ${error.message}`);
    } else if (error.kind === "signature") {
      console.error(`✗ TAMPERED (signature): ${error.message}`);
    } else if (error.kind === "public-key") {
      console.error(`✗ TAMPERED (public key): ${error.message}`);
    } else if (error.kind === "corrections") {
      console.error(`✗ TAMPERED (corrections): ${error.message}`);
    } else if (error.kind === "signer-pin") {
      console.error(`✗ FAILED (signer pin): ${error.message}`);
    } else {
      console.error(`INVALID: ${error.message}`);
    }
  } else {
    console.error(`INVALID: ${error instanceof Error ? error.message : String(error)}`);
  }
  process.exitCode = 1;
}
