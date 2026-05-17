# AI Session: исправление native identifiers для EAS build

## Дата

2026-05-17

## Ветка

codex/fix-eas-token-env

## Контекст

После исправления передачи `EAS_TOKEN` в `EXPO_TOKEN` workflow `Mobile Build` успешно прошёл авторизацию Expo/EAS:

- `Validate EAS token` прошёл;
- `eas whoami` показал аккаунт `leo_dubovetsky`.

Следующая ошибка появилась уже на шаге реальной сборки:

```text
The "android.package" is required to be set in app config when running in non-interactive mode.
```

Это означает, что EAS CLI не может автоматически спросить package name в CI, потому что workflow работает в non-interactive режиме.

## Что сделано

- В `app.json` добавлен Android application id:
  - `android.package`: `com.leodubovetsky.tarotapp`
- В `app.json` добавлен iOS bundle identifier:
  - `ios.bundleIdentifier`: `com.leodubovetsky.tarotapp`
- В `eas.json` добавлен `cli.appVersionSource: "local"`, чтобы явно зафиксировать источник версии приложения в локальном config и убрать предупреждение EAS CLI о будущем обязательном поле.

## Почему так

EAS build в CI должен быть полностью non-interactive. Все native identifiers обязаны быть заданы заранее, иначе сборка будет падать при первом реальном запуске.

Формат `com.leodubovetsky.tarotapp` выбран как стабильный reverse-DNS identifier для текущего owner/project. Это не меняет архитектуру приложения и не добавляет backend/cloud/web код.

## Проверки

План проверки после изменения:

- `npm run typecheck`;
- `npm test -- --runInBand`;
- `npx expo config --type public`;
- повторный ручной запуск GitHub Actions `Mobile Build` с `submit=true`.

## Ограничения

- Реальный EAS artifact подтверждается только запуском GitHub Actions или EAS build с действующим `EXPO_TOKEN`.
- Новые библиотеки не добавлялись.
- Backend, cloud и web additions не добавлялись.
