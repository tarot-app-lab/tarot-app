# Настройка EAS после входа через Google

## Что уже есть в проекте

В проекте есть ручной GitHub Actions workflow:

```text
.github/workflows/mobile-build.yml
```

Он запускает реальный EAS build вручную через `workflow_dispatch`. Workflow не является required check, потому что без Expo credentials и `EAS_TOKEN` он будет блокировать все PR.

## Что сделать после signup/login через Google

1. Убедиться, что локально доступен EAS CLI:

```powershell
npx eas-cli@12 --version
```

2. Войти в Expo account:

```powershell
npx eas-cli@12 login
```

Если аккаунт создан через Google, CLI откроет браузер или попросит пройти browser login. Нужно войти тем же Google-аккаунтом.

3. Проверить, что CLI видит аккаунт:

```powershell
npx eas-cli@12 whoami
```

4. Связать проект с EAS, если это еще не сделано:

```powershell
npx eas-cli@12 build:configure
```

5. Создать token для GitHub Actions:

```powershell
npx eas-cli@12 token:create
```

6. Добавить token в GitHub repository secrets:

```text
Repository -> Settings -> Secrets and variables -> Actions -> New repository secret
```

Name:

```text
EAS_TOKEN
```

Value:

```text
значение из eas token:create
```

## Как запускать сборку

После добавления `EAS_TOKEN`:

1. Открыть GitHub repository.
2. Перейти в `Actions`.
3. Выбрать `Mobile Build`.
4. Нажать `Run workflow`.
5. Выбрать platform: `android`, `ios` или `all`.
6. Выбрать profile: обычно `preview` для первой проверки.

Workflow отправляет build в EAS с `--no-wait`, поэтому итоговый статус и artifact нужно смотреть в Expo/EAS dashboard.

## Важные ограничения

- Не добавлять `EAS_TOKEN` в `.env`, `app.json`, `eas.json` или код.
- Не делать Mobile Build required check, пока не ясно, что credentials и build minutes стабильно готовы.
- Для iOS production build могут понадобиться Apple Developer credentials.
- Для Android production build могут понадобиться signing credentials.

