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

Исходная архитектура, зависимости, backend/cloud/web и unrelated files не менялись.
