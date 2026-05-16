# Feature: Reading History

## Goal

Сохранять локальную историю раскладов, чтобы пользователь мог вернуться к прошлым результатам.

## Scope

- список прошлых раскладов;
- экран деталей сохраненного расклада;
- удаление записи;
- локальное хранение в SQLite.

## Out of Scope

- cloud backup;
- аккаунты;
- синхронизация между устройствами;
- экспорт истории.

## Architecture Notes

- Route files остаются в `app/history/*`.
- Логика истории находится в `src/features/readings` или отдельном подмодуле `src/features/readings/history`, если появится сложность.
- SQLite schema и repository находятся в `src/db`.
- UI history не должен напрямую работать с raw SQL.
- Базовый repository contract для истории находится в `src/db/repositories/readingHistory.repository.ts`.
- Миграция `002_create_reading_history` создает таблицу `reading_history` и индекс по `created_at`.

## Stories

- User can see previous readings.
- User can open reading details.
- User can delete reading.

## Acceptance Criteria

- История доступна offline.
- Удаление не ломает остальные записи.
- UI показывает empty state, когда записей нет.
- Repository contract и миграции покрываются Jest-тестами.
- UI-сценарии истории покрываются отдельными тестами после появления экранов и feature logic.
