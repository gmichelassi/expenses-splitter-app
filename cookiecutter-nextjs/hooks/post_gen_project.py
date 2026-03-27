#!/usr/bin/env python3
"""Generate a Next.js app after Cookiecutter renders the folder."""

from pathlib import Path
import shutil
import subprocess
import sys

PLACEHOLDER_SOURCE_APP = "cc-hook-multi-agent-obvs"


def as_bool(value: str) -> bool:
    return str(value).strip().lower() in {"y", "yes", "true", "1"}


def clean_generated_folder(project_dir: Path) -> None:
    for child in project_dir.iterdir():
        if child.name == ".git":
            continue
        if child.is_dir():
            shutil.rmtree(child)
        else:
            child.unlink()


def build_create_next_app_command() -> list[str]:
    # Git is managed by the outer scaffold process to avoid nested repositories.
    command = ["npx", "create-next-app@latest", ".", "--yes", "--disable-git"]

    if as_bool("{{ cookiecutter.typescript }}"):
        command.append("--ts")
    else:
        command.append("--js")

    if as_bool("{{ cookiecutter.eslint }}"):
        command.append("--eslint")
    else:
        command.append("--no-eslint")

    if as_bool("{{ cookiecutter.app_router }}"):
        command.append("--app")
    else:
        command.append("--no-app")

    if as_bool("{{ cookiecutter.tailwind }}"):
        command.append("--tailwind")
    else:
        command.append("--no-tailwind")

    if as_bool("{{ cookiecutter.src_dir }}"):
        command.append("--src-dir")

    if as_bool("{{ cookiecutter.turbopack }}"):
        command.append("--turbopack")
    else:
        command.append("--no-turbopack")

    package_manager = "{{ cookiecutter.package_manager }}".strip().lower()
    manager_flag_map = {
        "npm": "--use-npm",
        "pnpm": "--use-pnpm",
        "yarn": "--use-yarn",
        "bun": "--use-bun",
    }
    command.append(manager_flag_map.get(package_manager, "--use-npm"))

    import_alias = "{{ cookiecutter.import_alias }}".strip()
    if import_alias:
        command.extend(["--import-alias", import_alias])

    return command


def write_project_readme(project_dir: Path) -> None:
    content = f"""# {{ cookiecutter.project_name }}

{{ cookiecutter.project_description }}

## Local Development

Install dependencies using {{ cookiecutter.package_manager }} and run the development server:

```bash
{{ cookiecutter.package_manager }} install
{{ cookiecutter.package_manager }} run dev
```
"""
    (project_dir / "README.md").write_text(content, encoding="utf-8")


def update_observability_source_app(project_dir: Path, source_app: str) -> None:
    """Replace observability source-app placeholders with project-specific value."""
    if not source_app.strip():
        return

    settings_path = project_dir / ".claude" / "settings.json"
    if not settings_path.exists():
        return

    content = settings_path.read_text(encoding="utf-8")
    if PLACEHOLDER_SOURCE_APP not in content:
        return

    updated = content.replace(PLACEHOLDER_SOURCE_APP, source_app)
    settings_path.write_text(updated, encoding="utf-8")
    print(f"Updated observability source-app in {settings_path}")


def main() -> int:
    project_dir = Path.cwd()

    print("Preparing project folder for create-next-app...")
    clean_generated_folder(project_dir)

    command = build_create_next_app_command()
    print("Running:", " ".join(command))

    result = subprocess.run(command, cwd=project_dir, check=False)
    if result.returncode != 0:
        print("create-next-app failed. Fix the error above and retry generation.", file=sys.stderr)
        return result.returncode

    update_observability_source_app(project_dir, "{{ cookiecutter.project_slug }}")
    write_project_readme(project_dir)
    print("Next.js project generated successfully.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
