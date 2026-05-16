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
- Добавлена документация `docs/qa/smoke-start.md`.
- Добавлена документация `docs/operations/eas-google-setup.md`.

## Проверки

- `npm run smoke:metro` успешно запустил Expo/Metro.
- Metro слушал `http://localhost:8125`.
- Процесс smoke-start был остановлен после проверки.

## Ограничения

- Новые библиотеки не добавлялись.
- Backend, cloud и web additions не добавлялись.
- `EAS_TOKEN` не создавался и не сохранялся в репозитории.
- Вход в Expo/Google account должен выполнить человек.
