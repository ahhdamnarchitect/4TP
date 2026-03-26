# Brain Cheat Sheet

## Daily Flow

1. Start with `/start` to load current context.
2. Pick the top item from `brain/next_steps.md`.
3. Implement work.
4. Run `/update-brain` when done.

## Brain Files At A Glance

- `brain/project_context.md`: mission, stack, constraints, success criteria
- `brain/architecture.md`: modules, data flow, integrations
- `brain/current_state.md`: what exists, in progress, known issues
- `brain/decisions.md`: important choices and rationale
- `brain/next_steps.md`: immediate tasks, backlog, blockers
- `brain/change_log.md`: dated change history

## Windows: npm / Next when Node is not on PATH

From **cmd** (not PowerShell), before `npm`:

```bat
set "PATH=C:\Users\e159305\node\node-v25.8.2-win-x64;%PATH%"
```

Or from repo root: `scripts\install.cmd` then `scripts\build.cmd`.

---

## Command Shortcuts

- `/start`: summarize current state and priorities
- `/resume`: continue from top pending task
- `/plan`: create a new execution plan in `next_steps`
- `/update-brain`: sync all brain files after work
- `/architect`, `/executor`, `/debugger`, `/analyst`: role-based workflows

## Update Checklist

- [ ] `current_state.md` reflects latest system status
- [ ] `change_log.md` has a new dated entry with files changed
- [ ] `next_steps.md` has completed tasks removed and follow-ups added
- [ ] `decisions.md` updated if a new decision was made
