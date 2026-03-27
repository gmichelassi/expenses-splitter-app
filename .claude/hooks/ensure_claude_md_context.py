#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# ///

import json
import sys
from pathlib import Path


def main():
    try:
        # Consume hook input from stdin so Claude's hook pipeline remains healthy.
        _ = json.loads(sys.stdin.read() or "{}")

        claude_md_path = Path(".claude/CLAUDE.md")
        if not claude_md_path.exists():
            sys.exit(0)

        content = claude_md_path.read_text(encoding="utf-8").strip()
        if not content:
            sys.exit(0)

        output = {
            "hookSpecificOutput": {
                "hookEventName": "UserPromptSubmit",
                "additionalContext": (
                    "Required guidance from .claude/CLAUDE.md:\n\n" + content
                ),
            }
        }
        print(json.dumps(output))
        sys.exit(0)

    except Exception:
        # Never block the user flow due to hook errors.
        sys.exit(0)


if __name__ == "__main__":
    main()
