08 — Cleanup And Handoff (Atoms)

Goal
- Place final assets and code into permanent locations, record the list of changes, and clean up the temporary context for the atom.

Actions
1) Confirm permanent assets and exports  
   - Design assets live under:  
     - `projects/vsk-ui-kit/src/stories/assets/atoms/<atom-name>/figma/`  
   - Raw CSS (`figma.css`) must NOT be committed to assets; it should remain only under `llm_current_task_context/atoms/<atom-name>/css/` (or `raw/`).  
   - Story file is located at:  
     - `projects/vsk-ui-kit/src/lib/atoms/<atom-name>/<atom-name>.stories.ts`  
   - If a wrapper exists, it is exported via:  
     - `projects/vsk-ui-kit/src/public-api.ts`.

2) Cleanup temp folder  
   - Clean `llm_current_task_context/atoms/<atom-name>/` from temporary files, leaving only agreed artifacts (for example, `context.json`, `validation-report.md`) if needed.  
   - Explicitly mark the atom’s temp context as completed.

Write Outputs (contracts)
- `llm_current_task_context/atoms/<atom-name>/DONE`  
  - Empty flag file or a note in `notes.md` indicating that the atom context is closed.
- Обновлённый `llm_current_task_context/atoms/<atom-name>/notes.md`  
  - Short note about which files were left, which removed, and why.
- List of changed/created repository paths  
  - For PR description (stories, wrapper, tokens, assets, etc.).

Acceptance
- All final assets and code are in their expected locations in the repo.
- The temp folder for the atom is cleaned up and explicitly marked as completed (DONE/notes).
- There is a ready list of changed/created files for use in the PR.
