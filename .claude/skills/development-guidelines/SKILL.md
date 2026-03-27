---
name: development-guidelines
description: Development guidance skill for Next.js codebases. Routes to focused instructions for feature delivery, SOLID maintainability refactors, or component design guardrails. Use when users ask for development guidelines, architecture guidance, or coding best-practice direction and the correct process must be selected first.
---

# Development Guidelines

Use this skill as the single entry point for development-guideline requests.

## Goal

Select one focused path, then execute that path's instructions.

## Decision Paths

Pick exactly one option first:

1. **Build and ship a feature end-to-end**
   - Use when the user wants implementation, milestone execution, checks, and handoff.
   - Read and follow `./core-builder-loop.md`.

2. **Improve maintainability with SOLID refactors**
   - Use when architecture quality, coupling reduction, and safe refactor planning are primary.
   - Read and follow `./solid-principles.md`.

3. **Improve component API and UI design quality**
   - Use when component decomposition, props/state boundaries, accessibility, or server/client split are primary.
   - Read and follow `./component-design.md`.

## Selection Rules

- If user intent is mixed, choose the dominant immediate objective.
- If no clear objective is stated, default to option 1.
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

- `./core-builder-loop.md`
- `./solid-principles.md`
- `./component-design.md`
