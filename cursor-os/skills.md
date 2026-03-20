# Skills Blueprint (Manual Cursor UI Setup)

This file is a manual setup blueprint for the Cursor Skills UI.

## Skill: brain_update
- name: `brain_update`
- purpose: Update all brain files after meaningful work.
- when to use: After coding, debugging, refactoring, planning, or documentation changes.
- input expectations: Summary of completed work and impacted files.
- required actions:
  - refresh `brain/current_state.md`
  - append `brain/change_log.md`
  - adjust `brain/next_steps.md`
  - update `brain/decisions.md` if a decision was made
- expected output: Concise summary of changes and remaining work.
- trigger examples:
  - `update brain`
  - `sync memory`
  - `refresh repo brain`

## Skill: repo_analyze
- name: `repo_analyze`
- purpose: Analyze repo and refresh architecture/context docs.
- when to use: Project start, after major refactors, or when context is stale.
- input expectations: Target scope (entire repo or specific modules) and current objective.
- required actions:
  - inspect structure and key modules
  - identify stack, entry points, integrations, and risks
  - refresh `brain/project_context.md` and `brain/architecture.md`
  - update `brain/current_state.md` when findings alter status
- expected output: Concise assessment with updated brain files.
- trigger examples:
  - `analyze repo`
  - `refresh architecture`
  - `inspect codebase`

## Skill: debug_mode
- name: `debug_mode`
- purpose: Enforce step-by-step debugging and root-cause-first fixes.
- when to use: Bugs, regressions, broken builds, failing tests, runtime anomalies.
- input expectations: Error symptoms, expected behavior, and reproduction hints.
- required actions:
  - reproduce or validate issue signal
  - isolate likely root cause through relevant code paths/logs
  - apply minimal targeted fix
  - document issue/fix/follow-up in brain files
- expected output: Root cause, fix, validation, and residual risks.
- trigger examples:
  - `debug this`
  - `root cause`
  - `investigate issue`

## Skill: plan_mode
- name: `plan_mode`
- purpose: Produce implementation plans before coding.
- when to use: Non-trivial features, refactors, migrations, risky changes.
- input expectations: Objective, constraints, and known context.
- required actions:
  - define impacted files/modules
  - list sequencing, risks, and assumptions
  - update `brain/next_steps.md` with actionable steps
  - add `brain/decisions.md` entry if workflow/architecture changes
- expected output: Step-by-step implementation plan ready for execution.
- trigger examples:
  - `plan this`
  - `implementation plan`
  - `break this down`

## Skill: ship_mode
- name: `ship_mode`
- purpose: Wrap up work and prepare handoff-ready repository state.
- when to use: End of session or pre-PR/pre-handoff finalization.
- input expectations: Summary of completed work and verification status.
- required actions:
  - ensure `brain/current_state.md`, `brain/next_steps.md`, `brain/change_log.md` are updated
  - update `brain/decisions.md` when relevant
  - summarize what changed, what remains, and risks
- expected output: Concise handoff package with next actions.
- trigger examples:
  - `wrap up`
  - `prepare handoff`
  - `finish task`
