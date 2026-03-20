# Global Repo OS Template

Use this template to initialize a new repository with the same persistent-memory setup.

## Folder Structure

```text
.cursor/
  rules/
brain/
cursor-os/
scripts/
```

## Default Brain Files

- `brain/project_context.md`
- `brain/architecture.md`
- `brain/current_state.md`
- `brain/decisions.md`
- `brain/next_steps.md`
- `brain/change_log.md`

## Default Rules

- `.cursor/rules/00-repo-brain.mdc`
- `.cursor/rules/01-code-quality.mdc`
- `.cursor/rules/02-debugging.mdc`
- `.cursor/rules/03-planning.mdc`

## Recommended Manual UI Setup

- Skills: `brain_update`, `repo_analyze`, `debug_mode`, `plan_mode`, `ship_mode`
- Subagents: `Architect`, `Executor`, `Debugger`, `Analyst`, `Documenter`
- Commands: `/start`, `/resume`, `/update-brain`, `/plan`, `/analyze`, `/ship`

## Onboarding Instructions For A New Repo

1. Run bootstrap script (`scripts/init-cursor-os.ps1`).
2. Review and customize `brain/project_context.md` and `brain/architecture.md`.
3. Verify rule files are visible in Cursor rules UI.
4. Configure manual Skills/Subagents/Commands from `cursor-os/*.md`.
5. Start using `/start` then execute from `brain/next_steps.md`.
