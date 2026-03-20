param(
  [switch]$Force
)

$ErrorActionPreference = "Stop"

$root = (Get-Location).Path

$files = @{
  ".cursor/rules/00-repo-brain.mdc" = @"
---
description: Enforce persistent repo brain workflow
alwaysApply: true
---

Before making any meaningful change, review:
- brain/project_context.md
- brain/current_state.md
- brain/decisions.md
- brain/next_steps.md

After any meaningful change:
- update brain/current_state.md
- append an entry to brain/change_log.md
- update brain/next_steps.md
- add a decision entry to brain/decisions.md if needed
"@;
  ".cursor/rules/01-code-quality.mdc" = @"
---
description: Enforce code quality and maintainability
alwaysApply: true
---

- Prefer simple, readable, modular solutions
- Follow existing patterns unless there is a clear reason to improve them
- Avoid unnecessary complexity
"@;
  ".cursor/rules/02-debugging.mdc" = @"
---
description: Enforce systematic debugging
alwaysApply: true
---

When debugging:
- identify the root cause before proposing broad changes
- inspect logs, call paths, and adjacent files
- prefer minimal targeted fixes
"@;
  ".cursor/rules/03-planning.mdc" = @"
---
description: Enforce planning before large changes
alwaysApply: true
---

For non-trivial tasks:
- briefly plan before implementing
- identify impacted files/modules
- list risks and assumptions
"@;
  "brain/project_context.md" = @"
# Project Context

## Purpose
TODO: Describe what this repo does in 2-5 sentences.

## Tech Stack
- Language:
- Framework:
- Runtime:
- Infra:
- Database:
- Tooling:

## Primary Goals
- Goal 1
- Goal 2

## Constraints
- Constraint
- Constraint

## Success Criteria
- What "done" looks like for this repo

## Assumptions / Unknowns
- Unknown
- Unknown
"@;
  "brain/architecture.md" = @"
# Architecture

## High-Level Design
Describe the overall system simply.

## Key Modules
- Module / directory:
  - Responsibility:
  - Notes:

## Entry Points
- File:
  - Purpose:

## Data Flow
Explain how data moves through the system.

## External Integrations
- Service:
  - Purpose:

## Risks / Fragile Areas
- Risk
- Risk
"@;
  "brain/current_state.md" = @"
# Current State

## What Exists
- Item:
  - Status:
  - Notes:

## In Progress / Likely Active Work
- Work item:
  - Status:
  - Evidence:

## Known Issues
- Issue:
  - Impact:
  - Evidence:

## Open Questions
- Question
- Question
"@;
  "brain/decisions.md" = @"
# Decisions Log

## Format
- Date:
- Decision:
- Reason:
- Alternatives Considered:
- Impact:

## Decisions
Append entries below as relevant.
"@;
  "brain/next_steps.md" = @"
# Next Steps

## Immediate Tasks
- [ ] Task
- [ ] Task

## Recommended Cleanup / Improvements
- [ ] Improvement
- [ ] Improvement

## Backlog
- [ ] Backlog item

## Blockers / Missing Context
- Blocker
- Blocker
"@;
  "brain/change_log.md" = @"
# Change Log

## Format
- Date:
- Change:
- Files Modified:
- Reason:

## Entries
Add a new top entry for the work you are doing right now.
"@;
  "cursor-os/README.md" = @"
# Cursor Repo OS

Repository memory system using brain files + Cursor rules.
"@;
  "cursor-os/skills.md" = @"
# Skills Blueprint (Manual Cursor UI Setup)
"@;
  "cursor-os/subagents.md" = @"
# Subagents Blueprint (Manual Cursor UI Setup)
"@;
  "cursor-os/commands.md" = @"
# Commands Blueprint (Manual Cursor UI Setup)
"@;
  "cursor-os/global-template.md" = @"
# Global Repo OS Template
"@;
  "cursor-os/bootstrap-usage.md" = @"
# Bootstrap Usage

Run:
`powershell -ExecutionPolicy Bypass -File scripts/init-cursor-os.ps1`
"@;
}

$dirs = @(".cursor/rules", "brain", "cursor-os", "scripts")
$created = New-Object System.Collections.Generic.List[string]
$skipped = New-Object System.Collections.Generic.List[string]
$overwritten = New-Object System.Collections.Generic.List[string]

foreach ($dir in $dirs) {
  $absDir = Join-Path $root $dir
  if (-not (Test-Path $absDir)) {
    New-Item -ItemType Directory -Path $absDir -Force | Out-Null
    $created.Add("$dir/")
  }
}

foreach ($rel in $files.Keys) {
  $abs = Join-Path $root $rel
  $exists = Test-Path $abs
  if ($exists -and -not $Force) {
    $skipped.Add($rel)
    continue
  }

  $parent = Split-Path $abs -Parent
  if (-not (Test-Path $parent)) {
    New-Item -ItemType Directory -Path $parent -Force | Out-Null
  }

  $files[$rel] | Set-Content -Path $abs -Encoding utf8
  if ($exists) { $overwritten.Add($rel) } else { $created.Add($rel) }
}

Write-Output "Cursor Repo OS bootstrap summary"
Write-Output "================================"
Write-Output "Root: $root"
Write-Output ("Mode: " + ($(if ($Force) { "force overwrite" } else { "safe (skip existing)" })))
Write-Output ("Created: " + $created.Count)
$created | ForEach-Object { Write-Output ("  + " + $_) }
Write-Output ("Skipped: " + $skipped.Count)
$skipped | ForEach-Object { Write-Output ("  - " + $_) }
Write-Output ("Overwritten: " + $overwritten.Count)
$overwritten | ForEach-Object { Write-Output ("  * " + $_) }
