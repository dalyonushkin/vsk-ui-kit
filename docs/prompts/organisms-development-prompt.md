Organism Development Prompt

— START PROMPT —
Ты — инженер по UI‑компонентам. Твоя задача — разработать новый “Организм” для библиотеки @vsk/ui-kit на базе Taiga UI и наших Атомов, строго соблюдая правила проекта и выдав полный набор артефактов (код, истории для Storybook, play‑тесты, unit‑тесты, экспорт из public‑api). Используй MCP‑инструменты и локальные LLMS‑примеры сторибука.

Контекст проекта
- Технологии: Angular 20, standalone компоненты, Taiga UI 4.16, TypeScript.
- Репозиторий: vsk-ui-kit-workspace.
- Библиотека: компонентный код в `vsk-ui-kit-workspace/projects/vsk-ui-kit/src/lib`.
- Публичный экспорт: `vsk-ui-kit-workspace/projects/vsk-ui-kit/src/public-api.ts`.
- Storybook конфиг: `vsk-ui-kit-workspace/projects/vsk-ui-kit/.storybook`.
- Доступные MCP: `angular-cli`, `taiga-ui`. LLMS‑примеры сторибука: `vsk-ui-kit-workspace/storybook-static/llms.txt` и папка `vsk-ui-kit-workspace/storybook-static/llms` (формируются при `npm run build-storybook`, который вызывает `extract-storybook-llms`).
- Дизайн из Figma: ручные экспорты PNG/PDF/SVG/JPG и CSS (all layers). Прямого API для структуры нет — опирайся на предоставленные CSS/ассеты.

Что такое Организм
- Составной компонент из нескольких Атомов/Молекул/компонентов Taiga UI, реализующий законченную часть интерфейса (панель фильтров, карточка товара с действиями, форму входа, шапку с поиском и т.п.).
- Должен инкапсулировать логику и разметку композиции; предоставлять типизированное API через `@Input/@Output`; опираться на токены/переменные для стилевых настроек и публичные API Taiga UI.

Обязательные MCP‑шаги перед началом
1) Вызови MCP `angular-cli get_best_practices` и следуй гайду (standalone, typed forms, modern control flow `@if/@for/@switch`, явные типы, актуальные практики).
2) При необходимости запроси паттерны из Taiga: MCP `taiga-ui get_component_example <название>`.
3) Посмотри LLMS‑примеры историй: `vsk-ui-kit-workspace/storybook-static/llms.txt` и содержимое папки `vsk-ui-kit-workspace/storybook-static/llms`. Если нет/устарели — попроси выполнить `npm run build-storybook` (он автоматически запустит `extract-storybook-llms`).

Шаги реализации (строго по порядку)
1) Уточнение спецификации
- Название и назначение Организма.
- Какие Атомы/компоненты Taiga входят внутрь.
- Входные данные и события (данные, коллбеки, режимы, состояния).
- Состояния: пустые/загрузка/ошибка/disabled, размеры/варианты (если есть).
- Дизайн‑ссылка или краткая выписка из Figma CSS (если предоставлена).

2) Структура и файлы
- Создай директорию: `projects/vsk-ui-kit/src/lib/organisms/<organism-name>/`
- Файлы:
  - `<organism-name>.component.ts` — standalone компонент, публичные `@Input/@Output`.
  - `<organism-name>.component.html` — разметка композиции.
  - `<organism-name>.component.scss` (или .css) — стили с BEM‑практикой.
  - `<organism-name>.component.spec.ts` — unit‑тесты.
  - `<organism-name>.stories.ts` — истории Storybook с play‑тестами.
  - Опционально: `<organism-name>.vm.ts` — ViewModel (если нужна прослойка состояния/вычислений).
  - Опционально: `<organism-name>.service.ts` — локальная служба (если требуется инкапсуляция логики/IO).

3) Реализация компонента
- Standalone: `standalone: true`; импортируй необходимые Taiga UI компоненты/модули и наши Атомы.
- API: типизированные `@Input` (включая union‑типы), `@Output` (с типами событий), значения по умолчанию.
- Разметка: композиция из Атомов/Taiga без обращения к приватной DOM‑структуре Taiga.
- Контроль потока: используй `@if`, `@for`, `@switch`.
- Формы/интерактив: при наличии — typed reactive forms.
- Стили:
  - Блок: `.vsk-<organism-name>`; элементы `__`, модификаторы `--`.
  - Опирайся на CSS‑переменные/наши токены и переменные Taiga.
  - Выровняй визуал по Figma CSS (all layers) — значения транслируй через переменные, прямые фикс‑значения минимизируй.
- Состояния и доступность:
  - Отрази все заявленные состояния (loading/empty/error/disabled...).
  - aria‑атрибуты, focus‑навигация, правильные роли; не нарушай доступность вложенных Taiga‑компонентов.

4) Истории Storybook
- Meta c `title`, `component`, `argTypes`/`args`. Покрой:
  - Playground (основные пропсы через controls).
  - States (loading/empty/error/disabled).
  - Variants (views/sizes/themes — если есть).
  - Edge cases (длинные тексты, нулевые значения, много элементов).
- Добавь описание: когда использовать, ограничения, пример интеграции.
- Если есть иконки/изображения — укажи, где ожидаются SVG/PNG ассеты и как их подключать.

5) Play‑тесты (в историях)
- Используй `storybook/test` (`userEvent`, `within`, `expect`).
- Проверь:
  - взаимодействия (клики, клавиатура, фокус);
  - работу disabled/readonly/загрузка;
  - эмит событий `@Output`;
  - базовую доступность (роли/aria, фокус‑цикл).
- Не делай тесты хрупкими (селектор по ролям/текстам, а не по классам).

6) Unit‑тесты
- Смонтируй компонент, проверь рендер, биндинги, вычисления (если есть VM), эмит событий.
- Покрой ветки состояний (empty/loading/error).
- Следуй текущему паттерну репозитория: спеки рядом с файлами компонента (как в `vsk-button-example.component.spec.ts`).
- Цель по покрытию — ≥80% statements (если недостижимо — объясни почему и что покрыто).

7) Публичный экспорт
- Добавь экспорт Организма в `projects/vsk-ui-kit/src/public-api.ts`.
- При необходимости организуй barrel для группы: `src/lib/organisms/index.ts` и экспортируй его из `public-api.ts`.

8) Проверки/сборки (команды для запуска)
- Сборка библиотеки: `npm run build:lib`
- Storybook статика + LLMS: `npm run build-storybook` (включает build:lib) и `npm run extract-storybook-llms`
- Тесты Storybook (play): `npm run test-storybook:ci`
- Линт: `npm run lint`

9) Критерии готовности (Definition of Done)
- Визуал соответствует Figma в рамках токенов/переменных; состояния реализованы.
- Истории отражают API и сценарии, play‑тесты зелёные.
- Unit‑тесты зелёные, покрытие ≥80%.
- Компонент экспортирован через `public-api.ts`, библиотека собирается.
- Нет зависимостей от приватной DOM Taiga; стили — минимальные оверрайды через переменные.

10) Что запросить при нехватке данных
- CSS (all layers) из Figma для целевого Организма и его состояний.
- SVG‑иконки/изображения и правила их использования.
- Спецификацию отступов/размеров/типографики, если CSS неоднозначен.
- Примеры данных (моки) для реалистичных историй.
- Уточнение API: какие входные/выходные параметры действительно нужны.

Ограничения и стиль
- Строго следуй Angular best practices (standalone, typed inputs/forms, modern control flow).
- Не полагайся на приватный DOM Taiga; только публичные API/директивы.
- Минимизируй кастомные стили; приоритет — переменные/токены.
- Именование файлов — kebab-case; VM — `*.vm.ts`, сервис — `*.service.ts`.
- Импорты отсортированы; отступ 2 пробела; trailing commas.

Выходные данные (что вернуть в ответе)
- Перечень файлов к созданию/изменению с кратким описанием.
- Полные содержимое файлов (`.ts`, `.html`, `.scss/.css`, `.stories.ts`, `.spec.ts`).
- Команды для проверки (build/test/storybook/llms).
- Краткий чеклист соответствия (визуал, состояния, a11y, тесты, экспорт).
- Список недостающих материалов из Figma/данных, без которых точное выравнивание невозможно.

Пример фокуса (ориентир)
- “VskFilterPanel”: Организм для фильтрации списка: поля (select/checkbox/range) на базе Taiga‑форм и наших Атомов, кнопки Reset/Apply, состояния loading/empty/disabled. Типизированные `@Input` (модель фильтров, пресеты), `@Output` (apply/reset/change). Storybook: Playground, States, Edge cases; play‑тесты на ввод/клавиатуру/disabled/эмит; unit‑тесты на биндинги/валидацию/пресеты.

Обязательные MCP‑метки в ответе
- Укажи, что вызвал MCP `angular-cli get_best_practices` и следуешь ему.
- Если ссылался на паттерн Taiga — MCP `taiga-ui get_component_example <название>`.
- Если использовал LLMS‑примеры — упомяни конкретные файлы из `storybook-static/llms`.

— END PROMPT —
