# Verify a Liminal packet proof bundle

This folder is self-contained. Verification needs only Node.js 18 or newer; it does not require Liminal, a package install, or network access.

## Run verification

From the bundle directory:

```sh
node verify.mjs --self-test
node verify.mjs .
```

A valid signed bundle prints `VERIFIED`, the exact canonical schema, the recomputed SHA-256 digest, and the embedded signing-key fingerprint. Exit status `0` means the cryptographic checks passed.

`UNVERIFIED` with exit status `2` means the packet has no complete device-signature material. `INVALID` with exit status `1` means the payload, metadata, hash, fingerprint, or Ed25519 signature failed verification.

## Exact version dispatch

The verifier accepts only these tuples:

| Canonical payload | Signature metadata |
| --- | --- |
| `liminal.founder_packet.v1` | `ed25519:v1` |
| `liminal.founder_packet.v2` | `ed25519:v1+packet.v2` |
| `liminal.founder_packet.v3` | `ed25519:v1+packet.v3` |

Missing, unknown, or contradictory values fail closed. The verifier never guesses a payload version from the fields it happens to find.

`packet.v1` is the byte-preserved legacy projection. It covers the historical packet identity, correction/provenance fields, refusal fields, and twelve original fields for each agent read. It does **not** authenticate later supplemental founder-verdict or AgentRead vNext columns.

`packet.v2` covers the complete signed judgment record, including `decision`, `revisit_at`, `panel_signals`, and every read's `claim`, `evidence_ref`, `confidence`, `uncertainty`, `suggested_correction`, and `packet_impact`.

`packet.v3` covers that same complete judgment plus `provider_id`, `model_id`, `execution_receipt_id`, and a nullable `endpoint_fingerprint`. These fields are **device-recorded configured-runtime attribution**, not provider-attested model identity. A valid signature proves what this Liminal device recorded and signed; it does not independently prove which remote service or model answered.

For custom and local connections, `endpoint_fingerprint` is a domain-separated SHA-256 digest of the normalized base URL (scheme, lowercase host, effective port, and normalized path). It lets two signed records be compared without exposing the endpoint, but it does not prove control of that endpoint. Fixed provider endpoints use `null`.

## What the verifier checks

The script:

1. validates the exact schema and rejects unknown or missing keys;
2. normalizes reads by unique `ordinal` and requires every `packet_id` to match the packet;
3. reconstructs the exact versioned canonical payload;
4. computes SHA-256 and compares it with `signature.json.packet_hash`;
5. computes the SHA-256 fingerprint of the embedded raw Ed25519 public key;
6. verifies `packet_signature` over the UTF-8 packet-hash string.

The embedded public key proves that the holder of the corresponding private key signed the hash. Establishing that this key belongs to a particular person or device requires an independently trusted copy of the fingerprint; a mutable bundle cannot establish its own external identity.

## Files outside the packet signature

`corrections.json` is a separate narrative taxonomy and is not part of `packet.json`. The first-class `packet.user_correction` and packet.v2/v3 founder-verdict fields are inside the signed canonical payload.

Anchor fields are receipts for public timestamping of the packet hash. They are deliberately excluded from packet identity and are not a substitute for the Ed25519 content signature.
