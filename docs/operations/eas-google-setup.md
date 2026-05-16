# Автоматизация EAS после входа через Google

## Что уже автоматизировано

В проекте есть:

- npm scripts для локальной настройки EAS;
- локальный wrapper `scripts/eas-cli.cjs`, чтобы EAS scripts работали даже когда `npm`/`npx` не находятся в Windows PATH;
- локальный setup-runner `scripts/eas-setup.cjs`, который выполняет SSO login, `whoami`, `eas init` и `build:configure`;
- GitHub Actions workflow `.github/workflows/mobile-build.yml`;
- preflight-проверка `EAS_TOKEN` в workflow;
- проверка Expo config перед отправкой build;
- ручной запуск EAS build из GitHub Actions через `workflow_dispatch`;
- режим `submit=false`, чтобы проверить workflow без отправки build в EAS.

Полностью автоматизировать Google login и создание secret нельзя безопасно: это доступ к личному/организационному Expo account. Эти шаги должен выполнить человек.

## Один раз локально после signup через Google

1. Войти в Expo account:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run eas:login
```

Если аккаунт создан через Google и обычный login просит email/password, использовать SSO/browser flow:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run eas:login:sso
```

Нужно войти тем же Google-аккаунтом.

2. Проверить аккаунт:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run eas:whoami
```

3. Связать проект с EAS:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' exec --yes --package eas-cli@12 -- eas init --non-interactive --force
```

4. Настроить EAS Build для iOS и Android:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run eas:configure
```

Можно выполнить setup одной командой:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run eas:setup
```

## Создать token для GitHub Actions

В `eas-cli@12` нет команды `token:create`. Token нужно создать в Expo web UI.

Команда ниже печатает правильную ссылку и путь в GitHub:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run eas:token
```

Открыть:

```text
https://expo.dev/accounts/[account]/settings/access-tokens
```

Для текущего проекта account:

```text
leo_dubovetsky
```

После создания token скопировать значение и добавить его в GitHub:

```text
Repository -> Settings -> Secrets and variables -> Actions -> New repository secret
```

Name:

```text
EAS_TOKEN
```

Value:

```text
значение из eas:token
```

Не коммитить `EAS_TOKEN` в `.env`, `app.json`, `eas.json`, docs или исходный код.

## Запустить build из GitHub

1. Открыть repository на GitHub.
2. Перейти в `Actions`.
3. Выбрать `Mobile Build`.
4. Нажать `Run workflow`.
5. Выбрать:
   - `platform`: `android`, `ios` или `all`;
   - `profile`: обычно `preview` для первой проверки;
   - `submit`: `true`, если нужно отправить build в EAS.

Если нужно проверить только preflight без отправки build, выбрать `submit=false`.

Workflow использует `--no-wait`, поэтому итоговый статус и artifact нужно смотреть в Expo/EAS dashboard.

## Локальные build-команды

Preview Android:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run eas:build:preview:android
```

Preview all platforms:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run eas:build:preview:all
```

Production all platforms:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run eas:build:production:all
```

## Что осталось ручным

- Google/Expo login.
- Создание `EAS_TOKEN`.
- Добавление `EAS_TOKEN` в GitHub repository secrets.
- Проверка EAS dashboard после отправки build.
- Apple Developer credentials для production iOS build, если они потребуются.
- Android signing credentials для production Android build, если они потребуются.
