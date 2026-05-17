# AI Session: исправление EAS_TOKEN в GitHub Actions

## Дата

2026-05-17

## Ветка

codex/fix-eas-token-env

## Контекст

После добавления GitHub repository secret `EAS_TOKEN` ручной workflow `Mobile Build` всё равно падал на шаге `Validate EAS token` с сообщением `Not logged in`.

Причина: workflow проверял наличие secret `EAS_TOKEN`, но `eas-cli` в CI ожидает токен в переменной окружения `EXPO_TOKEN`. Наличие переменной `EAS_TOKEN` само по себе не авторизует `eas-cli`.

## Что сделано

- В `.github/workflows/mobile-build.yml` GitHub secret `EAS_TOKEN` теперь передаётся в EAS CLI также как `EXPO_TOKEN`.
- Изменение внесено в оба шага, где нужен EAS auth:
  - `Validate EAS token`;
  - `Run EAS build`.
- Имя GitHub secret оставлено прежним: `EAS_TOKEN`. Это нормальное имя на стороне GitHub, а `EXPO_TOKEN` используется только как runtime env var для `eas-cli`.

## Почему так

Это минимальный инфраструктурный фикс без изменения архитектуры проекта и без новых библиотек. Workflow сохраняет прежний внешний контракт для репозитория: владелец проекта добавляет secret `EAS_TOKEN`, а CI сам прокидывает его в формат, который понимает Expo/EAS CLI.

## Важное замечание по безопасности

Expo access token был показан на скриншоте в чате. Его нужно считать скомпрометированным:

- удалить/revoke старый token в Expo;
- создать новый token;
- обновить GitHub repository secret `EAS_TOKEN` новым значением;
- удалить лишний GitHub secret `TAROT_APP_SECRET`, если он больше не используется.

## Проверки

План проверки после изменения:

- `npm run typecheck`;
- `npm test -- --runInBand`;
- `npx expo config --type public`;
- ручной запуск GitHub Actions `Mobile Build` с `submit=true` после обновления `EAS_TOKEN`.

## Ограничения

- Реальный EAS build нельзя корректно подтвердить локально без GitHub Actions run и действующего Expo token.
- Backend, cloud и web additions не добавлялись.
- Новые библиотеки не добавлялись.
