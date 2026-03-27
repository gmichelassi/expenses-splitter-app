---
name: setup-and-run
description: Interviews requesters and scaffolds one Next.js app directly into the current repository through GitHub Actions using the approved Cookiecutter template.
---

# Setup And Run

Use this skill with GitHub Actions to scaffold directly in the current repository.

## Goal

Interview the requester, dispatch `.github/workflows/scaffold-nextjs-repo.yml`, and return the repository URL.

## In Scope

- Interview the user for all required scaffold inputs.
- Install and validate `gh` CLI with OS-specific instructions when missing.
- Authenticate `gh` before dispatch when needed.
- Verify active token scopes with `gh auth status -t` before dispatch.
- Dispatch GitHub Actions workflow for remote provisioning.
- Track run status and report final repository URL.
- Hand off to local implementation in the same workspace scope after provisioning is complete.

## Out of Scope

- Local Cookiecutter generation on the requester's machine.
- Editing template internals unless explicitly requested.
- Feature implementation inside the generated app.
- Cloning the generated repository into a second local folder when the project is already present in the current workspace.

## Objective

Create one app per project using `cookiecutter-nextjs`, preferring one folder and one repository lifecycle.
Ensure the generated app follows a single repository lifecycle (no nested Git repository inside scaffold output).

## Path Selection (Required)

Use one consistent path only: scaffold into the current repository that already contains the workflow.

## Preconditions

- Workflow file exists: `.github/workflows/scaffold-nextjs-repo.yml`.
- The active `gh` account can run workflows and push to the current repository.

## Workflow

### 1) Detect tool, auth, and token scope state first

Run these checks before interviewing:

```bash
gh --version
gh auth status -t
```

Classify status as:

- `gh_missing`: `gh --version` fails.
- `auth_missing`: `gh` exists but `gh auth status -t` fails.
- `insufficient_scope`: auth succeeds but token scopes do not include `repo`.
- `ready`: checks pass and `repo` scope is present.

Validate scope from `gh auth status -t` output:

- Required: `repo`
- Recommended when targeting organizations: `read:org`

### 2) Install `gh` when missing

If `gh --version` fails, install by operating system.

**macOS**

```bash
brew install gh
```

**Unix-based (Linux)**

```bash
type -p curl >/dev/null || (sudo apt update && sudo apt install curl -y)
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | \
  sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | \
  sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh -y
```

**Windows (PowerShell)**

```powershell
winget install --id GitHub.cli -e
```

After install, re-run:

```bash
gh --version
```

If install still fails, stop and report blocker.

### 3) Authenticate `gh` when needed

If `gh auth status -t` fails, run:

```bash
gh auth login
gh auth status -t
```

Use GitHub.com unless your company uses GitHub Enterprise Server.

If auth still fails, stop and report blocker.

### 4) Verify current repository access

Run from repository root before dispatch:

```bash
current_repo="$(gh repo view --json nameWithOwner -q .nameWithOwner)"
default_branch="$(gh repo view --json defaultBranchRef -q .defaultBranchRef.name)"
echo "$current_repo"
echo "$default_branch"
```

Guardrails:

- If `gh repo view` fails, stop and report blocker.
- If `default_branch` is empty, stop and report blocker.
- Verify the workflow exists on the default branch before dispatch:

```bash
gh api "repos/${current_repo}/contents/.github/workflows/scaffold-nextjs-repo.yml?ref=${default_branch}" >/dev/null
```

- If that check fails, stop and report blocker with this fix: commit/push `.github/workflows/scaffold-nextjs-repo.yml` to the default branch first.

### 5) Interview the requester

Collect these values before dispatch:

1. `project_name` (human-readable display name)
2. `project_description`
3. `package_manager` (`bun`, `npm`, `pnpm`, `yarn`)
4. `typescript` (`true` or `false`)
5. `eslint` (`true` or `false`)
6. `app_router` (`true` or `false`)
7. `tailwind` (`true` or `false`)
8. `src_dir` (`true` or `false`)
9. `turbopack` (`true` or `false`)
10. `import_alias` (for example `@/*`)

### 6) Confirm before execution

Show a short confirmation table and ask explicit approval to run dispatch.

### 7) Dispatch the workflow

Run from repository root:

```bash
gh workflow run scaffold-nextjs-repo.yml \
  --repo "$current_repo" \
  --ref "$default_branch" \
  -f project_name="<project-name>" \
  -f project_description="<description>" \
  -f package_manager="<bun|npm|pnpm|yarn>" \
  -f typescript="<true|false>" \
  -f eslint="<true|false>" \
  -f app_router="<true|false>" \
  -f tailwind="<true|false>" \
  -f src_dir="<true|false>" \
  -f turbopack="<true|false>" \
  -f import_alias="<@/*>"
```

### 8) Track execution and report

```bash
gh run list --workflow scaffold-nextjs-repo.yml --limit 1
gh run view <run-id> --log
```

Return final status and repository URL when complete.

### 9) Local workspace handoff (required before implementation work)

After successful provisioning, continue implementation in the same repository and folder.

Then verify instruction scope in the active implementation folder:

- Prefer `.claude/` guidance.
- If neither exists, tell the user and ask whether to copy baseline guidance into the app repository before feature work.

## Blocking Rules

- Never attempt dispatch if `gh` is missing.
- Never attempt dispatch if `gh auth status -t` fails.
- Never attempt dispatch if token scopes do not include `repo`.
- If installation, authentication, or scope validation cannot be completed, return exact command attempted and the error summary.

## Workspace Execution Boundary (Required)

- This skill is for remote provisioning only.
- After provisioning completes, transition to local implementation in the same workspace scope.
- Do not clone a second app repository folder for this workflow path.
- Do not initialize an additional Git repository in a parent/bootstrap folder for the generated app.

## Required Output Template

```markdown
## Selected Path
- Option: Remote scaffold via GitHub Actions
- Why this option:

## Tooling and Auth
- Operating system:
- gh installed:
- gh auth status -t:
- Required scope present (`repo`):

## Interview Answers
- Project settings:

## Execution
- Dispatch command:
- Workflow run id:
- Guardrails applied:

## Verification or Evidence
- Run status:
- Created repository URL:
- Notable logs:

## Next Action
- Recommended next step:
```
