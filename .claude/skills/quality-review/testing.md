# Testing Guardrails

Use this route when the main question is test quality, confidence, and coverage.

## In Scope

- Choose test levels by change type (unit, component, integration, route-handler, end-to-end).
- Define minimum test expectations and risk-based coverage.
- Build edge-case matrices for critical behavior.
- Check test quality (assertion strength, determinism, reliability).
- Apply Next.js-aware test guidance for App Router and rendering boundaries.

## Out of Scope

- Lint rule triage and autofix decisions (use `./linting.md`).
- Primary component API/a11y design critiques (use `development-guidelines`, component-design option).
- Broad architecture refactors via SOLID as the primary objective (use `development-guidelines`, SOLID option).
- Independent approval/block review verdicts (use `./review.md`).

## Operating Defaults

- Assume Next.js App Router unless repo context requires Pages Router.
- Prefer repository test scripts first; propose fallback commands when scripts are missing.
- Prioritize high-risk behavior first: auth, writes, payments, routing, caching, and boundary logic.
- Keep wording consistent with `../shared/glossary.md`.
- End outputs with plain-language takeaways for non-technical readers.

## Coverage Expectations by Change Type

Use this baseline unless project context sets stricter rules:

- bug fix: at least one regression test that fails before the fix and passes after,
- UI/component change: behavior tests for states, interactions, and accessibility-critical flows,
- route handler/API change: success, validation failure, and error-path tests,
- data-fetching/caching change: cache/revalidation behavior and stale-data edge tests,
- critical business flow: integration or end-to-end coverage of the happy path plus one failure path.

If coverage is intentionally limited, explain risk and mitigation explicitly.

## Next.js-Specific Testing Guidance

Check and include when relevant:

- App Router route behavior (`app/.../page.tsx`, dynamic segments, loading/error states),
- server component vs client component behavior and `"use client"` boundary assumptions,
- route handlers under `app/api/.../route.ts` (method, status, serialization, runtime assumptions),
- hydration-sensitive UI paths and browser-only API usage,
- caching/revalidation behavior (`fetch` cache options, revalidate semantics).

Add Pages Router notes only when the project uses `pages/`.

## Workflow

### 1) Classify change risk and scope

Capture what changed, who is impacted, and failure severity.

### 2) Select test levels

Choose the minimum set that provides confidence without redundant overlap.

### 3) Define edge-case matrix

Enumerate happy path, expected failures, boundary values, and unexpected inputs.

### 4) Evaluate current tests

Assess whether tests are deterministic, meaningful, and tied to observable behavior.

### 5) Produce prioritized test plan

Order recommended tests by risk reduction and implementation effort.

## Required Output Template

```markdown
## Testing Scope
- Change summary:
- Risk level:
- Systems affected:

## Recommended Test Levels
- Unit:
- Component:
- Integration:
- Route handler/API:
- End-to-end:

## Edge-Case Matrix
- Case:
  - Why it matters:
  - Expected result:

## Coverage Assessment
- Existing tests observed:
- Minimum acceptable coverage for this change:
- Gaps:
- Risk if gaps remain:

## Prioritized Test Plan
1. Test:
   - Type:
   - Priority:
   - Rationale:

## Verification Notes
- Test command(s):
- Known flakiness risks:
- Next.js-specific checks included:

## Plain-Language Summary
- What confidence this test plan provides:
- Remaining uncertainty:
- Why it matters to users:

## Next Action
- Recommended next step:
```

Use shared section conventions from `../shared/output-templates.md`.

## Invocation Examples

- "What tests should we add for this Next.js route handler change?"
- "Are these tests enough before merge?"
- "Create a risk-based test plan for this feature."

## Hand-Off Rules

- If lint issues are the blocker, switch to `./linting.md`.
- If the user wants an approval/block recommendation, switch to `./review.md`.
- If the user asks to execute implementation changes, hand to `development-guidelines` (build-and-ship option).
