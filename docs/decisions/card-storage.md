# Decision: Card Storage

## Status

Accepted for MVP.

## Decision

Карты Таро хранятся локально:

- структурированные данные карт попадают в SQLite через seed;
- изображения карт лежат в `assets/cards`;
- repository в `src/db/repositories` отдает типизированные модели в `src/features/cards`.

## Why

- MVP должен работать offline-first.
- SQLite уже утвержден в `docs/architecture.md`.
- `assets/cards` уже предусмотрен архитектурой для изображений.
- Такой подход не требует backend, cloud sync или новых библиотек.

## Consequences

- Нужно отдельно подготовить seed-данные карт.
- Нужно следить, чтобы путь к изображению карты был стабильным и типизированным.
- Обновление карточной базы в MVP будет происходить через обновление приложения, а не через remote fetch.
