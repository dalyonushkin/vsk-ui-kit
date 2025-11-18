07 — Validate And Coverage (Atoms)

Goal
- Build Storybook, generate LLMS and run tests, capturing coverage for the atom.

Actions
1) Build Storybook and LLMS  
   - `npm run build-storybook`  
   - Expected artifacts: `storybook-static/llms.txt` and `storybook-static/llms/`.

2) Run tests  
   - `npm run test` (storybook test‑runner).

3) Coverage  
   - If available, record the Storybook coverage report path (usually `coverage/storybook`) and the key numbers (statements/branches/lines).

Write Outputs (contracts)
- `llm_current_task_context/atoms/<atom-name>/validation-report.md`  
  - List of commands executed and their results (success/failure).  
  - Short summary of test runs (what was executed, status).  
  - Coverage report path (`coverage/storybook`) and, where possible, aggregated percentages, especially for the target atom/wrapper.

Acceptance
- Storybook build succeeds.
- `npm run test` finishes without errors.
- Coverage report is present and satisfies target levels (for wrappers, aim for ≥80% statements, or document the rationale otherwise).

Next Step
- 08 — Cleanup And Handoff
