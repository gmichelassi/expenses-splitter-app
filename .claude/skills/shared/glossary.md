# Shared Glossary

Use these terms consistently across all skill outputs to reduce ambiguity for
technical and non-technical readers.

## Core Workflow Terms

- **Build plan**: ordered milestones with acceptance criteria before coding.
- **Verification gate**: lint, type-check, build, and targeted runtime checks.
- **Risk map**: likely failure points plus mitigation notes.
- **Handoff**: final delivery summary that states what shipped and what remains.
- **Plain-language summary**: short explanation for non-technical readers using
  minimal jargon.

## Next.js Terms

- **App Router**: Next.js routing model using the `app/` directory.
- **Pages Router**: legacy routing model using the `pages/` directory.
- **Route segment**: folder-based route unit in App Router.
- **Route handler**: server endpoint file at `app/api/.../route.ts`.
- **Server component**: React component rendered on the server by default.
- **Client component**: component that includes `"use client"` and runs in the
  browser.
- **Hydration mismatch**: difference between server-rendered HTML and client
  render that can cause runtime warnings or broken UI.
- **Revalidation**: refresh strategy for cached data in Next.js.

## Review and Quality Terms

- **Blocker**: issue that must be resolved before merge/release.
- **Critical/High/Medium/Low**: severity scale for review findings.
- **Coverage gap**: important behavior not protected by tests.
- **Accepted risk**: known issue intentionally deferred with owner and follow-up.

## Consistency Rules

1. Use one term per concept (for example, use **route handler**, not mixed with
   endpoint/API route unless comparison is needed).
2. Prefer user-facing phrasing in summaries (for example, "users can now reset
   passwords") before implementation details.
3. When a technical term is required, define it in plain language once.
