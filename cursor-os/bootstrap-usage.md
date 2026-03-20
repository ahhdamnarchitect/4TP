# Bootstrap Usage

Use this script to initialize Repo OS in a repository.

## Commands

- PowerShell safe mode (create only missing files):
  - `powershell -ExecutionPolicy Bypass -File scripts/init-cursor-os.ps1`
- PowerShell force mode (overwrite defaults):
  - `powershell -ExecutionPolicy Bypass -File scripts/init-cursor-os.ps1 -Force`

## What It Does

- Creates `.cursor/rules`, `brain`, `cursor-os`, and `scripts` if missing.
- Creates default Repo OS files if missing.
- Preserves existing files unless `--force` is passed.
- Prints a summary of created/skipped/overwritten files.

## Recommended Use

1. Run safe mode first.
2. Review generated files.
3. Use force mode only when intentionally resetting templates.
