# Feature: Settings

## Goal

Дать пользователю базовые локальные настройки приложения.

## Scope

- экран настроек;
- переключение темы;
- хранение настроек в AsyncStorage;
- безопасное место для будущих privacy/debug опций.

## Out of Scope

- аккаунт;
- подписки;
- cloud sync;
- remote feature flags.

## Architecture Notes

- Route file остается в `app/settings/index.tsx`.
- Логика настроек находится в `src/features/settings`.
- Persisted settings используют AsyncStorage.
- SecureStore используется только для действительно чувствительных данных.

## Stories

- User can open settings screen.
- User can switch theme.

## Acceptance Criteria

- Настройки работают offline.
- Тема применяется единообразно через `src/shared/theme`.
- UI не дублирует цветовые значения вручную, если есть токены.
