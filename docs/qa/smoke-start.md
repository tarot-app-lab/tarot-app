# Smoke-start Expo/Metro

## Цель

Проверить, что локальный Expo/Metro dev server стартует и проект хотя бы доходит до состояния, в котором его можно открыть в Expo tooling.

## Команда

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run smoke:metro
```

Скрипт запускает:

```text
expo start --offline --port 8125
```

## Успешный результат

В выводе должны быть строки уровня:

```text
Starting Metro Bundler
Waiting on http://localhost:8125
```

После проверки процесс нужно остановить через `Ctrl+C`.

## Почему offline

Smoke-start намеренно использует `--offline`, чтобы не путать базовую проверку старта приложения с сетевыми проблемами npm/Expo. Если нужно проверить обычный dev flow, можно использовать:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' start
```

