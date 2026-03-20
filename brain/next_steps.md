# Next Steps

## Immediate Tasks
- [ ] Verify current Vercel deployment status and resolve any active failures.
- [ ] Run end-to-end subscribe flow test (UI submit, Supabase insert, Resend delivery).
- [ ] Confirm all Cursor rules/skills/commands appear correctly in UI after reload.
- [ ] Validate PowerShell bootstrap with `-Force` in a disposable repo copy.
- [ ] Validate `cursor-os/quickstart.md` with a fresh session flow.
- [ ] Validate `cursor-os/non-windows-notes.md` with one macOS/Linux collaborator.

## Recommended Cleanup / Improvements
- [ ] Add lightweight API-level tests or smoke checks for `/api/subscribe`.
- [ ] Refactor oversized HTML email template into reusable constants/template module.

## Backlog
- [ ] Add periodic architecture/context refresh routine after major milestones.
- [ ] Add production monitoring checklist for subscriber pipeline health.

## Blockers / Missing Context
- Current production deployment logs are not available in this environment.
- No explicit test framework or CI validation flow is documented in-repo.
