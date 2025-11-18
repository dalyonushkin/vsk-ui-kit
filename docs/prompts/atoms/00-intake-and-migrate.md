00 — Intake And Migrate (Atoms)

Goal
- Collect initial task context for a single atom, agree on an English slug `<atom-name>`, and copy all input files into a canonical temporary structure for subsequent steps.

Stack Rules
- Do NOT install or upgrade packages. Use workspace versions (Angular ^20.3.x, Storybook ^10.0.6, Taiga 4.16.0).
- One atom per folder under `projects/vsk-ui-kit/src/lib/atoms/<atom-name>/`.

Inputs (expected)
- Required at start: path to a folder with raw input files for this atom (for example, `llm_current_task_context/atoms/<atom-name>/` or any folder specified by the developer).
- Optional: existing temp folders/files under `llm_current_task_context/**` (including non‑canonical paths like `llm_current_task_context/кнопка`).
- Optional: Russian human‑readable component name (for Storybook title/docs).

Actions
1) Resolve input root  
   Ask the developer where the source SVG/CSS/PNG/JPG/PDF for this atom currently live. Record this path as `inputRoot`.

2) Decide `<atom-name>` (English kebab‑case slug)  
   Propose an English slug (kebab‑case), e.g. `button`, `input-text`, and get confirmation/adjustments.

3) Create canonical temp folders (if not present)
   - `mkdir -p llm_current_task_context/atoms/<atom-name>/raw`
   - `mkdir -p llm_current_task_context/atoms/<atom-name>/css`
   - `mkdir -p llm_current_task_context/atoms/<atom-name>/extracts`

4) Scan existing context
   - Scan `inputRoot` and the whole `llm_current_task_context` tree for relevant files:
     - Example (Unix): `find llm_current_task_context -mindepth 1 -maxdepth 2 -type d`
     - Example file search: `rg -n -i '\.(css|svg|png|jpg|jpeg|pdf)$' llm_current_task_context || true`
     - Example Figma link search: `rg -n 'https?://www\.figma\.com/[^\s]+' llm_current_task_context || true`
   - Note any ad‑hoc folders (for example, `llm_current_task_context/кнопка`) that already contain resources for this atom.

5) Copy resources into canonical RAW
   - Goal: all raw input files for this atom are copied into `llm_current_task_context/atoms/<atom-name>/raw/`. Originals stay where they are.
   - Always copy, never move; do not create placeholder files (for example, files that only contain a comment).
   - Example (Unix):  
     `cp -n <inputRoot>/*.{svg,png,jpg,jpeg,pdf,css} llm_current_task_context/atoms/<atom-name>/raw/`  
     (adapt masks to actual files).
   - On Windows: use Explorer or PowerShell to copy matching files into `llm_current_task_context/atoms/<atom-name>/raw/`.
   - Log each copy in `notes.md` as `from → to`.
   - At this step any `.css` is treated as RAW; classification and property mapping happen in later steps.

6) Summarize what you found and what’s missing
   - Produce a short summary of the current state:
     - Russian component name (if provided).
     - Confirmed `<atom-name>` slug.
     - List of Figma links (if any).
     - List of files in `raw/` (including CSS/SVG/PNG/JPG/PDF).
     - What is still missing (`missingInputs`), for example missing hover CSS, no SVG with disabled states, etc.

Write Outputs (contracts)
- `llm_current_task_context/atoms/<atom-name>/raw/`  
  Contains physical copies of all raw files relevant to this atom (SVG/PNG/JPG/JPEG/PDF/CSS, etc.). No placeholder files.
- `llm_current_task_context/atoms/<atom-name>/css/`  
  May be empty at step 00; reserved for later steps.
- `llm_current_task_context/atoms/<atom-name>/extracts/`  
  May be empty at step 00; reserved for later steps.
- `llm_current_task_context/atoms/<atom-name>/notes.md`  
  Log: list of copies (`from → to`), discovered ad‑hoc folders, remarks about inputs.
- `llm_current_task_context/atoms/<atom-name>/context.json`  
  JSON contract with fields:
  - `atomNameSlug` — string, agreed English slug.
  - `russianName` — string or `null`, Russian component name (if any).
  - `inputRoot` — string, path to the original input folder.
  - `scanResults` — optional short description of discovered folders/files.
  - `rawFiles` — array of files actually present in `raw/`.
  - `figmaLinks` — array of Figma URLs (if any).
  - `missingInputs` — array of strings describing what is still required from dev/designer.
  - `notesSummary` — short textual summary (1–2 lines) of the context state.

Acceptance
- Structure `llm_current_task_context/atoms/<atom-name>/{raw,css,extracts}` exists.
- `raw/` contains copies of all relevant input files for this atom, with no placeholder files.
- `context.json` and `notes.md` follow the contract and have been confirmed with the developer (and, if needed, the designer).

Next Step
- 01 — Extract Figma Artifacts
