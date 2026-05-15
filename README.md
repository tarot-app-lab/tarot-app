# Tarot App

Offline-first mobile Tarot app for iOS and Android.

## Stack

- React Native + Expo
- TypeScript
- Expo Router
- expo-sqlite
- Zustand
- NativeWind
- Jest
- EAS Build

## Architecture

The project follows feature-based architecture. Route files live in `app/` and should only handle routing, screen composition, and wiring feature logic. Business logic belongs in `src/features`, `src/store`, `src/db`, and `src/services`.

The MVP is local-only:

- no backend;
- no cloud sync;
- no web app;
- no required internet connection.

See [docs/architecture.md](docs/architecture.md) for the full architecture.

## Project Structure

```text
app/                 Expo Router routes
assets/              local cards, icons, images, and fonts
src/features/        feature modules
src/shared/          shared UI, hooks, utils, constants, theme, and types
src/db/              SQLite database setup, migrations, repositories, seed data
src/store/           Zustand stores
src/services/        application services
docs/                architecture, backlog, and AI development rules
```

## Development

```bash
npm install
npm test
npm run typecheck
npm start
```

## Git Flow

Work only in separate branches and open a Pull Request into `main`. Do not push directly to `main`.
