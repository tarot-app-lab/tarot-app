# AI Session: production build preflight и локальный smoke

## Дата

2026-05-18

## Ветка

chore/prod-build-request

## Контекст

Задача: обновить локальную базу от `origin`, собрать production, показать что получилось, проверить ошибки/баги и сохранить полезные правки. Работа велась только в отдельной ветке, без push в `main` и без автоматического PR.

Перед изменениями были прочитаны:

- `AGENTS.md`
- `docs/architecture.md`
- `docs/backlog.md`
- `docs/features/reading-history.md`
- `docs/ai-development-rules.md`
- все файлы из `docs/ai-sessions/`

## Что сделано

- Выполнен `git fetch origin`; `origin/main` обновился до merge-коммита с предыдущими изменениями домашнего экрана.
- Создана отдельная ветка `chore/prod-build-request` от `origin/main`.
- Выполнен чистый `npm ci`; lockfile воспроизводится, `npm audit` показывает `0 vulnerabilities`.
- В `app.json` явно ограничены платформы Expo до `ios` и `android`.
  - Причина: проект по архитектуре является mobile-only MVP; Expo default показывал `web` в public config, что создаёт ложный production signal.
- Проверен warning EAS CLI v12 по `metro.config.js`.
  - Прямой импорт `@expo/metro-config` пробовался как локальная диагностика, но warning не снял.
  - Эту правку не стоит заливать: `@expo/metro-config` не объявлен как direct dependency, а полагаться на transitive package в production config — плохой infra-pattern.
  - В Git оставлен штатный Expo import `expo/metro-config`.

## Production build result

Production EAS config preflight прошёл отдельно для Android и iOS:

- `distribution: store`
- `credentialsSource: remote`
- `autoIncrement: true`

Попытка запустить production build:

```text
npx eas-cli@12 build --platform all --profile production --non-interactive --no-wait
```

Фактический blocker:

```text
Generating a new Keystore is not supported in --non-interactive mode
```

Это не ошибка TypeScript, Jest или Expo config. Это незакрытая release-signing задача: production Android keystore ещё не создан в Expo remote credentials, а non-interactive CI/local run не имеет права впервые генерировать его через prompt.

Повторный Android-only запуск после правок подтвердил тот же blocker. Production profile намеренно не переведён в `withoutCredentials`, потому что это было бы неправильным production signing решением.

## Что получилось показать

Локальный runtime smoke выполнен через существующий script:

```text
npm run smoke:metro
```

Metro успешно слушал `http://localhost:8125`, после проверки процесс был остановлен. Web-preview не добавлялся и не использовался как продуктовая проверка, потому что проект остаётся iOS/Android only.

## Проверки

Выполнены:

- `npm ci`
- `npm run typecheck`
- `npm test -- --runInBand`
- `npx expo config --type public`
- `npx eas-cli@12 config --profile production --platform android`
- `npx eas-cli@12 config --profile production --platform ios`
- `npx eas-cli@12 build --platform all --profile production --non-interactive --no-wait`
- `npx eas-cli@12 build --platform android --profile production --non-interactive --no-wait`
- `npm run smoke:metro`

Результат:

- TypeScript проходит.
- Jest проходит: 5 suites, 13 tests.
- Expo public config теперь содержит только `ios` и `android`.
- Metro стартует.
- Production EAS build блокируется на первичной настройке Android keystore.

## Что осталось сделать человеку или отдельной release-hardening задачей

- Один раз инициализировать Android production keystore в Expo credentials интерактивно или подготовить local credentials через CI secrets.
- После этого повторить `Mobile Build` / EAS production build.
- Не заменять production signing на `withoutCredentials`: это годится для preview APK smoke, но не для store/release production.

## Что стоит заливать в Git

Стоит заливать:

- `app.json` с явным `platforms: ["ios", "android"]`, потому что это закрепляет mobile-only contract проекта и убирает ложный `web` из Expo public config.
- Этот session note, потому что он фиксирует реальный production blocker и выполненные проверки.

Не стоит заливать:

- правку `metro.config.js` на прямой импорт `@expo/metro-config`, потому что она не устранила warning EAS CLI v12 и добавляла риск зависимости от transitive package.
- любые временные preview/web artifacts; проект остаётся iOS/Android only.

## Ограничения

- Backend не добавлялся.
- Cloud runtime не добавлялся.
- Web app не добавлялся.
- Новые зависимости не добавлялись.
- PR автоматически не открывался.
