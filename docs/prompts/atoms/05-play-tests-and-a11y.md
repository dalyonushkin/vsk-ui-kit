05 — Play Tests And A11y (Atoms)

Goal
- Add robust play tests to the stories and ensure baseline accessibility.

Inputs
- The atom story file from step 04.
- `analysis/states-sizes.json` for which states/sizes to exercise.

Actions
1) For each interactive story, write `play` using `@storybook/test` (`userEvent`, `within`, `expect`).
2) Cover: click/keyboard/focus flow, disabled behavior, aria roles/labels.
3) Prefer role/text selectors; avoid class‑based selectors.

Write Outputs
- Tests embedded in the story file(s).

Acceptance
- `npm run test` passes locally (storybook test‑runner), basic a11y behaviors verified.

Next Step
- 06 — Optional Wrapper

