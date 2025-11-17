06 — Optional Wrapper (Atoms)

Goal
- Only if necessary, create a thin typed wrapper around the Taiga component.

When needed
- To standardize API (rename/limit inputs), enforce defaults, encapsulate logic that cannot be done in story, or apply tokens not attachable externally.

Actions
1) Files under `projects/vsk-ui-kit/src/lib/atoms/<atom-name>/`:
   - `<atom-name>.component.ts|html|scss` (standalone, typed inputs/outputs)
   - `<atom-name>.component.spec.ts` (optional but aim for ≥80% statements)
2) Re‑export wrapper in `projects/vsk-ui-kit/src/public-api.ts`.

Acceptance
- Wrapper compiles, tests pass; story keeps working; no private Taiga DOM usage.

Next Step
- 07 — Validate And Coverage

