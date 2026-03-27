# Shared Output Templates

These reusable sections keep skill outputs consistent across build, review, and
guardrail workflows.

## Universal Response Footer

Append this footer to all major skill outputs.

```markdown
## Plain-Language Summary
- What changed:
- Why it matters:
- Risk or trade-off:

## Next Action
- Recommended next step:
```

## Universal Verification Block

Use when reporting quality gates.

```markdown
## Verification
- Lint:
- Type-check:
- Build:
- Runtime checks:
- Blockers:
```

## Universal Risk Block

Use when the workflow includes risk discussion.

```markdown
## Risk Map
- Risk:
  - Impact:
  - Mitigation:
```

## Usage Rules

1. Keep section titles stable so non-technical readers can scan outputs.
2. If a section is not applicable, write `Not applicable` with a short reason.
3. Avoid unexplained acronyms in `Plain-Language Summary`.
