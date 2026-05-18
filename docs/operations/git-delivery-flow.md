# Git и CI delivery flow

## Цель

`main` должен быть скучным: если код попал в `main`, его можно проверить, собрать и использовать как базу для следующей работы. Эксперименты, временные решения и незавершённые Codex-правки должны жить в коротких ветках и попадать в `main` только через Pull Request.

## Ветки

Используем trunk-based lite:

- `main` — защищённая ветка, только проверенный код после PR.
- `feature/*` — пользовательские фичи.
- `fix/*` — исправления багов.
- `chore/*` — инфраструктура, CI, EAS, tooling.
- `docs/*` — документация без изменения runtime-кода.

Не нужен постоянный `develop`. Для текущего размера проекта он создаст второй полусломанный `main` и ухудшит понимание, что реально готово к релизу.

## Как работать с Codex-чатами

Каждый отдельный запрос к Codex, который меняет код или процесс, должен завершаться отдельной веткой:

```bash
git fetch origin
git switch main
git pull --ff-only
git switch -c feature/task-name
```

Если Codex уже создал ветку, перед PR нужно проверить:

```bash
git status --short --branch
git diff --name-status origin/main...HEAD
npm run verify
```

В PR не должны попадать:

- временные preview-файлы;
- `.env`, tokens, credentials, screenshots с секретами;
- случайные web/backend/cloud additions;
- unrelated files;
- dependency updates без отдельного объяснения.

## Локальная проверка перед push

Основная команда:

```bash
npm run verify
```

Она запускает:

- `npm run typecheck`
- `npm test -- --runInBand`
- `npx expo config --type public`

Для полностью чистой проверки после изменений в зависимостях:

```bash
npm ci
npm run verify
```

Если менялся runtime или экран приложения, дополнительно:

```bash
npm run smoke:metro
```

## Где смотреть тесты в GitHub

После push ветки или открытия PR GitHub запускает workflow `CI`.

Где смотреть:

1. Открыть репозиторий GitHub.
2. Перейти во вкладку **Actions**.
3. Выбрать workflow **CI**.
4. Открыть последний run по нужной ветке или PR.
5. Открыть job **build-test**.

Внутри job важны шаги:

- **Install dependencies** — проверяет воспроизводимость `package-lock.json`.
- **Dependency audit report** — security report, сейчас не блокирует merge автоматически.
- **Expo config validation** — проверяет публичный Expo config.
- **TypeScript** — `tsc --noEmit`.
- **Jest** — unit/contract tests.

В каждом run есть:

- вкладка **Summary** с коротким списком quality gates;
- artifact **jest-results** с JSON-результатом Jest, если тестовый шаг успел создать файл.

Если CI красный, PR не мержить. Сначала открыть упавший шаг и читать первый реальный error, а не последние строки шума.

## Настройки защиты `main` в GitHub

Эти настройки нужно один раз включить владельцу репозитория:

GitHub repository → **Settings** → **Branches** → **Branch protection rules** → add rule для `main`.

Включить:

- Require a pull request before merging.
- Require approvals: минимум 1.
- Dismiss stale pull request approvals when new commits are pushed.
- Require status checks to pass before merging.
- Require branches to be up to date before merging.
- Require conversation resolution before merging.
- Block force pushes.
- Block deletions.

Required status check:

- `build-test`

Если GitHub показывает check как `CI / build-test`, выбирать именно его.

## PR checklist

Перед merge человек должен проверить:

- CI зелёный.
- Diff содержит только файлы задачи.
- `package.json` и `package-lock.json` менялись только если это действительно нужно.
- Нет backend/cloud/web additions для MVP.
- Нет секретов.
- Есть session note в `docs/ai-sessions/`, если работал Codex.
- Для user-visible изменений выполнен smoke-check на устройстве, эмуляторе или через preview build.

## Preview и production builds

PR CI не должен запускать production EAS build на каждый коммит. Это дорого, медленно и будет блокировать разработку на credentials.

Правильное разделение:

- PR CI — TypeScript, Jest, Expo config.
- `preview` EAS build — вручную, когда нужно посмотреть APK/internal build.
- `production` EAS build — вручную после merge в `main`, QA и release checklist.

Production signing нельзя обходить через `withoutCredentials`. Для production Android нужно один раз настроить keystore в Expo credentials или через local credentials/CI secrets.

## Merge policy

Предпочтительно использовать squash merge:

- история `main` остаётся читаемой;
- один PR = один логический commit;
- откат проще.

После merge:

```bash
git switch main
git pull --ff-only
git branch -d feature/task-name
```

Remote branch можно удалить через GitHub после merge.
