# AI Development Rules

## Required Reading

Before making changes, read:

- `AGENTS.md`
- `docs/architecture.md`

## Boundaries

- Do not push directly to `main`.
- Work only in separate branches.
- Keep changes small and related to the task.
- Do not rewrite unrelated files.
- Do not add backend services.
- Do not add a web app.
- Do not add cloud services.
- Do not add dependencies without approval.
- Do not commit secrets, tokens, API keys, or passwords.

## Architecture

- Use feature-based architecture.
- Keep route files in `app/` focused on routing and screen composition.
- Keep business logic in `src/features`, `src/store`, `src/db`, and `src/services`.
- Keep local data in SQLite, AsyncStorage, SecureStore, or bundled assets according to `docs/architecture.md`.

## Pull Requests

Every AI change must go through human review. Pull Requests should include:

- what changed;
- why it changed;
- how it was tested;
- known risks.
