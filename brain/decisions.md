# Decisions Log

## Format
- Date:
- Decision:
- Reason:
- Alternatives Considered:
- Impact:

## Decisions
Append entries below as relevant.

- Date: 2026-03-20
- Decision: Standardize Repo OS memory/rules/docs structure under `brain/`, `.cursor/rules/`, and `cursor-os/`.
- Reason: Ensure future sessions can resume with minimal rediscovery cost.
- Alternatives Considered: Keep ad-hoc notes only in `docs/`.
- Impact: Better handoff continuity and lower context drift across sessions.

- Date: 2026-03-20
- Decision: Keep subscription persistence and transactional email in one API endpoint (`app/api/subscribe/route.ts`).
- Reason: Current scope is Phase 1 waitlist delivery; single endpoint keeps implementation simple.
- Alternatives Considered: Split database write and email into separate services/jobs.
- Impact: Faster delivery, but reliability and observability depend on one path.

- Date: 2026-03-20
- Decision: Provide a PowerShell bootstrap path as first-class Repo OS initialization option.
- Reason: Current environment does not have Node and cannot install it.
- Alternatives Considered: Keep Node-only bootstrap script.
- Impact: Repo OS remains usable on locked-down Windows machines.

- Date: 2026-03-20
- Decision: Remove Node bootstrap script and standardize on PowerShell bootstrap only.
- Reason: User environment cannot install Node and requires one consistent operational path.
- Alternatives Considered: Keep dual bootstrap scripts (.js + .ps1).
- Impact: Simpler docs and reduced toolchain ambiguity across locked-down Windows setups.
