08 — Cleanup And Handoff (Atoms)

Goal
- Move final assets into permanent locations, confirm outputs, and clean temporary context.

Actions
1) Ensure final design assets live under:
   - `projects/vsk-ui-kit/src/stories/assets/atoms/<atom-name>/figma/`
   - Do NOT commit raw `figma.css` — keep it only in temp.
2) Confirm story location: `projects/vsk-ui-kit/src/lib/atoms/<atom-name>/<atom-name>.stories.ts`
3) If wrapper created, confirm export via `projects/vsk-ui-kit/src/public-api.ts`.
4) Clean temp folder:
   - Remove `llm_current_task_context/atoms/<atom-name>/` or leave only agreed artifacts.

Write Outputs
- `llm_current_task_context/atoms/<atom-name>/DONE` (empty flag file) or note cleanup in `notes.md`.
- List of changed/created repository paths for the PR description.

Acceptance
- Permanent assets in place; temp context cleaned; deliverables enumerated.

