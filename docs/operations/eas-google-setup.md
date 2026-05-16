# Автоматизация EAS после входа через Google

## Что уже автоматизировано

В проекте есть:

- npm scripts для локальной настройки EAS;
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

Если аккаунт создан через Google, EAS CLI откроет браузер или попросит пройти browser login. Нужно войти тем же Google-аккаунтом.

2. Проверить аккаунт:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run eas:whoami
```

3. Связать проект с EAS:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run eas:configure
```

Можно выполнить первые три шага одной командой:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run eas:setup
```

## Создать token для GitHub Actions

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run eas:token
```

Скопировать значение token и добавить его в GitHub:

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
