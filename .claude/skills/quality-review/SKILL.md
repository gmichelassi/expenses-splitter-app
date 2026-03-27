---
name: quality-review
description: Quality and review skill for Next.js repositories. Routes to focused instructions for lint triage, testing strategy, review verdicts, or review-packet submission. Use when users ask for quality checks, merge-readiness, test sufficiency, or reviewer-facing packaging.
---

# Quality Review

Use this skill as the single entry point for quality and review requests.

## Goal

Select one focused path, then execute that path's instructions.

## Decision Paths

Pick exactly one option first:

1. **Lint triage and quality gate decisions**
   - Use when lint errors, autofix safety, or lint gate policy is the main blocker.
   - Read and follow `./linting.md`.

2. **Testing strategy and coverage planning**
   - Use when users ask what to test, whether tests are enough, or where test gaps exist.
   - Read and follow `./testing.md`.

3. **Independent review verdict and risk findings**
   - Use when users ask for a critique, merge-readiness review, or approve/block recommendation.
   - Read and follow `./review.md`.

4. **Prepare work for reviewer approval**
   - Use when implementation is complete and the goal is a fast, reviewer-ready packet.
   - Read and follow `./submit.md`.

## Selection Rules

- If intent is mixed, choose the immediate bottleneck first.
- If no clear bottleneck is given, default to option 3.
- If objective changes mid-task, switch paths and state why.
- Avoid blending multiple paths in one response unless explicitly requested.

## Required Output Structure

```markdown
## Selected Path
- Option:
- Why this option:

## Execution
- Actions taken:
- Guardrails applied:

## Verification or Evidence
- Checks run:
- Results:

## Next Action
- Recommended next step:
```

## Route Files

- `./linting.md`
- `./testing.md`
- `./review.md`
- `./submit.md`
