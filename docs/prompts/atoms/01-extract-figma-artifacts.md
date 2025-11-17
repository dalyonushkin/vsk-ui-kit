01 — Extract Figma Artifacts (Atoms)

Goal
- From Figma “Copy as SVG” and “Copy as code CSS (all layers)”, extract usable assets and facts without committing raw CSS into story assets.

Prereqs
- `llm_current_task_context/atoms/<atom-name>/context.json` from step 00
- Raw files placed/migrated into:
  - `llm_current_task_context/atoms/<atom-name>/raw/` (svg/png/jpg/pdf)
  - `llm_current_task_context/atoms/<atom-name>/css/figma.css` (raw CSS)

Actions
1) Detect combined artifact
   - If `combined.svg|png|pdf` exists in `raw/`, plan to use it as primary design reference.
2) Extract embedded assets (if any)
   - In SVG: look for `<image href="data:*;base64,...">`
   - In CSS: look for `url(...)` with data URIs
   - Decode base64 and save only what’s needed to: `projects/vsk-ui-kit/src/stories/assets/atoms/<atom-name>/figma/`
3) CSS fact extraction (do not commit css to assets)
   - Parse raw CSS to collect: colors, font sizes/weights, line-height, letter-spacing, radii, borders, shadows, spacings, heights.
   - Group rules by state (hover/focus/disabled/active/loading) and by size (s/m/l).

Write Outputs
- `llm_current_task_context/atoms/<atom-name>/analysis/css-facts.json` (structured list of properties/values per state/size)
- `llm_current_task_context/atoms/<atom-name>/analysis/assets-extracted.json` (list of copied files into story assets)
- Update `llm_current_task_context/atoms/<atom-name>/notes.md` with what was extracted and where it lives.

Acceptance
- Minimal, referenced assets present under `projects/.../assets/atoms/<atom-name>/figma/`
- Raw CSS remains only in temp folder; facts file exists.

Next Step
- 02 — Derive States And Sizes

