# Cookiecutter Next.js Template

This template scaffolds a company-aligned Next.js project using Cookiecutter.

## What It Does

- Collects basic project configuration through prompts.
- Generates a new project folder from `project_slug`.
- Runs `create-next-app` in the generated folder with selected options.
- Disables `create-next-app` Git initialization so only the outer scaffold process creates the repository.

## Prerequisites

- Python 3 + Cookiecutter installed.
- Node.js installed.
- Network access to install npm packages when generating a project.

## Usage

From the repository root:

```bash
cookiecutter ./cookiecutter-nextjs
```

Example non-interactive usage:

```bash
cookiecutter ./cookiecutter-nextjs --no-input project_name="Orders Portal" project_slug="orders-portal"
```

## Output

A new folder named after `project_slug` containing a Next.js application.
