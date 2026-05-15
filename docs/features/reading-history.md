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

## Stories

- User can see previous readings.
- User can open reading details.
- User can delete reading.

## Acceptance Criteria

- История доступна offline.
- Удаление не ломает остальные записи.
- UI показывает empty state, когда записей нет.
- Репозиторий истории покрывается Jest-тестами после появления реализации.
