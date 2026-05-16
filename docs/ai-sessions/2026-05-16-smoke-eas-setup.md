# AI Session: Smoke-start и EAS setup

## Дата

2026-05-16

## Ветка

codex/smoke-eas-setup

## Цель

Закрыть два оставшихся operational gaps:

- сделать воспроизводимый Expo/Metro smoke-start;
- описать понятный следующий шаг после signup/login в Expo через Google для запуска EAS Mobile Build.

## Что сделано

- Добавлен npm script `smoke:metro`, который запускает `expo start --offline --port 8125`.
- Добавлены npm scripts для EAS login, whoami, configure, token и типовых preview/production build-команд.
- Добавлен wrapper `scripts/eas-cli.cjs`, чтобы EAS npm scripts не зависели от наличия `npm`/`npx` в Windows PATH при запуске через абсолютный `npm.cmd`.
- Добавлен `scripts/eas-setup.cjs` для автоматического SSO setup flow.
- `eas:token` заменен на help-script, потому что `eas-cli@12` не поддерживает `token:create`.
- GitHub Actions workflow `Mobile Build` усилен preflight-проверкой `EAS_TOKEN`, `eas whoami`, режимом `submit=false` и summary.
- Добавлена документация `docs/qa/smoke-start.md`.
- Добавлена документация `docs/operations/eas-google-setup.md`.

## Проверки

- `npm run smoke:metro` успешно запустил Expo/Metro.
- Metro слушал `http://localhost:8125`.
- Процесс smoke-start был остановлен после проверки.
- `npm run typecheck` проходит.
- `npm test -- --runInBand` проходит.
- `npx expo config --type public` проходит.

## Ограничения

- Новые библиотеки не добавлялись.
- Backend, cloud и web additions не добавлялись.
- `EAS_TOKEN` не создавался и не сохранялся в репозитории.
- Вход в Expo/Google account должен выполнить человек.

## EAS account setup

- `eas:login:sso` успешно выполнил browser/SSO login.
- `eas:whoami` показал account `leo_dubovetsky`.
- `eas init --non-interactive --force` создал и связал EAS project `@leo_dubovetsky/tarot-app`.
- Project ID: `f396c80e-8998-498a-a080-1bfad2dfc2ff`.
- `eas-cli@12` не содержит `token:create`; `EAS_TOKEN` нужно создать в Expo web UI и добавить в GitHub repository secrets.

## Максимальная автоматизация EAS

После запроса автоматизировать EAS setup:

- `npm run eas:setup` теперь выполняет полный безопасный setup flow:
  - проверяет текущий login через `whoami`;
  - если login отсутствует, запускает `login --sso`;
  - выполняет `eas init --non-interactive --force`;
  - выполняет `build:configure --platform all`;
- `npm run eas:setup` успешно выполнен на аккаунте `leo_dubovetsky`;
- EAS project уже связан с project ID `f396c80e-8998-498a-a080-1bfad2dfc2ff`;
- `npm run eas:token` теперь печатает ссылку на Expo access tokens и путь добавления GitHub secret, вместо вызова несуществующей команды `token:create`.

Оставшийся ручной шаг:

- создать Expo access token в web UI;
- добавить его в GitHub repository secret `EAS_TOKEN`.
