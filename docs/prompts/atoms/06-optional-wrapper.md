06 — Optional Wrapper (Atoms)

Goal
- Only when truly necessary, create a thin, typed wrapper around the Taiga component.

When needed
- Standardize API (rename or restrict inputs).
- Enforce defaults that are hard/impossible to enforce from stories alone.
- Encapsulate logic not related to pure rendering (but avoid heavy business logic).
- Apply tokens that cannot be cleanly attached externally.

Actions
1) Implement wrapper (опционально)  
   - In `projects/vsk-ui-kit/src/lib/atoms/<atom-name>/` create:  
     - `<atom-name>.component.ts|html|scss` (standalone, typed `@Input/@Output`).  
     - `<atom-name>.component.spec.ts` (if possible, aim for ≥80% statements on the wrapper).
   - Import and use only public Taiga APIs/directives; do not rely on private DOM structure.

2) Re-export wrapper  
   - Add wrapper export in `projects/vsk-ui-kit/src/public-api.ts`.

Acceptance
- Wrapper exists only where it has been explicitly agreed with developer/designer.
- Component compiles, tests are green, stories still work.
- No dependency on private Taiga DOM; all styles go through shared tokens/variables or explicitly agreed exceptions.

Next Step
- 07 — Validate And Coverage
