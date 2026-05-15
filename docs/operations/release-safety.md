# Release Safety

Tarot App is an offline-first mobile MVP. Production readiness is mostly about safe mobile builds, local data reliability, and controlled release flow. Docker, Kubernetes, Terraform, and cloud runtime controls are intentionally out of scope while the app has no backend, web app, or cloud services.

## Release gates

Every release candidate must pass:

- CI on the Pull Request.
- `npm ci`.
- `npm audit --audit-level=moderate` reviewed as a security report.
- `npx expo config --type public`.
- `npm run typecheck`.
- `npm test -- --runInBand`.
- Expo/Metro smoke-start.
- Manual iOS and Android smoke checks.

## EAS profiles

- `development`: development client, internal distribution, `development` channel.
- `preview`: internal distribution, `preview` channel.
- `production`: store-ready production channel with build auto-increment.
- `production-local`: production channel without auto-increment, intended only for local config validation and dry runs.

## Rollback and recovery rules

- Do not release local data schema changes without a forward-only migration plan.
- Do not delete or rewrite user data during migration unless a human explicitly accepts that risk.
- Do not run `npm audit fix --force` without explicit human approval; for this Expo stack it can propose breaking dependency changes.
- For broken releases, prefer halting rollout or shipping a corrective build over introducing remote infrastructure that violates the MVP architecture.
- Document user-visible data risk in the Pull Request before merge.

## Observability expectations

Until a crash reporting strategy is approved, every feature touching local data should expose enough controlled error states for QA to identify:

- failed local database initialization;
- failed migration;
- missing seed data;
- empty state versus corrupted state;
- unrecoverable route or navigation errors.
