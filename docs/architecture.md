# Архитектура проекта Tarot App

---

# 1. Цель проекта

Tarot App — это offline-first мобильное приложение для iOS и Android.

На этапе MVP приложение должно работать:

- без backend;
- без облака;
- без хостинга;
- без web-версии;
- без обязательного интернета.

Все данные хранятся локально на устройстве пользователя.

---

# 2. Утвержденный стек

| Слой | Технология | Назначение |
|---|---|---|
| Mobile framework | React Native + Expo | мобильное приложение |
| Язык | TypeScript | типизация |
| Routing | Expo Router | навигация |
| Local DB | expo-sqlite | локальная база |
| State management | Zustand | глобальное состояние |
| Styling | NativeWind | стили |
| Testing | Jest | тесты |
| Build system | EAS Build | сборки |
| Local storage | AsyncStorage | настройки |
| Secure storage | expo-secure-store | защищенные данные |

---

# 3. Архитектурные принципы

## 3.1 Offline-first

Приложение должно работать без интернета.

---

## 3.2 Feature-based architecture

Код группируется по бизнес-фичам.

Правильно:
```text
features/cards
features/spreads
features/readings

Неправильно:
components
screens
utils

как единственная структура проекта.

## 3.3 Бизнес-логика не должна лежать в экранах

Папка app/ содержит только:
routing;
screen composition;
подключение feature-логики.

Основная логика лежит в:
src/features
src/store
src/db
src/services

## 3.4 Не добавлять новые библиотеки без обсуждения

Перед добавлением dependency нужно объяснить:
зачем она нужна;
какую проблему решает;
почему нельзя решить текущим стеком.

## 4. Структура проекта
tarot-app/
├── .github/
│   ├── workflows/
│   │   └── ci.yml
│   └── pull_request_template.md
│
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── onboarding/
│   │   └── index.tsx
│   ├── cards/
│   │   ├── index.tsx
│   │   └── [cardId].tsx
│   ├── spreads/
│   │   ├── index.tsx
│   │   └── [spreadId].tsx
│   ├── reading/
│   │   ├── new.tsx
│   │   └── result.tsx
│   ├── history/
│   │   └── index.tsx
│   └── settings/
│       └── index.tsx
│
├── assets/
│   ├── cards/
│   ├── icons/
│   ├── images/
│   └── fonts/
│
├── src/
│   ├── features/
│   │   ├── onboarding/
│   │   ├── cards/
│   │   ├── spreads/
│   │   ├── readings/
│   │   └── settings/
│   │
│   ├── shared/
│   │   ├── ui/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── constants/
│   │   ├── theme/
│   │   └── types/
│   │
│   ├── db/
│   │   ├── database.ts
│   │   ├── migrations/
│   │   ├── repositories/
│   │   └── seed/
│   │
│   ├── store/
│   └── services/
│
├── docs/
│   ├── architecture.md
│   ├── backlog.md
│   ├── ai-development-rules.md
│   └── decisions/
│
└── config files

## 5. Data Flow
Основной поток данных:
Пользователь
↓
Экран app/*
↓
Feature logic
↓
Zustand
↓
SQLite repository
↓
SQLite database
↓
UI update

## 6. Правила хранения данных
Тип данных	Где хранится
Карты Таро	SQLite
История раскладов	SQLite
Настройки	AsyncStorage
Секретные данные	SecureStore
Изображения карт	assets/cards

## 7. Git Flow

Ветки
Работа ведется только в отдельных ветках.

Формат:
feature/leo-task-name
feature/alex-task-name
fix/task-name
chore/task-name
docs/task-name

Flow работы
Issue
↓
Branch
↓
Code
↓
Pull Request
↓
CI
↓
Review
↓
Merge

## 8. Naming conventions
Компоненты
TarotCard.tsx
SpreadCard.tsx
Hooks
useCards.ts
useReading.ts
Services
reading.service.ts
Stores
readings.store.ts

## 9. AI Rules

AI не имеет права:

пушить в main;
менять unrelated files;
добавлять зависимости без согласования;
менять архитектуру без обновления architecture.md;
коммитить секреты;
создавать backend для MVP.

Все AI-изменения проходят review человеком.

## 10. Границы MVP

MVP включает:

onboarding;
список карт;
card of the day;
расклады;
историю;
настройки;
offline storage.

MVP НЕ включает:

backend;
аккаунты;
cloud sync;
web app;
subscriptions;
AI interpretations.
