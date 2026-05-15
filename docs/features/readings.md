# Feature: Readings

## Goal

Позволить пользователю начать расклад, получить выбранные карты и увидеть результат без интернета.

## Scope

- one-card reading;
- базовые spreads;
- randomizer;
- reveal logic;
- экран нового расклада;
- экран результата.

## Out of Scope

- AI interpretations;
- sharing;
- cloud sync;
- paid spreads;
- account-based history.

## Architecture Notes

- Route files остаются в `app/reading/*`.
- Доменная логика находится в `src/features/readings`.
- Описание spreads может жить в `src/features/spreads`.
- Сохранение результата идет через `src/db/repositories`, когда подключается history.

## Stories

- User can start one-card reading.
- User can reveal selected card.
- User can see reading result.
- User can save reading to history.

## Acceptance Criteria

- Randomizer работает deterministic-test friendly: его можно тестировать с переданным источником случайности.
- Reveal logic не хранится в route-файлах.
- Экран результата получает готовую модель данных, а не собирает ее сам.
