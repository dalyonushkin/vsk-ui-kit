00 — Intake And Migrate (Atoms)

Goal
- Auto‑gather existing task context, propose english slug, migrate any ad‑hoc inputs into the canonical temp structure.

Stack Rules
- Do NOT install/upgrade packages. Use workspace versions (Angular ^20.3.x, Storybook ^10.0.6, Taiga 4.16.0).
- One atom per folder under `projects/vsk-ui-kit/src/lib/atoms/<atom-name>/`.

Inputs (expected)
- Optional temp inputs anywhere under `llm_current_task_context` (may include non‑canonical folders like `llm_current_task_context/кнопка`).
- Optional: russian human name of component (for story title/docs).

Actions
1) Decide `<atom-name>` (english kebab‑case slug). If unknown, propose and await confirmation.
2) Create canonical temp folders:
   - `mkdir -p llm_current_task_context/atoms/<atom-name>/{raw,css,extracts}`
3) Scan and migrate any inputs from the whole temp root:
   - List folders: `find llm_current_task_context -mindepth 1 -maxdepth 2 -type d`
   - Find files: `rg -n -i '\.(css|svg|png|jpg|jpeg|pdf)$' llm_current_task_context`
   - Find Figma links: `rg -n 'https?://www\.figma\.com/[^\s]+' llm_current_task_context`
   - Move CSS → `llm_current_task_context/atoms/<atom-name>/css/`
   - Move media (svg/png/jpg/jpeg/pdf) → `llm_current_task_context/atoms/<atom-name>/raw/`
   - Use `mv -n` to avoid overwrites; list all moves in notes.
4) Summarize what you found and what’s missing.

Write Outputs
- `llm_current_task_context/atoms/<atom-name>/notes.md`
- `llm_current_task_context/atoms/<atom-name>/context.json` (JSON with keys: atomNameSlug, russianName?, figmaLinks[], cssFiles[], rawFiles[], missing[])

Acceptance
- Canonical temp structure exists; relevant files migrated; summary and context.json written.

Next Step
- 01 — Extract Figma Artifacts

