# Working Agreement

## Purpose

Зафиксировать границы работы, чтобы разработка ядра и UI могла идти параллельно без конфликтов.

## Leo: Core and Architecture

- `docs/architecture.md`
- `docs/features/*`
- `src/db`
- `src/store`
- `src/services`
- `src/features/*` domain logic
- repositories, migrations, seed data
- бизнес-правила cards/readings/history/settings
- тесты доменной логики

## Alexander: Frontend and UI

- `app/*` route composition
- `src/shared/ui`
- `src/shared/theme`
- `src/features/*/components`
- visual states: loading, empty, error, success
- typography, colors, spacing, dark mode application
- animations and transitions

## Shared Rules

- `app/` содержит routing и screen composition, но не бизнес-логику.
- Новые зависимости добавляются только после объяснения причины.
- Backend, cloud и web additions не добавляются в MVP.
- Любое изменение идет через отдельную ветку и human review.
- Если один человек меняет общий контракт, он обновляет документацию или feature spec.
