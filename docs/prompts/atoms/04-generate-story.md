04 — Generate Story (Atoms)

Goal
- Create the per‑atom story file with a Design tab and initial controls, following the Storybook patterns used in this repo.

Inputs
- `llm_current_task_context/atoms/<atom-name>/analysis/states-sizes.json`.
- Figma assets under `projects/vsk-ui-kit/src/stories/assets/atoms/<atom-name>/figma/`.
- Slug `<atom-name>` and optional Russian component name.

Actions
1) Story file path  
   - Use path: `projects/vsk-ui-kit/src/lib/atoms/<atom-name>/<atom-name>.stories.ts`.  
   - Set a stable ASCII `id` in the CSF meta (for example, `'atoms-<atom-name>'`) so Angular Autodocs do not generate invalid selectors like `--story-name-inner-0`.

2) CSF + Taiga re‑export  
   - Use CSF (`Meta`, `StoryObj`, `render`).  
   - Import the component from Taiga re‑export: `@vsk/ui-kit/taiga-ui/<pkg>` (no new dependencies).

3) Title with Russian name  
   - Title may be `Atoms/<atom-name> — <Русское название>`.

4) parameters.design (Design вкладка)  
   - Add Figma link(s) if available.  
   - Add images: prefer `combined.<ext>` from `figma/` as the primary reference; if absent, use a minimal set of extracted files.  
   - Do not invent assets — only use provided ones.

5) Stories (сценарии)  
   - At minimum: `Playground`, `States`, `Sizes`, `Edge cases`.  
   - Use `states-sizes.json` to decide which states/sizes to show.  
   - `args`/`argTypes` must match the public Taiga API (appearance, size, disabled, etc.).  
   - For pseudo states (`hover`, `focus`, `pressed`), never fake CSS in the story. Showcase them via real prop combinations and `play` functions (see step 05). In the static `States` block display only states that can be configured through the API (rest/disabled/loading, etc.) and explicitly mention that the remaining ones are covered by interactive tests.

Write Outputs (contracts)
- `projects/vsk-ui-kit/src/lib/atoms/<atom-name>/<atom-name>.stories.ts`  
  - Story file in CSF style, with correct `Meta`, stories, and `parameters.design`.

Acceptance
- Story builds and renders in Storybook.
- Design tab shows Figma link(s) and correct reference images for the atom.

Next Step
- 05 — Play Tests And A11y
