# GitHub Repo Search

Поиск публичных репозиториев GitHub по имени пользователя: ввод с задержкой, бесконечная прокрутка, обработка ошибок.

**[Демо](https://yaraslaubondar.github.io/react-git-search-users/)** · React 19 · TypeScript · Redux Toolkit · Tailwind CSS 4 · Vite

<!-- Добавьте сюда скриншот: ![Скриншот](docs/screenshot.png) -->

## Возможности

- Поиск по имени пользователя с debounce (500 мс), без лишних запросов при наборе
- Бесконечная прокрутка с подгрузкой по 20 репозиториев
- Корректная обработка состояний: загрузка, пустой результат, «пользователь не найден», превышен лимит GitHub API, нет сети
- Защита от «гонки» запросов: устаревший ответ не перезапишет результат нового поиска
- Карточка репозитория: описание, звёзды, форки, язык, дата обновления
- Адаптивная вёрстка, доступные подписи (`aria-label`, `role="alert"`)

## Стек и архитектура

| Что | Чем |
| --- | --- |
| UI | React 19 + TypeScript |
| Состояние и запросы | Redux Toolkit (`createSlice`, `createAsyncThunk`), axios |
| Стили | Tailwind CSS 4 |
| Сборка | Vite 6 |
| Качество | ESLint (typescript-eslint, react-hooks) |
| Деплой | GitHub Actions → GitHub Pages, Docker + nginx |

```
src/
  components/   SearchBar, RepoList, RepoCard, Loader
  redux/        store, срез repos и асинхронный thunk
  interface/    типы данных
```

## Запуск

```bash
npm ci
npm run dev        # http://localhost:5173
npm run build      # production-сборка в dist/
npm run lint
```

Через Docker:

```bash
docker build -t git-search .
docker run -p 8080:80 git-search   # http://localhost:8080
```

## Примечание

GitHub API без авторизации ограничен 60 запросами в час с одного IP. При превышении приложение покажет понятное сообщение.
