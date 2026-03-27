# Linting Guardrails

Use this route when lint quality is the primary concern.

## In Scope

- Define lint gate policy before review or release.
- Resolve command selection (`npm run lint`/repo script first, `next lint` fallback).
- Triage lint failures into autofix, manual fix, and policy decision buckets.
- Prioritize fixes that affect correctness, accessibility, and maintainability.
- Explain when lint failures can be deferred and how to document that risk.

## Out of Scope

- Test strategy design and coverage decisions (use `./testing.md`).
- Component API and UX architecture critique (use `development-guidelines`, component-design option).
- SOLID refactor planning as a primary objective (use `development-guidelines`, SOLID option).
- Independent approve/block review verdicts (use `./review.md`).

## Operating Defaults

- Assume Next.js App Router unless repository structure indicates Pages Router.
- Use repo-native lint script first; fallback to `next lint` only when needed.
- Treat lint as a quality gate: unresolved errors should block merge unless explicitly accepted with risk notes.
- Use shared terminology from `../shared/glossary.md`.
- Close with a plain-language summary for non-technical readers.

## Lint Gate Policy

Apply these rules:

1. **Run lint before review packaging** as part of standard verification.
2. **Autofix only where safe** (`--fix`) and review resulting diffs for behavior-sensitive files.
3. **No silent suppression** (`eslint-disable`) without explicit justification and scope minimization.
4. **Document accepted debt** with owner and follow-up timeline when exceptions are approved.

## Next.js-Specific Lint Considerations

Call out and prioritize:

- server/client boundary misuse and unnecessary `"use client"` patterns,
- accessibility issues in interactive components and forms,
- risky hook usage in client components,
- framework-specific anti-patterns (for example, non-optimized image/link usage when relevant),
- environment variable misuse that risks client exposure.

Include Pages Router-specific notes only when `pages/` exists.

## Workflow

### 1) Resolve lint command source

Identify repo script and fallback behavior before running checks.

### 2) Run lint and classify results

Split findings into:

- autofix-safe,
- manual-code-fix required,
- rule/config policy decisions.

### 3) Prioritize by production risk

Address errors with correctness, security, accessibility, and runtime impact first.

### 4) Apply and validate fixes

Re-run lint and note any remaining intentional exceptions.

### 5) Publish lint status

Provide pass/fail/blocked outcome with clear next actions.

## Required Output Template

```markdown
## Lint Gate Status
- Command used:
- Result: Pass | Fail | Blocked
- Blocking issues count:

## Findings Triage
- Autofix-safe:
- Manual fix required:
- Policy decision required:

## Priority Fix Plan
1. Issue:
   - Risk:
   - Fix approach:
   - Owner/action:

## Exception Log (if any)
- Rule or file:
- Reason:
- Risk accepted:
- Follow-up due date/owner:

## Revalidation
- Lint rerun result:
- Remaining blockers:
- Next.js-specific checks noted:

## Plain-Language Summary
- Current lint health:
- What is blocking release (if anything):
- User/business impact:

## Next Action
- Recommended next step:
```

Use shared section conventions from `../shared/output-templates.md`.

## Invocation Examples

- "Run lint triage and tell me what blocks merge."
- "Should we autofix these lint errors or do manual fixes?"
- "Set a lint gate checklist for this Next.js repo."

## Hand-Off Rules

- If test coverage is the core issue, switch to `./testing.md`.
- If problems are primarily component architecture/a11y design, switch to `development-guidelines` (component-design option).
- If the user asks for broader implementation changes, hand to `development-guidelines` (build-and-ship option).
