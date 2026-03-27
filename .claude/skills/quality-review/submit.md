# Submit Work for Review

Use this route when implementation is done and the goal is efficient review.

## In Scope

- Run and report pre-review quality gates.
- Build a reviewer-ready packet with context, behavior changes, and risk map.
- Provide reviewer instructions for fast approval.
- Drive a follow-up loop for feedback resolution and resubmission.

## Out of Scope

- Full implementation planning and coding from scratch.
- Independent reviewer critique and severity verdicts (owned by `./review.md`).
- Deep domain-specific quality decisions unless explicitly requested.

## Consistency Defaults

- Use terms from `../shared/glossary.md` for routing, risk, and verification language.
- End every major response with a plain-language summary for non-technical readers.

## Mandatory Pre-Review Gates

The pre-review gate must include all of the following unless explicitly blocked:

1. lint validation (prefer repo script, else `next lint`),
2. type-check validation (prefer repo script, else `tsc --noEmit`),
3. build validation (prefer repo script; mandatory unless not applicable with reason),
4. targeted runtime checks for changed behavior.

If any gate is skipped, state reason and impact clearly.

## Workflow

### 1) Confirm review context

Capture:

- feature or bugfix objective,
- scope of changed files/systems,
- intended reviewer audience (speed review, deep review, security-sensitive).

### 2) Run pre-review gate

Collect pass/fail/blocked status for lint, type-check, build, and runtime checks.
Summarize failures with short actionable notes.

### 3) Generate review packet

Package the work so reviewers can assess quickly without rediscovering context.

Include:

- business/problem context,
- behavior before vs after,
- architectural notes (especially Next.js boundaries),
- risk map and mitigations,
- test and coverage posture,
- open questions and known limitations.

### 4) Add reviewer instructions

Provide a short, deterministic checklist for reviewers:

- where to focus first,
- what to validate manually,
- what is safe to defer.

### 5) Follow-up and resubmission loop

When feedback arrives:

1. classify each comment (must-fix, should-fix, discuss),
2. apply changes in priority order,
3. rerun affected gates,
4. post a concise delta note for re-review.

## Next.js-Specific Review Prep Checks

Always call out if changed code touches:

- App Router segments, layouts, loading/error states,
- server/client component boundaries and `"use client"` necessity,
- route handlers, cache/revalidation behavior, and runtime assumptions,
- environment variables and accidental client exposure.

Only include Pages Router guidance when project structure requires it.

## Required Output Template

```markdown
## Pre-Review Gate
- Lint:
- Type-check:
- Build:
- Runtime checks:
- Blockers:

## Review Packet
- Objective:
- Scope:
- Behavior change (before -> after):
- Next.js architecture notes:
- Risk map:
  - Risk:
  - Mitigation:
- Test/coverage status:
- Known limitations:

## Reviewer Quick-Path
1. Validate:
2. Spot-check:
3. Decide:

## Re-Review Plan (if needed)
- Feedback triage:
- Fix order:
- Revalidation commands/checks:

## Plain-Language Summary
- What changed:
- Why it matters:
- Risk or trade-off:

## Next Action
- Recommended next step:
```

Use shared conventions from `../shared/output-templates.md` when expanding these sections.

## Invocation Examples

- "Submit my work for review."
- "Prepare a PR packet for these Next.js changes."
- "Package this feature so a reviewer can approve quickly."

## Hand-Off Rules

- If user asks for reviewer verdicts, switch to `./review.md`.
- If major reimplementation is required, hand back to `development-guidelines` (build-and-ship option) first.
