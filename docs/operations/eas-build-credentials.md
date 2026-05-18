# EAS Build credentials

## Зачем это нужно

GitHub Actions workflow `Mobile Build` запускает EAS в non-interactive режиме. В таком режиме EAS CLI не может впервые спросить у человека, нужно ли создать Android keystore. Поэтому Android build падал на шаге credentials:

```text
Generating a new Keystore is not supported in --non-interactive mode
```

Это не ошибка TypeScript/Jest и не проблема `EAS_TOKEN`. Это отдельный слой release signing.

## Как настроен текущий проект

Для профиля `preview` Android настроен как проверочный mobile artifact build:

```json
{
  "preview": {
    "distribution": "internal",
    "android": {
      "buildType": "apk",
      "withoutCredentials": true
    }
  }
}
```

Такой профиль нужен для CI-проверки, что проект реально доходит до мобильной сборки и отдаёт Android artifact без интерактивной генерации release keystore.

## Почему preview без credentials

На текущем этапе проекта нет production release process и нет Google Play/App Store signing pipeline. Поэтому требовать release keystore для каждого smoke build преждевременно: это ломает автоматизацию до появления настоящего release-процесса.

`preview` не является production signing flow. Это инженерная проверка собираемости мобильного артефакта.

## Что осталось для production

Для `production` профиль намеренно не переведён в `withoutCredentials`. Production Android build должен использовать нормальные signing credentials:

- remote credentials в Expo;
- или local credentials через `credentials.json` и секреты CI.

Первичная настройка production Android credentials должна выполняться как отдельная release-hardening задача. До этого production EAS build может падать на отсутствии keystore, и это ожидаемое ограничение.

## Как запускать сейчас

Для текущей проверки в GitHub Actions:

- `platform`: `android`;
- `profile`: `preview`;
- `submit`: `true`;
- GitHub repository secret `EAS_TOKEN` должен быть задан;
- secret должен быть свежим, не засвеченным в скриншотах или логах.

## Важное про Expo token

Если Expo access token был показан на скриншоте, его нужно считать скомпрометированным:

- удалить/revoke старый token в Expo;
- создать новый token;
- обновить GitHub repository secret `EAS_TOKEN`;
- не хранить token в репозитории, документации или issue/PR comments.
