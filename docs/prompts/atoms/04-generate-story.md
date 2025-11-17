04 — Generate Story (Atoms)

Goal
- Create the per‑atom story file with Design tab references and initial controls, following repository CSF patterns.

Inputs
- `analysis/states-sizes.json`
- Extracted assets under `projects/vsk-ui-kit/src/stories/assets/atoms/<atom-name>/figma/`
- Optional russian human name for title subtitle.

Actions
1) Path: `projects/vsk-ui-kit/src/lib/atoms/<atom-name>/<atom-name>.stories.ts`
2) Use CSF with `Meta`/`StoryObj`/`render`. Import the Taiga component from `@vsk/ui-kit/taiga-ui/<pkg>` (no new deps).
3) Title may include russian human name: `Atoms/<atom-name> — <Русское название>`.
4) parameters.design:
   - figma link(s) if provided;
   - image: prefer combined.<ext> from `figma/` if present, else minimal extracted images.
5) Stories: Playground + States + Sizes + Edge cases; args/argTypes consistent with Taiga API.

Write Outputs
- The story file created/updated at the path above.

Acceptance
- Story compiles with repo’s Storybook; Design tab shows Figma link and assets.

Next Step
- 05 — Play Tests And A11y

