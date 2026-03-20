---
name: brain-update
description: Updates all brain files after task completion. Use when the user says "update brain" or when completed work changes project state.
---

# Brain Update

## Trigger
- `update brain`

## Instructions
1. Confirm what changed and which files were modified.
2. Update `brain/current_state.md` to reflect the new state.
3. Add a new top entry in `brain/change_log.md` with:
   - date
   - change
   - files modified
4. Update `brain/next_steps.md`:
   - remove completed tasks
   - add follow-ups
5. Update `brain/decisions.md` when a new architecture or logic decision was made.
6. Keep entries concise and structured.
