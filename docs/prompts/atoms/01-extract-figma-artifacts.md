01 — Extract Figma Artifacts (Atoms)

Goal
- From Figma (“Copy as SVG” and “Copy as code CSS (all layers)”), extract usable assets and structured style facts, without committing raw CSS into Storybook assets.

Inputs
- `llm_current_task_context/atoms/<atom-name>/context.json` from step 00.
- Raw files copied into:
  - `llm_current_task_context/atoms/<atom-name>/raw/` (svg/png/jpg/jpeg/pdf/css).

Actions
1) Detect combined artifact  
   - Check if there is a single artifact in `raw/` that shows all states (`combined.svg|png|pdf`). If present, plan to use it as the primary reference for the Design tab.

2) Extract embedded assets (if any)  
   - In SVG: look for `<image href="data:*;base64,...">`.  
   - In CSS: look for `url(...)` with data URIs (if any).  
   - Decode base64 and save only the needed files to:  
     `projects/vsk-ui-kit/src/stories/assets/atoms/<atom-name>/figma/`  
   - Record in `notes.md` which files were extracted and from where.

3) CSS fact extraction (Figma CSS → css-facts.json)  
   - Find in `raw/` files that look like Figma CSS (for example, `*.css` from “Copy as code CSS (all layers)”).  
   - Parse raw CSS in a best‑effort way:
     - collect colors, font sizes/weights, line-height, letter-spacing, radii, borders, shadows, heights, spacings;
     - group facts by states (hover/focus/disabled/active/loading/error/success, where possible) and sizes (s/m/l).  
   - If CSS structure is non‑standard (common for Figma), still extract values and document any limitations in `notes.md`.

Write Outputs (contracts)
- `llm_current_task_context/atoms/<atom-name>/analysis/css-facts.json`  
  - Structured list of style facts grouped by state/size as far as possible.
- `llm_current_task_context/atoms/<atom-name>/analysis/assets-extracted.json`  
  - JSON list of extracted assets copied to `projects/.../assets/atoms/<atom-name>/figma/` (source → target path, type).
- `llm_current_task_context/atoms/<atom-name>/notes.md`  
  - Updated with descriptions of extracted assets and CSS facts/limitations.

Acceptance
- A minimal reference set of assets for the atom exists under `projects/.../assets/atoms/<atom-name>/figma/` (including `combined.*` if provided).
- Raw CSS stays only under `llm_current_task_context` (not in assets).  
- `css-facts.json` contains the key values; `assets-extracted.json` and `notes.md` record what was extracted and where it lives.

Next Step
- 02 — Derive States And Sizes
