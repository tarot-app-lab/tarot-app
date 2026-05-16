# Тест-план

Эта папка содержит QA-планы и заметки по тестированию MVP Tarot App.

## Обязательные автоматические проверки

Запускать до того, как Pull Request считается готовым к человеческому review:

- `npm ci`
- `npm audit --audit-level=moderate` как security report; не применять `npm audit fix --force` без явного согласования с человеком, потому что transitive-фиксы Expo могут быть breaking changes
- `npx expo config --type public`
- `npm run typecheck`
- `npm test -- --runInBand`

## Текущее автоматическое покрытие

- Тесты project setup проверяют Expo Router entrypoint и обязательные quality scripts.
- Тесты темы проверяют light/dark theme tokens, spacing и typography.
- Тесты миграций БД проверяют соответствие schema version количеству миграций, выбор pending migrations и запись факта применения миграции.
- Тесты reading history repository проверяют parameterized inserts, mapping строк SQLite, ограниченные list queries и точечное удаление.
- Тесты diagnostics проверяют redaction чувствительного контекста и неизменяемые snapshots событий.

## Ручной smoke checklist

- Приложение стартует через Expo/Metro.
- Home route рендерится без runtime errors.
- Навигационные routes открываются без red screen errors.
- Приложение остается usable при отключенной сети.
- Для фич без локальных данных показываются empty states.

## Release checklist

- CI зеленый на Pull Request.
- Dependency audit output просмотрен, особенно transitive findings в Expo/Jest.
- Нет unrelated files.
- Не закоммичены secrets, tokens, API keys, passwords или `.env` файлы.
- Production profile в `eas.json` просмотрен перед release.
- SQLite migrations проверены на forward-only behavior после появления локальных данных.
- Для user-visible data changes описаны rollback или recovery notes.
- iOS и Android smoke checks выполнены перед отправкой в store.

## Текущие gaps

- Пока нет end-to-end mobile test automation.
- Пока нет remote crash reporting стратегии.
- SQLite seed validation пока не реализована.
- У reading history есть repository contract и тесты, но еще нет user-facing UI flow.

