# Commands Blueprint (Manual Cursor UI Setup)

## `/start`
- command name: `/start`
- exact instruction text:
  - Read all brain files and summarize current repo state, priorities, risks, and next steps.
- purpose: establish immediate context at session start.
- expected behavior: returns concise project snapshot and best next actions.

## `/resume`
- command name: `/resume`
- exact instruction text:
  - Continue from `brain/next_steps.md` and `brain/current_state.md`. Identify the best next action.
- purpose: restart execution without rediscovery.
- expected behavior: selects top-priority task and begins or proposes first concrete step.

## `/update-brain`
- command name: `/update-brain`
- exact instruction text:
  - Refresh `current_state.md`, `next_steps.md`, `decisions.md` if needed, and append to `change_log.md`.
- purpose: keep memory synchronized after meaningful changes.
- expected behavior: updates all required brain files and summarizes what changed.

## `/plan`
- command name: `/plan`
- exact instruction text:
  - Create a step-by-step implementation plan before coding. Include impacted files, risks, and assumptions.
- purpose: reduce execution risk for non-trivial work.
- expected behavior: produces actionable sequence and updates priorities as needed.

## `/analyze`
- command name: `/analyze`
- exact instruction text:
  - Inspect the repo and refresh `architecture.md` and `project_context.md` if stale.
- purpose: re-baseline technical context as code evolves.
- expected behavior: concise analysis with updated architecture/context docs.

## `/ship`
- command name: `/ship`
- exact instruction text:
  - Prepare the repo for handoff by updating brain files, summarizing changes, and listing recommended follow-ups.
- purpose: end session in a resumable state.
- expected behavior: produces handoff summary and cleaned next-step queue.
