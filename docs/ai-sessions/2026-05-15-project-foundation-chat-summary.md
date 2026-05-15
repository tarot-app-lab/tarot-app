# Session: Project foundation and documentation setup

## Goal

Prepare the initial offline-first Tarot App project foundation, documentation structure, release notes, starter backlog, project foundation feature file, and reusable Codex context summary.

## Repository

https://github.com/tarot-app-lab/tarot-app.git

## Local workspace

C:\Users\NorthRagnarr\Documents\Codex\2026-05-15\offline-first-tarot-app-agents-md

## Branch

feature-init-expo-project-structure

## Pull Request

The user opens Pull Requests manually. Use this compare link to create or review the PR:

https://github.com/tarot-app-lab/tarot-app/compare/main...feature-init-expo-project-structure?expand=1

## Required reading for future Codex chats

Before making changes, read:

- AGENTS.md
- docs/architecture.md
- README.md
- docs/backlog.md
- docs/ai-development-rules.md

## Project rules captured in this chat

- Do not push directly to main.
- Work only in separate branches.
- Keep changes small and related to the task.
- Do not rewrite unrelated files.
- Do not add backend, web app, cloud services, accounts, subscriptions, or AI interpretations for MVP.
- Do not add dependencies without approval.
- Always run tests before final answer.
- Push work to https://github.com/tarot-app-lab/tarot-app.git.
- The user wants a PR or compare link in the final answer so they can see what to accept.
- PRs are opened by the human unless explicitly requested otherwise.

## Context from the start of the chat

- The repository had already been cloned locally.
- Branch feature-init-expo-project-structure already existed.
- Initial Expo + React Native + TypeScript project structure had already been added.
- The branch had already been pushed.
- A PR had been opened manually by the human earlier, but GitHub search from Codex did not find an open PR for the branch during this chat.
- Node.js and npm were already installed.
- npm path used in commands: C:\Program Files\nodejs\npm.cmd.

## Work completed in this chat

### Documentation folders

Created missing documentation folders and tracked empty folders with .gitkeep where needed:

- docs/features/.gitkeep
- docs/qa/test-plan.md
- docs/releases/.gitkeep
- docs/ai-sessions/.gitkeep

docs/backlog.md and docs/decisions/.gitkeep already existed.

### Release notes

Created:

- docs/releases/0.1.0.md

Release 0.1.0 is documented as the first offline-first MVP for iOS and Android.

Scope includes:

- Onboarding
- Cards list
- Card details
- Card of the day
- Basic spreads
- Reading result
- Reading history
- Settings
- Local SQLite storage

Out of scope includes:

- Backend
- Accounts
- Cloud sync
- Web app
- Subscriptions
- AI interpretations
- Push notifications

### Dependency installation and test setup

Installed project dependencies with npm install and committed package-lock.json.

Added missing dev dependency:

- @react-native/jest-preset

Updated Jest configuration:

- jest.config.js now uses @react-native/jest-preset.

Updated Babel configuration:

- babel.config.js now uses nativewind/babel as a preset alongside babel-preset-expo.

Added a minimal Jest setup test:

- __tests__/project.test.ts

Reason:

- Jest was configured but had no tests, causing npm test to fail with "No tests found".
- The setup test confirms the Jest environment runs.

### Starter backlog

Replaced docs/backlog.md with a starter test sample backlog.

Important note added:

- "Стартовый тестовый образец backlog до подготовки финальной версии."

Backlog now includes Release 0.1.0 epics:

- Project Foundation
- Cards
- Readings
- History
- Settings

### Project Foundation feature file

Created:

- docs/features/project-foundation.md

Feature goal:

- Prepare the technical foundation so MVP development can continue safely.

Story added:

- Initialize Expo app structure

Acceptance criteria include:

- Project follows docs/architecture.md
- app/ contains routing only
- src/features exists
- src/shared exists
- src/db exists
- src/store exists
- src/services exists
- App starts successfully

Definition of Done includes:

- TypeScript passes
- Jest passes if configured
- No unrelated files changed
- docs/ai-sessions updated

### AI session log

Created:

- docs/ai-sessions/2026-05-15-project-foundation.md

This is a short session log for the Project Foundation feature file.

## Commits pushed during this chat

- b0846e6 docs: add documentation folders
- 6febf15 docs: add 0.1.0 release plan
- 880c28f chore: install project dependencies
- 6b37754 docs: add starter MVP backlog
- fb058bb docs: add project foundation feature

## Changed files across this chat

- __tests__/project.test.ts
- babel.config.js
- jest.config.js
- package.json
- package-lock.json
- docs/ai-sessions/.gitkeep
- docs/ai-sessions/2026-05-15-project-foundation-chat-summary.md
- docs/ai-sessions/2026-05-15-project-foundation.md
- docs/backlog.md
- docs/features/.gitkeep
- docs/features/project-foundation.md
- docs/qa/test-plan.md
- docs/releases/.gitkeep
- docs/releases/0.1.0.md

## Decisions

- Keep MVP offline-first and local-only.
- Do not add backend, web, cloud sync, account system, subscriptions, push notifications, or AI interpretations.
- Store chat/session context in docs/ai-sessions so future Codex chats can recover context.
- Use small, focused commits.
- Push changes to feature-init-expo-project-structure and give the user a PR/compare link.
- Keep route files thin; business logic belongs in src/features, src/store, src/db, and src/services.
- Use package-lock.json for reproducible npm installs.
- Do not run npm audit fix --force without explicit approval because it proposes breaking changes.

## Tests and checks

Successful checks after dependency setup:

- npm test
- npm run typecheck
- npm exec expo -- --version

Expo CLI version reported:

- 55.0.30

Known audit state:

- npm audit --audit-level=moderate reports 9 vulnerabilities in transitive Expo/Jest dependencies.
- npm audit fix --force proposes breaking changes or downgrades.
- No force audit fix was applied.

## Operational notes

- Some PowerShell output displays Cyrillic text with mojibake, but files were written as UTF-8 and GitHub should render them correctly.
- Jest may require elevated execution in this Codex desktop environment because worker process spawning can fail with EPERM inside the sandbox.
- Network access is required for npm install because sandbox mode uses only-if-cached and misses uncached packages.

## Remaining work

- Create or verify the GitHub PR for feature-init-expo-project-structure into main.
- Decide whether to address npm audit findings now or defer until dependency versions are pinned more deliberately.
- Continue from Project Foundation stories before UI-heavy stories.
- Add feature files for Cards, Readings, History, and Settings as separate small tasks.
- Add real tests as implementation stories are built.
- Add manual Expo smoke checks once app screens are implemented.
