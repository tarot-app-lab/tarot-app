# Test Plan

This folder contains QA plans and testing notes for the Tarot App MVP.

## Required automated checks

Run before a Pull Request is considered ready for human review:

- `npm ci`
- `npm audit --audit-level=moderate` as a security report; do not apply `npm audit fix --force` without explicit human approval because Expo transitive fixes can be breaking
- `npx expo config --type public`
- `npm run typecheck`
- `npm test -- --runInBand`

## Manual smoke checklist

- App starts with Expo/Metro.
- Home route renders without runtime errors.
- Navigation routes open without red screen errors.
- App remains usable with networking disabled.
- Empty states are shown for features that do not have local data yet.

## Release checklist

- CI is green on the Pull Request.
- Dependency audit output is reviewed, especially transitive Expo/Jest findings.
- No unrelated files are changed.
- No secrets, tokens, API keys, passwords, or `.env` files are committed.
- `eas.json` production profile is reviewed before release.
- SQLite migrations are reviewed for forward-only behavior once local data is implemented.
- Rollback or recovery notes are written for user-visible data changes.
- iOS and Android smoke checks are completed before store submission.

## Current gaps

- There is no end-to-end mobile test automation yet.
- There is no crash reporting or production diagnostics strategy yet.
- SQLite migrations, repositories, and seed validation are not implemented yet.

