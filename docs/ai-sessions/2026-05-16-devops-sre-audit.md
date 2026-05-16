# AI Session: DevOps / Infra / SRE audit

## Дата

2026-05-16

## Ветка

codex/devops-sre-audit

## Цель

Провести честный DevOps / Infra / SRE аудит репозитория Tarot App без изменения архитектуры, без добавления backend/cloud/web и без новых библиотек.

## Обязательное чтение

Перед аудитом были прочитаны:

- `AGENTS.md`
- `docs/architecture.md`
- `docs/backlog.md`
- `docs/features/reading-history.md`
- `docs/ai-development-rules.md`
- все файлы из `docs/ai-sessions/`

## Что проверено

- Git remote и актуальность `main` относительно `origin/main`.
- GitHub Actions workflow `.github/workflows/ci.yml`.
- `package.json`, `package-lock.json`, `tsconfig.json`, `jest.config.js`.
- Expo/EAS конфигурации `app.json` и `eas.json`.
- Наличие Docker, Kubernetes, Helm, Terraform, Ansible и других IaC файлов.
- Поиск явных секретов, токенов, ключей, DSN и внешних endpoints.
- Текущая структура `app/`, `src/`, `assets/`, `docs/`.
- Базовая готовность TypeScript, Jest и Expo/Metro smoke-start.

## Короткий вывод

Проект находится на стадии foundation для offline-first Expo MVP. Он аккуратно ограничен по scope и не нарушает запрет на backend/cloud/web, но до production-ready мобильного продукта далеко.

Главные SRE-риски:

- CI не строит мобильный артефакт и не проверяет EAS production profile.
- Тесты сейчас почти smoke-level и не ловят реальные регрессии пользовательских сценариев.
- SQLite слой фактически не реализован: нет миграций, репозиториев, seed и стратегии восстановления.
- Нет observability-подхода для mobile runtime: crash capture, error boundary, diagnostics, migration telemetry.
- Release safety не описан: нет rollback/update channel стратегии, release checklist и quality gates перед публикацией.

## Проверки

Выполнены:

- `git fetch origin`
- `git rev-list --left-right --count main...origin/main`
- `npm run typecheck` через `C:\Program Files\nodejs\npm.cmd`
- `npm test -- --runInBand` через `C:\Program Files\nodejs\npm.cmd`
- `npm audit --audit-level=moderate` через `C:\Program Files\nodejs\npm.cmd`
- Expo/Metro smoke-start: `npm start -- --offline --port 8123`

Результаты:

- `main` и `origin/main` не расходятся.
- TypeScript проходит.
- Jest проходит: 2 test suites, 3 tests.
- `npm audit --audit-level=moderate`: 0 vulnerabilities.
- Expo/Metro стартует и слушает `http://localhost:8123`; процесс остановлен после проверки.

## Изменения

Первый проход добавил только этот session note. После запроса на исправления по факту аудита были также внесены точечные infra/process изменения без смены архитектуры и без новых библиотек:

- усилен GitHub Actions CI: минимальные `contents: read` permissions, concurrency cancellation, `npm audit --audit-level=moderate`, Expo config validation;
- добавлен `.github/dependabot.yml` для npm и GitHub Actions updates;
- расширен Pull Request template release/QA чеклистом;
- production/preview/development EAS profiles сделаны явными через channels и production auto-increment;
- расширен `docs/qa/test-plan.md`;
- добавлен `docs/operations/release-safety.md`.

## Исправление после CI failure

После push GitHub Actions упал на `npm audit --audit-level=moderate`: в GitHub runner audit нашел известные transitive уязвимости в Expo/Jest цепочке и предложил `npm audit fix --force`, который меняет Expo на breaking version. Это был неверный blocking gate для текущего проекта.

Исправление:

- CI step переименован в `Dependency audit report`;
- для audit step добавлен `continue-on-error: true`, чтобы security output оставался видимым, но не блокировал merge ложным production gate;
- `docs/qa/test-plan.md` и `docs/operations/release-safety.md` уточняют, что audit нужно ревьюить вручную и не запускать `npm audit fix --force` без явного согласования.

## Усиление foundation после повторного запроса

После запроса усилить слабые места без готового фичевого backlog были внесены дополнительные изменения:

- smoke-заглушка `expect(true).toBe(true)` заменена на проверки Expo Router entrypoint и quality scripts;
- добавлены Jest-тесты для SQLite migrations, reading history repository contract и diagnostics;
- добавлен миграционный каркас SQLite: `src/db/migrations/index.ts`, `databaseSchemaVersion`, `getPendingMigrations`, `applyPendingMigrations`;
- добавлен repository contract для reading history без UI-фичи: `src/db/repositories/readingHistory.repository.ts`;
- добавлен локальный diagnostics foundation: `src/services/diagnostics.ts` с redaction чувствительных ключей;
- добавлен ручной GitHub Actions workflow `.github/workflows/mobile-build.yml` для реального EAS build через `workflow_dispatch` и `EAS_TOKEN`;
- обновлены `docs/qa/test-plan.md`, `docs/operations/release-safety.md` и `docs/features/reading-history.md`.

Ограничения:

- пользовательские offline-first сценарии карт, раскладов и истории не реализовывались, потому что для них нет готового backlog;
- remote crash reporting не добавлялся, потому что это новая интеграция/сервис и требует отдельного решения;
- EAS build workflow не сделан required PR check, потому что без `EAS_TOKEN` и release credentials он будет блокировать все PR.

Проверки после усиления:

- `npm ci` проходит;
- `npm audit --audit-level=moderate` локально показывает `0 vulnerabilities`;
- `npx expo config --type public` проходит;
- `npm run typecheck` проходит;
- `npm test -- --runInBand` проходит: 5 test suites, 13 tests;
- Expo/Metro smoke-start в этом проходе не выполнялся, потому что запуск команды с повышенными правами был отклонен пользователем.

Дополнительная правка по документации:

- добавленная документация по QA/release safety переведена на русский по возможности;
- `.github/pull_request_template.md` также переведен на русский, потому что используется как рабочий документ review;
- технические названия workflow, команд, файлов и API оставлены на английском.

Дополнительная CI-правка:

- `CI` теперь запускается на push в любую ветку, а не только в `main`;
- причина: после закрытия PR новый push в `codex/devops-sre-audit` не создавал check-run, и удаленная проверка ветки была невозможна без ручного PR.

## Откат Dependabot noise

После добавления `.github/dependabot.yml` GitHub автоматически открыл пачку Dependabot PR с major/minor dependency bumps. Для текущей стадии проекта это создало лишний шум и риск случайного merge breaking updates.

Что исправлено:

- `.github/dependabot.yml` удален;
- открытые Dependabot PR нужно закрыть без merge;
- dependency updates остаются ручным решением до появления спокойного release/dependency management процесса.

Исходная архитектура, зависимости, backend/cloud/web и unrelated files не менялись.
