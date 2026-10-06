# Receipt: "Decisions with receipts"

This folder holds one signed Liminal decision record, plus a deliberately tampered copy of it, so you can check both yourself.

- **Decision:** "Decisions with receipts" becomes Liminal's headline on every external surface.
- **What the record shows:** three agents (Analyst, SDR, Auditor) read the decision. The founder chose the Analyst read, corrected it, and ratified the outcome (Pursue). The app then saved the record, signed on the device with an Ed25519 key.
- **Packet:** `2d2eb1c6-20bb-43b3-8f65-d89778acf2f1`, recorded 2026-10-06, format `liminal.founder_packet.v3`.
- **Signing-key fingerprint:** `9a884e5a2fa183ab5db045d7bb2a6540ab6a18e90f538c4ebc8acd023c201408`

You need Node.js 18 or newer. There is nothing to install and no network access is needed.

## 1. Check the record

```sh
cd bundle
node verify.mjs --self-test
node verify.mjs .
node verify.mjs . --expect-fingerprint 9a884e5a2fa183ab5db045d7bb2a6540ab6a18e90f538c4ebc8acd023c201408
```

Expected output:
- `--self-test`: `SELF-TEST PASSED: 5/5`, exit 0.
- `node verify.mjs .`: `INTEGRITY VALID` followed by `SIGNER UNPINNED`, exit 0. The content and signature check out, but nothing has yet told the verifier whose key this is.
- `--expect-fingerprint`: `VERIFIED`, exit 0. The signature matches the fingerprint above. Compare that fingerprint with one you got from Liminal through a separate channel.

## 2. Check that tampering is caught

`tampered-one-byte/` is an exact copy of `bundle/` with one byte of `packet.json` changed: "receipts" became "Receipts" in the decision text.

```sh
cd ../tampered-one-byte
node verify.mjs .
```

Expected output: `TAMPERED (content): hash mismatch`, exit 1.

## What this proves, and what it doesn't

- It proves the record has not changed since the device signed it, and that the holder of this key signed it.
- It does not prove which model answered. The model name is what the device recorded, not something the provider attested.
- It does not prove the key belongs to a particular person. For that, you need a fingerprint obtained independently.

`run-transcript.txt` has the full output of these runs, including the tampered copy run by absolute path from `/tmp`.
