02 — Derive States And Sizes (Atoms)

Goal
- Determine the canonical list of visual states and size variants to be shown in stories.

Inputs
- `llm_current_task_context/atoms/<atom-name>/analysis/css-facts.json` (from step 01).
- Any combined artifacts and extracted assets in `projects/.../assets/atoms/<atom-name>/figma/`.

Actions
1) Build canonical sets  
   - States: based on CSS facts and/or SVG layers, determine the set of states: at minimum `default`, plus `hover`, `active`, `focus`, `disabled`, `loading`, `error/success`, etc., if present.  
   - Sizes: if data clearly indicates s/m/l, use them; otherwise derive from heights/typography (for example, small/medium/large).

2) Propose inferred states/sizes  
   - If some standard states/sizes are not explicitly defined in the design but are reasonable to support, propose them as `inferred` and explicitly mark them as needing developer/designer confirmation.

Write Outputs (contracts)
- `llm_current_task_context/atoms/<atom-name>/analysis/states-sizes.json`  
  - Object of the form:  
    `{ "states": [...], "sizes": [...], "inferred": { "states": [...], "sizes": [...] } }`.

Acceptance
- There is a clear list of `states` and `sizes` that will drive stories and tests.
- All inferred states/sizes are explicitly marked and communicated for confirmation.

Next Step
- 03 — Token Mapping And Changes
