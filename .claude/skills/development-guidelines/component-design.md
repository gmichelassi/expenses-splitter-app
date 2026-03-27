# Component Design Guardrails

Use this route when component quality and maintainable UI design are the primary goals.

## In Scope

- Evaluate component decomposition and composability.
- Define clear prop contracts and naming conventions.
- Set state ownership boundaries (local, lifted, server-derived).
- Enforce accessibility baseline for interactive UI.
- Apply Next.js server/client component boundary guidance.

## Out of Scope

- Lint workflow ownership and rule triage (owned by `quality-review`, linting path).
- Test coverage strategy as primary deliverable (owned by `quality-review`, testing path).
- System-wide SOLID refactor recommendations outside UI design context (use `./solid-principles.md`).
- Formal approve/block review verdicts (owned by `quality-review`, review path).

## Operating Defaults

- Assume Next.js App Router and React component model.
- Prefer server components by default; add `"use client"` only when interactivity or browser APIs require it.
- Keep component APIs minimal and intention-revealing.
- Optimize for readability and reuse over premature abstraction.
- Keep terms aligned with `../shared/glossary.md`.
- Include plain-language explanations so non-technical readers can understand design trade-offs.

## Design Guardrails

Apply these checks:

- **Single responsibility**: each component has one clear reason to change.
- **Composition over monoliths**: split large components into focused subcomponents.
- **Stable prop contracts**: avoid unclear booleans and overloaded prop meaning.
- **Predictable state flow**: avoid duplicate sources of truth.
- **Accessibility baseline**: semantic structure, labels, keyboard usage, focus/announcement expectations.

## Next.js-Specific Component Rules

When relevant, ensure:

- server components are used for data-heavy rendering where client interactivity is not needed,
- client components are isolated to interaction islands,
- data fetching and serialization boundaries are explicit,
- route segment UI patterns (`loading.tsx`, `error.tsx`, `layout.tsx`) remain coherent,
- no client-only APIs are referenced in server components.

Include Pages Router notes only when `pages/` is present.

## Workflow

### 1) Map component responsibilities

Identify domain responsibility, UI responsibility, and state ownership.

### 2) Evaluate API and naming

Check prop clarity, defaults, and composability ergonomics.

### 3) Audit state and effects

Validate minimal state surface and predictable effect dependencies.

### 4) Run accessibility pass

Review semantics, form labeling, keyboard behavior, and focus handling.

### 5) Recommend refactor path

Provide prioritized, low-risk improvements with expected impact.

## Required Output Template

```markdown
## Component Design Assessment
- Target component(s):
- Primary responsibilities:
- Current pain points:

## Prop and API Review
- Strong patterns:
- Contract risks:
- Naming/ergonomics issues:

## State and Data Flow
- State ownership:
- Duplication/conflict risks:
- Effect/hook concerns:

## Accessibility Check
- Semantics:
- Keyboard/focus:
- Labels/announcements:
- A11y blockers:

## Next.js Boundary Check
- Server vs client split:
- "use client" necessity:
- Data-fetch/render boundary notes:

## Prioritized Refactor Plan
1. Change:
   - Why:
   - Risk:
   - Expected improvement:

## Plain-Language Summary
- Main design issue:
- Why the proposed changes help:
- User impact:

## Next Action
- Recommended next step:
```

Use shared section conventions from `../shared/output-templates.md`.

## Invocation Examples

- "Review this component design and suggest a better split."
- "Are these props and state boundaries clean enough?"
- "Help me refactor this Next.js UI for composability and a11y."

## Hand-Off Rules

- If lint errors dominate the task, switch to `quality-review` (linting path).
- If the user asks for test planning, switch to `quality-review` (testing path).
- If broader maintainability refactors are requested outside UI scope, switch to `./solid-principles.md`.
