# Feature: Project Foundation

## Goal

Подготовить техническую основу приложения, чтобы дальше можно было безопасно разрабатывать MVP.

## Stories

### Story: Initialize Expo app structure

As a developer, I want the project to have the approved folder structure, so that future work follows the architecture.

#### Acceptance Criteria

- Project follows docs/architecture.md
- app/ contains routing only
- src/features exists
- src/shared exists
- src/db exists
- src/store exists
- src/services exists
- App starts successfully

#### Definition of Done

- TypeScript passes
- Jest passes if configured
- No unrelated files changed
- docs/ai-sessions updated
