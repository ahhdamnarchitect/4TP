# Repo OS Quickstart

Use this if you want to be productive in under a minute.

## First-Time Setup (per machine)

1. Open this repo in Cursor.
2. Confirm rules are visible in `.cursor/rules/`.
3. In Cursor UI, add Skills/Subagents/Commands using:
   - `cursor-os/skills.md`
   - `cursor-os/subagents.md`
   - `cursor-os/commands.md`

## Daily 5-Prompt Flow

1. `/start`
   - Loads repo context, priorities, and current risks.
2. `plan this: <goal>`
   - Or use `/plan` for non-trivial work.
3. Implement your changes.
4. `/update-brain`
   - Syncs `current_state`, `next_steps`, `decisions` (if needed), and `change_log`.
5. `/ship`
   - Produces a handoff-ready summary and follow-ups.

## Fast Prompt Examples

- `analyze repo and refresh architecture`
- `debug this endpoint and find root cause first`
- `plan this feature before coding`
- `update brain after these changes`
- `prepare handoff`

## When It Runs Automatically vs Manually

- Automatic:
  - Rule files in `.cursor/rules/` apply automatically in this repo.
- Manual:
  - Commands run when invoked (for example `/start`).
  - Skill/Subagent behavior is activated by explicit command use or clear trigger phrasing.

## Bootstrap Command (PowerShell)

Run this in repo root if you need to initialize missing files:

`powershell -ExecutionPolicy Bypass -File scripts/init-cursor-os.ps1`
