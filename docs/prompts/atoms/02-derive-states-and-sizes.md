02 — Derive States And Sizes (Atoms)

Goal
- Determine the authoritative list of visual states and size variants to showcase in stories.

Inputs
- `analysis/css-facts.json` (from step 01)
- Any combined artifact and extracted assets in `projects/.../assets/atoms/<atom-name>/figma/`

Actions
1) Build canonical sets
   - States: present in CSS facts or inferred from SVG layers → default, hover, active, focus, disabled, loading, error/success.
   - Sizes: s/m/l if present; otherwise infer from heights/typography.
2) Propose missing states/sizes only if absent, and mark them “to confirm”.

Write Outputs
- `llm_current_task_context/atoms/<atom-name>/analysis/states-sizes.json` with:
  `{ states: [...], sizes: [...], inferred: {states: [...], sizes: [...]}}`

Acceptance
- Clear, concise states/sizes list exists and will drive stories.

Next Step
- 03 — Token Mapping And Changes

