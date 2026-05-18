# AI Session: исправление EAS preview credentials

## Дата

2026-05-18

## Ветка

codex/eas-preview-credentials

## Контекст

После исправлений `EAS_TOKEN` и `android.package` workflow `Mobile Build` дошёл до реального запуска Android build, но упал на подготовке credentials:

```text
Generating a new Keystore is not supported in --non-interactive mode
```

Причина: GitHub Actions запускает EAS CLI в non-interactive режиме, а первичная генерация Android keystore требует интерактивного выбора или заранее настроенных credentials.

## Что сделано

- В `eas.json` профиль `preview` для Android настроен как APK build без release credentials:
  - `android.buildType: "apk"`;
  - `android.withoutCredentials: true`.
- Из `eas.json` удалены `channel` поля, потому что в проекте не установлен `expo-updates`, а EAS CLI предупреждал, что channel без `expo-updates` не используется корректно.
- Добавлена документация `docs/operations/eas-build-credentials.md` с описанием разницы между preview artifact validation и production signing.

## Почему так

Для текущего проекта нужен автоматический mobile artifact smoke build, а не production signing pipeline. Preview APK без release credentials позволяет CI проверить мобильную сборку без интерактивной генерации keystore.

Production profile намеренно не переведён в `withoutCredentials`, потому что production Android build должен быть подписан нормальным keystore через Expo remote credentials или local credentials.

## Проверки

План проверки:

- `npm run typecheck`;
- `npm test -- --runInBand`;
- `npx expo config --type public`;
- `npx eas-cli@12 config --profile preview --platform android`;
- GitHub Actions `Mobile Build`: `android` + `preview` + `submit=true`.

## Ограничения

- Production credentials остаются отдельной release-hardening задачей.
- Новые библиотеки не добавлялись.
- Backend, cloud runtime и web additions не добавлялись.
