---
name: update-brain
description: Updates persistent brain files after task completion. Use when the user says "update brain" or when finishing implementation work that changes project state.
---

# Update Brain

## Purpose

Keep project memory accurate after completed work so future agents can resume quickly.

## When To Use

- User explicitly says: `update brain`
- A task is completed and system state changed
- A decision was made that should be remembered

## Required Updates

After completing changes, update these files:

1. `brain/current_state.md`
   - Add the new state in concise bullets.

2. `brain/change_log.md`
   - Append date, change summary, and files modified.
   - Do not rewrite prior entries.

3. `brain/next_steps.md`
   - Remove completed tasks.
   - Add follow-up actions that remain.

4. `brain/decisions.md` (only when needed)
   - Append decisions with date and rationale.

## Workflow

1. Confirm the task outcome and files touched.
2. Update `current_state.md`.
3. Append one entry to `change_log.md`.
4. Reconcile `next_steps.md` (done vs pending).
5. If any architectural/process choice was made, append to `decisions.md`.
6. Keep entries short, factual, and append-only for historical sections.

## Output Style

- Concise bullets
- ISO-like date heading (`YYYY-MM-DD`)
- Clear file paths in backticks
