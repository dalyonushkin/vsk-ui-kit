07 — Validate And Coverage (Atoms)

Goal
- Build, generate LLMS, and run tests; capture coverage.

Actions
1) Build Storybook and generate LLMS:
   - `npm run build-storybook` (produces `storybook-static/llms.txt` and `storybook-static/llms/`)
2) Run tests:
   - `npm run test` (storybook test‑runner)
3) (Optional) lcov report for storybook coverage if configured.

Write Outputs
- `llm_current_task_context/atoms/<atom-name>/validation-report.md` with:
  - commands executed and results
  - summary of test outcomes
  - coverage path: `coverage/storybook` (and key numbers if available)

Acceptance
- Build succeeds; tests green; coverage generated.

Next Step
- 08 — Cleanup And Handoff

