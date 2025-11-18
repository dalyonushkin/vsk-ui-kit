05 — Play Tests And A11y (Atoms)

Goal
- Add play tests to the stories and verify basic accessibility behavior.

Inputs
- Atom story file from step 04: `projects/vsk-ui-kit/src/lib/atoms/<atom-name>/<atom-name>.stories.ts`.
- `llm_current_task_context/atoms/<atom-name>/analysis/states-sizes.json` — which states/sizes to exercise.

Actions
1) Add play functions  
   - For each interactive story, add a `play` function using `storybook/test` (`userEvent`, `within`, `expect`).

2) Cover behavior and a11y  
   - Click, keyboard, and focus flow.  
   - `disabled/readonly/loading` behavior.  
   - ARIA roles and labels (`role`, `aria-label`, `aria-pressed`, etc.).

3) Selectors  
   - Prefer role/text selectors (`getByRole`, `getByText`); avoid class‑based selectors.

Write Outputs (contracts)
- Updated `projects/vsk-ui-kit/src/lib/atoms/<atom-name>/<atom-name>.stories.ts`  
  - Stories contain `play` functions for relevant scenarios.

Acceptance
- `npm run test` passes (storybook test‑runner), and basic behavior and accessibility are verified.

Next Step
- 06 — Optional Wrapper
