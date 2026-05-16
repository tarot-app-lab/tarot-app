# Release Safety

Tarot App - это offline-first mobile MVP. Production readiness здесь в первую очередь про безопасные mobile builds, надежность локальных данных и контролируемый release flow. Docker, Kubernetes, Terraform и cloud runtime controls намеренно вне scope, пока у приложения нет backend, web app или cloud services.

## Release gates

Каждый release candidate должен пройти:

- CI на Pull Request.
- `npm ci`.
- `npm audit --audit-level=moderate`, просмотренный как security report.
- `npx expo config --type public`.
- `npm run typecheck`.
- `npm test -- --runInBand`.
- Expo/Metro smoke-start.
- Ручные iOS и Android smoke checks.
- Ручной запуск GitHub workflow `Mobile Build` для целевой platform и EAS profile.

## EAS profiles

- `development`: development client, internal distribution, channel `development`.
- `preview`: internal distribution, channel `preview`.
- `production`: store-ready production channel с build auto-increment.
- `production-local`: production channel без auto-increment, только для локальной config validation и dry runs.

## Mobile artifact builds

Workflow `.github/workflows/mobile-build.yml` запускает реальный EAS build через `eas-cli` major version 12.

Требования:

- `EAS_TOKEN` должен быть настроен как repository secret.
- Человек выбирает platform и profile через `workflow_dispatch`.
- Workflow использует `--no-wait`, поэтому статус EAS build artifact нужно проверять в EAS после отправки.

Этот workflow намеренно пока не является required Pull Request check. EAS builds требуют credentials и могут тратить build minutes; если сделать их обязательными до настройки credentials, будут блокироваться все PR.

## Rollback and recovery rules

- Не выпускать изменения local data schema без forward-only migration plan.
- Не удалять и не перезаписывать user data во время migration, если человек явно не принял этот риск.
- Не запускать `npm audit fix --force` без явного согласования с человеком; для этого Expo stack команда может предложить breaking dependency changes.
- Для broken releases предпочитать остановку rollout или corrective build, а не добавление remote infrastructure, нарушающей MVP architecture.
- Документировать user-visible data risk в Pull Request до merge.

## Observability expectations

Пока crash reporting strategy не утверждена, каждая фича, работающая с локальными данными, должна иметь достаточно controlled error states, чтобы QA мог определить:

- failed local database initialization;
- failed migration;
- missing seed data;
- empty state versus corrupted state;
- unrecoverable route или navigation errors.

Начальная local diagnostics foundation находится в `src/services/diagnostics.ts`. Она записывает structured events в памяти и редактирует sensitive context keys. Это не remote crash reporting system.
