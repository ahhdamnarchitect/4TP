# Non-Windows Notes

This repo is currently optimized for a PowerShell bootstrap flow:

- `scripts/init-cursor-os.ps1`

If you are on macOS or Linux, use one of the options below.

## Option A: Run PowerShell Core

If `pwsh` is installed:

- Safe mode:
  - `pwsh -File scripts/init-cursor-os.ps1`
- Force mode:
  - `pwsh -File scripts/init-cursor-os.ps1 -Force`

## Option B: Manual Setup (No PowerShell Available)

1. Create directories:
   - `.cursor/rules/`
   - `brain/`
   - `cursor-os/`
   - `scripts/`
2. Copy default file content from this repo:
   - `.cursor/rules/00-repo-brain.mdc`
   - `.cursor/rules/01-code-quality.mdc`
   - `.cursor/rules/02-debugging.mdc`
   - `.cursor/rules/03-planning.mdc`
   - all files in `brain/`
   - all files in `cursor-os/`
3. Confirm rules and commands load in Cursor UI.

## Cross-Machine Guidance

- Keep these files committed so every machine gets the same baseline.
- Cursor UI setup (Skills/Subagents/Commands) may still be user/machine scoped;
  use `cursor-os/skills.md`, `cursor-os/subagents.md`, and
  `cursor-os/commands.md` as the source of truth for re-import.
