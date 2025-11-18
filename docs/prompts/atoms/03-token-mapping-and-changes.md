03 — Token Mapping And Changes (Atoms)

Goal
- Map raw CSS facts (`css-facts`) to existing design tokens/variables and propose minimal centralized changes, avoiding local overrides.

Inputs
- `llm_current_task_context/atoms/<atom-name>/analysis/css-facts.json`.
- Tokens/styles under `projects/vsk-ui-kit/tokens/src/styles/*` (for example, `base.css`, `vsk-taiga.less`).

Actions
1) Build mapping table  
   - For each significant fact (color, font size, radius, spacing, etc.) find an existing token/variable if possible.  
   - Build a mapping table: raw value → existing token/variable.

2) Identify gaps & propose token changes  
   - Identify values that do not have a suitable token.  
   - Propose new/updated tokens in shared files (`tokens/src/styles/*`), rather than local values in stories.  
   - Describe the impact on other components if a token is already used elsewhere.

3) Prepare patch plan (only plan)  
   - Prepare a change plan: which token files to edit and which lines/properties to change or add.  
   - Do not apply changes without review; the plan is for developer/designer approval.
4) Handoff to stories  
   - In `notes.md`, clearly state which values are already covered by existing tokens and which still require updates before step 04.  
   - If a token is missing, document the acceptable temporary fallback (for example, “keep the default appearance until approval”) and call out that the story must not introduce new magic numbers.

Write Outputs (contracts)
- `llm_current_task_context/atoms/<atom-name>/analysis/token-mapping.md`  
  - Table of the form: raw value → token/variable/“no token”.  
- `llm_current_task_context/atoms/<atom-name>/analysis/token-changes.plan.md`  
  - Plan of centralized changes: list of files, proposed tokens, and short rationale.

Acceptance
- There is a transparent mapping from raw CSS to tokens.
- Proposed changes are expressed only as shared token updates (no local “magic numbers” in stories) and are ready for review.

Next Step
- 04 — Generate Story
