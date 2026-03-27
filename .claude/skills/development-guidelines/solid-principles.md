# SOLID Principles Guardrails

Use this route when maintainability and module design quality are the primary focus.

## In Scope

- Diagnose maintainability risks using SRP, OCP, LSP, ISP, and DIP.
- Identify anti-patterns (god modules, tight coupling, unstable abstractions).
- Recommend behavior-preserving refactor slices with low migration risk.
- Improve boundary clarity across UI, domain, and infrastructure layers.
- Apply Next.js-aware guidance for server/client and route/data boundaries.

## Out of Scope

- Detailed lint failure triage and rule policy (owned by `quality-review`, linting path).
- Primary test strategy ownership (owned by `quality-review`, testing path).
- Component-level a11y/prop ergonomics as primary objective (use `./component-design.md`).
- Formal merge recommendation workflow (owned by `quality-review`, review path).

## Operating Defaults

- Assume Next.js App Router architecture first.
- Prefer incremental refactors that preserve observable behavior.
- Avoid framework-hostile abstractions; keep design aligned with Next.js conventions.
- Prioritize changes that reduce coupling and future change cost.
- Use terms from `../shared/glossary.md` for consistency across skills.
- End with plain-language rationale so non-technical users can follow the refactor value.

## SOLID Heuristic Checklist

Use this practical interpretation:

- **SRP**: modules/components should have one dominant reason to change.
- **OCP**: add behavior via extension points rather than broad edits to stable modules.
- **LSP**: substitutions should preserve expected behavior and contracts.
- **ISP**: consumers should depend only on the interface surface they actually need.
- **DIP**: business logic should depend on stable abstractions, not volatile infrastructure details.

## Next.js-Specific Architecture Checks

When relevant, evaluate:

- server/client dependency direction and accidental browser leakage into server code,
- route handlers and data services coupling,
- cache/revalidation policy placement and testability,
- environment configuration boundaries and dependency injection patterns,
- separation between framework adapters and domain logic.

Include Pages Router compatibility notes only when repository context requires it.

## Workflow

### 1) Identify hotspots

Locate files/modules with high churn, high complexity, or repeated bug patterns.

### 2) Map dependencies

Trace who depends on whom and where coupling prevents safe change.

### 3) Score against SOLID heuristics

Capture violations and their production impact.

### 4) Design incremental refactor slices

Propose smallest-first sequence that preserves behavior.

### 5) Define safety checks

List tests, lint/build checks, and migration notes needed for each slice.

## Required Output Template

```markdown
## Architecture Snapshot
- Scope reviewed:
- Key modules:
- Maintainability risk level:

## SOLID Findings
- SRP:
- OCP:
- LSP:
- ISP:
- DIP:

## Coupling and Risk Map
- Tight coupling points:
- Change-risk hotspots:
- Runtime/behavior regression risks:

## Next.js Boundary Notes
- Server/client architecture issues:
- Route/data layer boundary issues:
- Framework-specific constraints:

## Refactor Plan (Incremental)
1. Step:
   - Goal:
   - Behavior preserved:
   - Verification needed:

## Acceptance Criteria
- Maintainability improvements expected:
- No-regression checks:
- Follow-up opportunities:

## Plain-Language Summary
- Core maintainability problem:
- Why this refactor sequence is safer:
- Expected business/user benefit:

## Next Action
- Recommended next step:
```

Use shared section conventions from `../shared/output-templates.md`.

## Invocation Examples

- "Evaluate this module against SOLID and propose safe refactors."
- "This code is hard to change. How do we reduce coupling?"
- "Give me a step-by-step maintainability refactor plan for this Next.js area."

## Hand-Off Rules

- If task shifts to active implementation, hand execution to `./core-builder-loop.md`.
- If review verdicts are requested, switch to `quality-review` (review path).
- If the main question is component contract/a11y quality, switch to `./component-design.md`.
