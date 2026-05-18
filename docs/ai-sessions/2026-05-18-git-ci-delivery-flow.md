# AI Session: Git и CI delivery flow

## Дата

2026-05-18

## Ветка

chore/delivery-workflow-docs

## Контекст

Пользователь попросил настроить и объяснить нормальный Git/PR/CI процесс, потому что сейчас изменения из Codex-чатов пушатся в виде кода и документации, но непонятно:

- проходят ли тесты регулярно;
- где смотреть отчёты;
- нужны ли отдельные ветки;
- как не сломать `main` постоянными PR.

## Что сделано

- Добавлен npm script `verify`:
  - `npm run typecheck`
  - `npm test -- --runInBand`
  - `npx expo config --type public`
- GitHub Actions `CI` усилен:
  - Jest запускается с JSON output в `jest-results.json`;
  - результат Jest загружается как artifact `jest-results`;
  - в GitHub Actions Summary пишется короткий список quality gates.
- Добавлена документация `docs/operations/git-delivery-flow.md`.
- В `app.json` явно закреплены платформы `ios` и `android`, чтобы CI `expo config` не показывал `web` как поддерживаемую платформу проекта.

## Какой процесс зафиксирован

- `main` должен быть защищённой веткой.
- Работа идёт через короткие ветки `feature/*`, `fix/*`, `chore/*`, `docs/*`.
- Постоянный `develop` на текущем этапе не нужен.
- Каждый Codex-чат с изменениями должен завершаться отдельной веткой и PR.
- PR CI проверяет TypeScript, Jest и Expo config.
- Expo config должен показывать только `ios` и `android`.
- Preview/production EAS builds запускаются отдельно, вручную, когда они действительно нужны.
- Production signing нельзя обходить через `withoutCredentials`.

## Что нужно включить в GitHub UI

В `Settings -> Branches -> Branch protection rules` для `main`:

- Require a pull request before merging.
- Require approvals: минимум 1.
- Dismiss stale approvals after new commits.
- Require status checks to pass.
- Require branches to be up to date.
- Require conversation resolution.
- Block force pushes.
- Block deletions.

Required status check:

- `build-test` или `CI / build-test`, как GitHub покажет после первого run.

## Ограничения

- Branch protection не менялся автоматически из локального окружения.
- Новые библиотеки не добавлялись.
- Backend/cloud/web additions не добавлялись.
- PR автоматически не открывался.
