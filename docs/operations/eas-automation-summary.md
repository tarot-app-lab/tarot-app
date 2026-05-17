# EAS automation summary

## Зачем это сделано

Цель этой работы - убрать ручную неопределенность вокруг Expo/EAS и сделать сборочный процесс воспроизводимым:

- локально можно одной командой проверить Expo/Metro smoke-start;
- локально можно одной командой подготовить проект к EAS;
- GitHub Actions умеет запускать EAS build вручную;
- секреты не попадают в репозиторий;
- production PR не блокируются EAS-сборкой до настройки credentials.

Проект остается offline-first mobile MVP. Backend, cloud runtime, web app и новые библиотеки не добавлялись.

## Что добавлено в package.json

Добавлены npm scripts:

- `smoke:metro` - запускает Expo/Metro в offline-режиме на порту `8125`.
- `eas:login` - обычный EAS login.
- `eas:login:sso` - SSO/browser login, который подходит для аккаунта, созданного через Google.
- `eas:whoami` - проверка текущего Expo account.
- `eas:init` - non-interactive linking/creation EAS project.
- `eas:configure` - настройка EAS Build для `ios` и `android`.
- `eas:setup` - полный безопасный setup flow.
- `eas:token` - печатает ссылку и инструкцию для создания Expo access token.
- `eas:build:preview:android` - локальная preview-сборка Android.
- `eas:build:preview:all` - локальная preview-сборка всех платформ.
- `eas:build:production:all` - локальная production-сборка всех платформ.

## Почему добавлены scripts/*.cjs

В текущем Windows окружении `npm` и `npx` не всегда доступны в `PATH`, когда команды запускаются через абсолютный путь:

```powershell
& 'C:\Program Files\nodejs\npm.cmd'
```

Чтобы EAS scripts работали стабильно, добавлены wrappers:

- `scripts/eas-cli.cjs` - запускает `eas-cli@12` через текущий `npm_execpath`, не полагаясь на `npm` или `npx` в `PATH`.
- `scripts/eas-setup.cjs` - выполняет автоматический setup flow:
  - проверяет `whoami`;
  - если login отсутствует, запускает `login --sso`;
  - выполняет `eas init --non-interactive --force`;
  - выполняет `build:configure --platform all`.
- `scripts/eas-token-help.cjs` - печатает ссылку на Expo access tokens и путь добавления `EAS_TOKEN` в GitHub.

## Что уже выполнено

EAS login через SSO выполнен успешно.

Текущий Expo account:

```text
leo_dubovetsky
```

EAS project создан и связан:

```text
@leo_dubovetsky/tarot-app
```

Project ID:

```text
f396c80e-8998-498a-a080-1bfad2dfc2ff
```

Этот project ID добавлен в `app.json` в `expo.extra.eas.projectId`, а `owner` установлен в `leo_dubovetsky`.

`npm run eas:setup` успешно проходит и сообщает, что проект готов к EAS Build.

## GitHub Actions Mobile Build

Workflow:

```text
.github/workflows/mobile-build.yml
```

Запускается вручную через `workflow_dispatch`.

Inputs:

- `platform`: `android`, `ios` или `all`;
- `profile`: `development`, `preview` или `production`;
- `submit`: `true` или `false`.

Если `submit=false`, workflow выполняет preflight-проверки без `EAS_TOKEN`, но не отправляет build в EAS.

Если `submit=true`, workflow запускает:

```text
eas build --platform <platform> --profile <profile> --non-interactive --no-wait
```

При `submit=true` workflow требует GitHub secret `EAS_TOKEN`. Если secret отсутствует, workflow падает с прямой ссылкой на страницу создания Expo access token.

## Что осталось ручным

Остался один ручной security-шаг: создать Expo access token и добавить его в GitHub repository secret.

Почему это ручной шаг:

- `EAS_TOKEN` дает доступ к Expo account;
- его нельзя коммитить в репозиторий;
- `eas-cli@12` не поддерживает команду `token:create`;
- token создается через Expo web UI.

Ссылка:

```text
https://expo.dev/accounts/leo_dubovetsky/settings/access-tokens
```

После создания token добавить его в GitHub:

```text
Repository -> Settings -> Secrets and variables -> Actions -> New repository secret
```

Name:

```text
EAS_TOKEN
```

Value:

```text
значение access token из Expo
```

## Как запускать после добавления EAS_TOKEN

1. Открыть GitHub repository.
2. Перейти в `Actions`.
3. Выбрать `Mobile Build`.
4. Нажать `Run workflow`.
5. Для первой проверки выбрать:
   - `platform`: `android`;
   - `profile`: `preview`;
   - `submit`: `false`.
6. Если preflight прошел, повторить с `submit=true`.

Build отправляется с `--no-wait`, поэтому итоговый artifact и статус нужно смотреть в Expo/EAS dashboard.

## Проверки

После настройки были выполнены:

- `npm run eas:setup`;
- `npm run eas:token`;
- `npm run typecheck`;
- `npm test -- --runInBand`;
- `npx expo config --type public`;
- `eas config --profile preview --platform android`.

Все проверки прошли, кроме intentionally manual шага создания `EAS_TOKEN`.
