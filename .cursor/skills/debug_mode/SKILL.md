---
name: debug-mode
description: Enforces step-by-step debugging before making changes. Use when fixing bugs, regressions, runtime errors, or when the user requests debug mode.
---

# Debug Mode

## Instructions
1. Reproduce the issue with concrete evidence.
2. Isolate likely root cause using logs, traces, and code-path checks.
3. Confirm root cause before implementing any fix.
4. Apply the smallest safe change.
5. Validate with targeted tests or reproduction steps.
6. Update `brain/current_state.md` and `brain/change_log.md` with results.

## Rules
- No blind edits before root-cause confirmation.
- Prefer one hypothesis at a time.
- Include explicit validation after the fix.
