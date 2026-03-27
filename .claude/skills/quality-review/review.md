# Review Someone's Work

Use this route for reviewer mode: identify risk first, then recommend merge status.

## In Scope

- Produce severity-based findings: critical/high/medium/low.
- Check correctness, regressions, security, performance, and maintainability.
- Evaluate Next.js-specific rendering, hydration, and boundary risks.
- Identify test coverage gaps and missing validation.
- Provide explicit recommendation: approve, conditional, or block.

## Out of Scope

- Rewriting large implementation sections unless the user requests fixes.
- PR packaging workflow details owned by `./submit.md`.
- Full feature planning owned by `development-guidelines` (build-and-ship option).

## Consistency Defaults

- Keep severity, risk, and verification terminology aligned with `../shared/glossary.md`.
- Include a plain-language summary so non-technical stakeholders can follow the recommendation.

## Review Priorities (in order)

1. correctness and behavior regressions,
2. security and data exposure risks,
3. performance and rendering stability,
4. maintainability and readability,
5. test adequacy and coverage gaps.

## Next.js Risk Checklist

Apply this checklist when relevant to changed scope:

- hydration mismatch risk from server/client divergence,
- misuse of `"use client"` or unnecessary client-side rendering,
- server component doing browser-only work,
- route handler assumptions (method handling, runtime, cache headers),
- data fetching and revalidation behavior mismatches,
- environment variable leakage to client bundles.

Include Pages Router checks only if repository uses `pages/`.

## Finding Severity Definitions

- `Critical`: merge-blocking defect with likely production impact or security failure.
- `High`: serious risk that should be fixed before merge.
- `Medium`: meaningful quality issue, acceptable only with explicit trade-off.
- `Low`: minor issue or improvement suggestion.

## Required Output Format

Use this exact structure:

```markdown
## Findings
### Critical
- [area] issue, impact, required fix

### High
- [area] issue, impact, required fix

### Medium
- [area] issue, impact, suggested fix

### Low
- [area] issue, optional improvement

## Regression and Risk Summary
- Correctness:
- Security:
- Performance:
- Maintainability:
- Next.js-specific risks:

## Test Coverage and Gaps
- Existing coverage observed:
- Missing tests:
- Recommended tests to add:

## Recommendation
- Decision: Approve | Conditional Approval | Block
- Merge conditions:
- Follow-up actions:

## Plain-Language Summary
- What changed or was reviewed:
- Why this recommendation was made:
- Business/user impact:

## Next Action
- Recommended next step:
```

If no issues exist at a severity level, write `- None`.
Use shared section conventions from `../shared/output-templates.md`.

## Review Workflow

1. Understand intent and changed behavior.
2. Inspect high-risk paths first (auth, data writes, routing/rendering boundaries).
3. Record findings by severity with concrete impact.
4. Map each high/critical finding to a fix direction.
5. Assess tests and call out gaps.
6. Deliver final recommendation with explicit merge conditions.

## Invocation Examples

- "Review someone's work on this Next.js feature."
- "Can you do a merge-readiness review?"
- "Review this and tell me if we should block or approve."

## Hand-Off Rules

- If user asks to fix findings, hand implementation work to `development-guidelines` (build-and-ship option).
- If user asks to prepare updated submission artifacts, hand to `./submit.md`.
