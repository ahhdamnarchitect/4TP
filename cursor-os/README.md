# Cursor Repo OS

This repository uses a persistent-memory operating model for AI-assisted work.
The system combines a repo brain (`brain/`) with always-on rules
(`.cursor/rules/`) and reusable operating blueprints (`cursor-os/`).

## How The Brain Works

- `brain/project_context.md`: purpose, stack, constraints, goals, assumptions.
- `brain/architecture.md`: module map, entry points, data flow, and risks.
- `brain/current_state.md`: what exists, likely active work, known issues.
- `brain/decisions.md`: durable decision log with rationale and impact.
- `brain/next_steps.md`: prioritized tasks, cleanup items, backlog, blockers.
- `brain/change_log.md`: concise dated ledger of meaningful repo changes.

## How The Rules Work

Rules in `.cursor/rules/` guide behavior by default:

- `00-repo-brain.mdc`: enforce memory updates and resumable state.
- `01-code-quality.mdc`: keep changes readable and maintainable.
- `02-debugging.mdc`: require root-cause-first debugging.
- `03-planning.mdc`: enforce lightweight planning for non-trivial work.

## How To Use In Future Sessions

1. Read brain files first (or run `/start` if command is configured).
2. Plan work and identify assumptions/risks.
3. Implement in small, reviewable changes.
4. Update brain files before ending session.
5. Commit with clear intent and handoff-ready notes.

## Recommended Workflow

1. read brain
2. plan
3. implement
4. update brain
5. commit

## Quickstart

For a fast "what do I run first" flow, see `cursor-os/quickstart.md`.

For macOS/Linux collaborators, see `cursor-os/non-windows-notes.md`.
