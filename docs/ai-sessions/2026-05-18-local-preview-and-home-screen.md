# AI Session: локальный просмотр болванки и стартовый экран

## Дата

2026-05-18

## Ветка

codex/eas-preview-credentials

## Контекст

После настройки EAS возникла отдельная задача: быстро посмотреть текущую "болванку" приложения локально и сделать стартовый экран не пустым.

Проект остаётся offline-first mobile app для Android и iOS. Web-приложение не является целевой платформой проекта.

## Что выяснилось при локальном запуске

Попытки открыть `http://localhost:8090` через Expo/Metro дали белый экран. Причина была не в `app/index.tsx`, а в web-bundle:

```text
Unable to resolve "react-native-web/dist/index"
```

Также в окружении были переменные proxy:

```text
HTTP_PROXY=http://127.0.0.1:9
HTTPS_PROXY=http://127.0.0.1:9
ALL_PROXY=http://127.0.0.1:9
NPM_CONFIG_OFFLINE=true
```

Из-за этого часть команд Expo/npm вела себя нестабильно, а web preview был непригоден как нормальная проверка mobile-приложения.

## Временный preview

Для быстрой визуальной проверки был временно поднят отдельный Node preview на `http://localhost:8091`, который показывал HTML-макет стартового экрана с колодой таро.

Этот preview не является частью продукта и не должен попадать в PR:

- `.preview-server.cjs` не коммитится;
- `.expo/` не коммитится;
- `react-native-web`, `react-dom`, `@expo/metro-runtime` не должны добавляться только ради браузерной витрины.

Причина: пользователь явно напомнил, что проект — локальное offline mobile приложение для Android/iOS, без web additions.

## Что сделано в приложении

В `app/index.tsx` пустой стартовый экран заменён на простую mobile-safe визуальную болванку:

- нарисована стопка из трёх tarot cards средствами React Native `View`/`Text`;
- добавлено название `Tarot App`;
- добавлена подпись `Offline-first tarot readings for iOS and Android.`;
- добавлена строка `Cards, spreads, and reading history.`;
- новые библиотеки не добавлялись;
- ассеты не добавлялись;
- backend/cloud/web additions не добавлялись.

## Что нужно пушить

Пушить в Git нужно только полезные изменения для mobile-приложения:

- `app/index.tsx`;
- этот session note в `docs/ai-sessions`.

Не нужно пушить временную browser-preview инфраструктуру и web-зависимости.

## Проверки

План проверки перед push:

- удалить временные preview/web artifacts;
- восстановить `package.json` и `package-lock.json` без web additions;
- `npm run typecheck`;
- `npm test -- --runInBand`;
- проверить `git status`, чтобы не было unrelated/temp files.

## Оставшиеся замечания

Для настоящего просмотра mobile-приложения дальше лучше использовать:

- Expo Go на телефоне;
- Android emulator;
- iOS simulator на macOS;
- EAS preview build для Android APK.

Browser preview можно вернуть только отдельным осознанным решением, если web станет поддерживаемой платформой проекта.
