# Feature: Cards

## Goal

Дать пользователю локальный каталог карт Таро с быстрым просмотром значения карты.

## Scope

- список карт;
- экран деталей карты;
- upright и reversed значения;
- локальные изображения карт из `assets/cards`;
- чтение данных через SQLite repository.

## Out of Scope

- backend;
- cloud sync;
- пользовательские колоды;
- AI interpretations.

## Architecture Notes

- Route files остаются в `app/cards/*`.
- Логика и типы находятся в `src/features/cards`.
- Доступ к данным идет через `src/db/repositories`.
- Seed-данные готовятся отдельно и попадают в SQLite при локальной инициализации.

## Stories

- User can see cards list.
- User can search cards.
- User can open card details.
- User can see upright and reversed meanings.

## Acceptance Criteria

- Экран списка работает offline.
- Экран карты не содержит бизнес-логики загрузки данных.
- Данные карт типизированы.
- Jest покрывает базовую логику выборки/фильтрации, когда она появится.
