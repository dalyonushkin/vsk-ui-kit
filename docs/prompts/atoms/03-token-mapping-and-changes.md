03 — Token Mapping And Changes (Atoms)

Goal
- Map raw CSS facts to existing shared tokens/variables, and propose minimal, centralized token changes when needed.

Inputs
- `analysis/css-facts.json`
- Workspace tokens under `projects/vsk-ui-kit/tokens/src/styles/*` (e.g., `base.css`, `vsk-taiga.less`).

Actions
1) Build a mapping table: raw property/value → token/variable (existing).
2) Identify gaps: values without tokens; propose new/updated tokens in shared files (avoid local story overrides).
3) Prepare a patch plan (do not apply yet without approval): list files to change with suggested diffs.

Write Outputs
- `llm_current_task_context/atoms/<atom-name>/analysis/token-mapping.md` (table)
- `llm_current_task_context/atoms/<atom-name>/analysis/token-changes.plan.md` (planned centralized changes)

Acceptance
- A clear mapping exists; proposed centralized changes documented.

Next Step
- 04 — Generate Story

