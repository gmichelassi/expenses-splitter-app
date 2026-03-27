# Core Builder Loop

Use this route as the default "build safely" workflow for implementation requests.

## In Scope

- Reduce ambiguity with minimal high-impact clarification.
- Break work into milestones with acceptance criteria and implementation order.
- Execute a safe build loop: implement, verify, explain, repeat.
- Apply Next.js architecture guidance (App Router first, server/client boundaries).
- Produce a clear completion contract and handoff summary for non-technical users.

## Out of Scope

- Independent reviewer verdicts (`approve` or `block`) and severity-based review output.
- Deep specialty checks that belong to focused routes unless explicitly requested.
- PR packaging workflow details owned by `quality-review` (submit path).

## Operating Defaults

- Assume Next.js with App Router unless repository context proves Pages Router usage.
- Prefer repository scripts for checks; use framework fallbacks when scripts are missing.
- Keep explanations plain language after each major action.
- Keep terminology aligned with `../shared/glossary.md`.

## Workflow

### 1) Clarify only what unblocks execution

Ask up to three high-impact questions only when required to avoid rework. Prioritize:

1. expected user behavior,
2. data source or API contract,
3. constraints (deadline, compliance, browser/device, auth assumptions).

If enough context exists, skip questions and begin planning.

### 2) Plan milestones before coding

Create milestone slices that can be verified independently. Each milestone must include:

- concrete outcome,
- acceptance criteria,
- implementation order,
- likely risks and fallback.

Use this format:

```markdown
## Build Plan
1. Milestone: <name>
   - Outcome:
   - Acceptance criteria:
   - Implementation steps:
   - Risks/notes:
```

### 3) Apply Next.js architecture checks up front

Before implementation, make explicit decisions for:

- route location (`app/<segment>/page.tsx`, route groups, dynamic segments),
- server component vs client component boundaries (`"use client"` only where needed),
- data fetching strategy (server fetch, route handlers, caching/revalidation),
- environment variable safety (`NEXT_PUBLIC_*` only for client-safe values),
- route handlers (`app/api/.../route.ts`) and runtime constraints.

Add Pages Router notes only when existing project files require it.

### 4) Execute safe implementation loop

For each milestone:

1. implement the smallest valuable increment,
2. run relevant checks (lint, type-check, build, targeted runtime behavior),
3. describe what changed, why it changed, and known risks in plain language,
4. continue or pause for clarification when blocked.

### 5) Verification gate per milestone

Use repository-native scripts first; otherwise apply fallbacks:

- lint: repo script, else `next lint`,
- type-check: repo script, else `tsc --noEmit` in TypeScript projects,
- build: repo build script (mandatory unless explicitly not applicable),
- runtime check: targeted validation for changed routes/components/handlers.

For UI or rendering changes, explicitly validate hydration and server/client boundaries.

### 6) Completion contract and handoff

When all milestones pass, close with definition of done, risks, and next steps.

Use this final block:

```markdown
## Delivery Handoff
- Built:
- User-visible behavior:
- Verification run:
  - Lint:
  - Type-check:
  - Build:
  - Runtime checks:
- Known risks:
- Follow-ups (optional):
- Recommended next action:
```

## Required Output Structure

When this route is active, respond in this order:

1. `Build Plan` (or `Execution Update` if already in progress),
2. `Implementation` (what changed),
3. `Verification` (lint/type/build/runtime status),
4. `Plain-Language Explanation` (for non-technical readers),
5. `Next Step`.

Use the shared footer conventions from `../shared/output-templates.md`.

## Invocation Examples

- "Build a customer settings page in our Next.js app with profile + password sections."
- "Help me ship this feature end-to-end, including checks."
- "Implement this ticket safely and explain each step in simple terms."

## Hand-Off Rules

- When user asks to package work for approval, switch to `quality-review` (submit path).
- When user asks for independent critique or verdict, switch to `quality-review` (review path).
- Pull in other routes only for focused quality depth, not as replacement for this flow.
