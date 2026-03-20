---
name: repo-analyze
description: Reads the repository structure and key implementation files to refresh project context and architecture memory. Use when the user requests a repo analysis or architecture/context refresh.
---

# Repo Analyze

## Purpose
Analyze repository state and update memory artifacts.

## Instructions
1. Read the current brain files first:
   - `brain/project_context.md`
   - `brain/architecture.md`
   - `brain/current_state.md`
2. Inspect repository structure and key source files.
3. Identify core modules, runtime flow, and integrations.
4. Update:
   - `brain/project_context.md` (purpose, stack, constraints, success criteria)
   - `brain/architecture.md` (design, modules, data flow, integrations)
5. Add a concise log entry in `brain/change_log.md`.
6. Add follow-up analysis tasks in `brain/next_steps.md` when gaps are found.
