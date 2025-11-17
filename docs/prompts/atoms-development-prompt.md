Atom Development Prompt

Decomposed version available. Use these step prompts instead of this monolith when guiding small models:
- docs/prompts/atoms/00-intake-and-migrate.md
- docs/prompts/atoms/01-extract-figma-artifacts.md
- docs/prompts/atoms/02-derive-states-and-sizes.md
- docs/prompts/atoms/03-token-mapping-and-changes.md
- docs/prompts/atoms/04-generate-story.md
- docs/prompts/atoms/05-play-tests-and-a11y.md
- docs/prompts/atoms/06-optional-wrapper.md
- docs/prompts/atoms/07-validate-and-coverage.md
- docs/prompts/atoms/08-cleanup-and-handoff.md

— START PROMPT —
Ты — инженер по UI‑компонентам. Твоя задача — разработать новый “Атом” для библиотеки @vsk/ui-kit поверх Taiga UI, строго соблюдая правила проекта и выдав полный набор артефактов (код, истории для Storybook, play‑тесты, unit‑тесты, экспорт из public‑api). Используй MCP‑инструменты и локальные примеры Storybook LLMS.

Контекст проекта
- Технологии: Angular 20, standalone компоненты, Taiga UI 4.16, TypeScript.
- Репозиторий: vsk-ui-kit-workspace.
- Библиотека: компонентный код в `projects/vsk-ui-kit/src/lib`.
- Публичный экспорт: `projects/vsk-ui-kit/src/public-api.ts`.
- Storybook конфиг: `projects/vsk-ui-kit/.storybook`.
- Локальные справочники LLMS (вместо MCP): `docs/llms_txt` (Angular и Taiga UI). Ключевые: `docs/llms_txt/angular/llms-full.txt` и `docs/llms_txt/taiga-ui/llms-full.txt`.
- Примеры из сторибука: `storybook-static/llms.txt` и папка `storybook-static/llms` (генерируются командой `npm run build-storybook`).
- Дизайн: из Figma доступны ручные экспорты PNG/PDF/SVG/JPG и CSS (all layers). Нет прямого API извлечения структуры.
- Важное ограничение по зависимостям: не устанавливай/не обновляй пакеты. Используй версии из корневого `package.json` (Angular `^20.3.x`, Storybook `^10.0.6`, Taiga `4.16.0`). Эти версии несовместимы с предыдущими мажорными — не переносить примеры или API из более старых/новых гайдов. Компоненты Taiga бери из реэкспорта `@vsk/ui-kit/taiga-ui/...` — новых зависимостей добавлять не нужно.

Требования к Атомам
- По умолчанию НЕ создавай отдельный Angular‑компонент, если достаточно готового компонента Taiga UI. Используй наш реэкспорт `@vsk/ui-kit/taiga-ui/<пакет>` (например, `@vsk/ui-kit/taiga-ui/kit`) и пиши истории на основе реэкспортированного компонента.
- Обёртку создавай только если нужно: сузить/стандартизировать API, добавить обязательные пропсы/варианты, инкапсулировать нестандартную логику, применить токены, которых нельзя повесить снаружи. В этом случае компонент должен быть standalone и типизированным.
- Современный Angular синтаксис: `@if`, `@for`, `@switch`; typed forms — при необходимости.
- Стили: BEM‑модификаторы, минимальные оверрайды через CSS custom properties и наши/taiga‑токены. Не используй приватные DOM‑селекторы Taiga. Изменения стилей выполняй в общих файлах/токенах (например, `projects/vsk-ui-kit/tokens/src/styles/*`, `projects/vsk-ui-kit/tokens/src/styles/base.css`, `projects/vsk-ui-kit/tokens/src/styles/vsk-taiga.less`). Точечные исключения — только по согласованию и с явной документацией в истории (Docs).
- Публичный доступ: при работе без обёртки используй существующие под‑экспорты пакета (`@vsk/ui-kit/taiga-ui/...`). Если создаёшь обёртку — реэкспортируй её из `src/public-api.ts`. Имена файлов — kebab-case.
- Истории Storybook обязательны: все состояния/варианты, controls, описание применения и ограничений.
- Play‑тесты обязательны для каждой истории: интеракции, состояния, доступность (aria/roles/focus).
- Проверка через `npm run test` обязательна (запускает Storybook test‑runner). Для обёрток при необходимости добавляй unit‑спеки (цель — ≥80% statements именно по обёртке).
- Импорт/линт: отсортированные импорты, 2 пробела, trailing commas.
- Именование: допустимо русское человекочитаемое название компонента (для заголовков/описаний). Все папки, файлы, классы/селекторы/exports — строго на английском:
  • slug в kebab-case: `<atom-name>` (например, `button`, `input-text`).
  • класс в PascalCase: `Vsk<Button>` (например, `VskButtonComponent`).
  • заголовок Storybook можно оформить как `Atoms/<atom-name> — <Русское название>`.

Перед началом (автосбор контекста и уточнения)
0) Автоскан контекста и сбор недостающих входных:
   - Если уже существует `llm_current_task_context/atoms/<atom-name>/`, просканируй её и сформируй стартовое предложение без лишних вопросов:
     • список: `ls -R llm_current_task_context/atoms/<atom-name>/`
     • CSS: `rg -n -g '*.css' '^' llm_current_task_context/atoms/<atom-name>/css || true`
     • Figma‑ссылки: `rg -n "https?://www\.figma\.com/[^\s]+" llm_current_task_context/atoms/<atom-name> || true`
     • изображения: `rg -n -g '!**/extracts/**' '\\.(png|jpg|jpeg|svg|pdf)$' llm_current_task_context/atoms/<atom-name> || true`
     • заметки: `notes.md` (если есть).
   - Если папки нет — создай: `mkdir -p llm_current_task_context/atoms/<atom-name>/{raw,css,extracts}`.
   - Если `<atom-name>` (англ. slug) не согласован — предложи свой вариант и вынеси на подтверждение. Русское человекочитаемое имя укажи отдельно для описаний.
   - После сканирования перечисли, что уже есть, чего не хватает, какой Taiga‑компонент предлагаешь использовать, и какой стандартный набор состояний предлагаешь показать.
   - Сверься с текущими паттернами в кодовой базе: возьми за образец существующие истории (`projects/vsk-ui-kit/src/stories/*.stories.ts`, `projects/vsk-ui-kit/src/lib/taiga-stories/*`) и используй тот же стиль (CSF, `Meta`, `StoryObj`, `render`, `@storybook/test`).
   - Проверь версии в корневом `package.json` и не предлагай действия, требующие установки/обновления пакетов.
   - Если чего‑то не хватает — запроси ТОЛЬКО недостающее:
   - Название компонента/атома.
   - Русское человекочитаемое название и подтверждение англ. slug `<atom-name>`.
   - Ссылка(и) на Figma (fileKey/nodeId, если есть) для вкладки Design в историях.
   - Экспортированный CSS (all layers) для всех целевых состояний/вариантов.
   - SVG‑ассеты компонента для разных состояний/вариантов (или спрайт/иконки).
   - Основание: на базе какого существующего компонента Taiga/реэкспорта нужно делать историю, или это полностью новый атом‑обёртка?
   - Целевые размеры/варианты/состояния (size/view/state: loading/disabled/error/etc.).
   - Куда положить исходные материалы: попроси разместить все временные входные файлы (CSS, SVG, PNG/JPG, комбинированные макеты, заметки) в `llm_current_task_context/atoms/<atom-name>/`. Это рабочая папка агента, она в `.gitignore` и будет очищена по завершении.
   - Если ресурсы уже лежат в других подпапках `llm_current_task_context` (например, по‑русски: `llm_current_task_context/кнопка`), автоматически собери и перенеси их в целевую структуру:
     • Просканируй весь каталог: `find llm_current_task_context -mindepth 1 -maxdepth 2 -type d`
     • Найди файлы: `rg -n -i '\\.(css|svg|png|jpg|jpeg|pdf)$' llm_current_task_context`
     • Найди Figma‑ссылки: `rg -n 'https?://www\\.figma\\.com/[^\\s]+' llm_current_task_context`
     • Создай целевые папки: `mkdir -p llm_current_task_context/atoms/<atom-name>/{raw,css,extracts}`
     • Перенеси CSS → `.../css/` (пример):
       `find <src_dir> -type f -name '*.css' -exec mv -n {} llm_current_task_context/atoms/<atom-name>/css/ \;`
     • Перенеси изображения/SVG/PDF → `.../raw/` (пример):
       `find <src_dir> -type f -iregex '.*\\.(svg|png|jpg|jpeg|pdf)$' -exec mv -n {} llm_current_task_context/atoms/<atom-name>/raw/ \;`
     • Задокументируй переносы в `llm_current_task_context/atoms/<atom-name>/notes.md` (источник → цель). При неоднозначности — сначала выведи список кандидатов на перенос и попроси подтверждение.
1) Ознакомься со справочниками: `docs/llms_txt/angular/llms-full.txt` и `docs/llms_txt/taiga-ui/llms-full.txt` и следуй им (standalone, typed inputs/forms, modern control flow, публичные API Taiga).
2) Проверь LLMS‑примеры сторибука: `storybook-static/llms.txt` и папка `storybook-static/llms`. Если их нет/устарели — выполни `npm run build-storybook` (он автоматически вызовет `extract-storybook-llms`).
3) Исходные данные из Figma часто приходят как SVG со состояниями + CSS (all layers) без описаний — эти материалы обязательны для выверки стилей. Складывай их сначала в `llm_current_task_context/atoms/<atom-name>/raw` и `.../css`.

Шаги реализации (обязательны)
1) Уточни назначение атома: целевой Taiga‑компонент/директива, варианты (size/view/state), какие состояния нужны (loading/disabled/…);
   какие артефакты Figma доступны (SVG со состояниями, CSS all layers).

2) Ветка A — без обёртки (предпочтительно)
   - Импортируй компонент из нашего реэкспорта: `@vsk/ui-kit/taiga-ui/<пакет>`
     (например: кнопки — из `@vsk/ui-kit/taiga-ui/kit`).
   - Создай истории (каждый атом в своей папке):
     `projects/vsk-ui-kit/src/lib/atoms/<atom-name>/<atom-name>.stories.ts`
     • Оформи `Meta`, `args`, `argTypes`; сделай сториз: Playground, States (все состояния), Sizes/Views (если есть), Edge cases.
     • Добавь описание (назначение, когда использовать, ограничения).
     • Вкладка Design (addon): добавь `parameters.design` с ссылкой на Figma (если есть) и изображениями референсов. Допускается использование изображений, полученных через Figma “Copy as …” (`.png/.jpg/.svg`, предпочтительно SVG). Возможно одно общее изображение со всеми состояниями — используй его в первую очередь (не выдумывай ассеты).
       Пример:
       
       ```ts
       export default {
         title: 'Atoms/<AtomName>',
         component: /* реэкспортированный Taiga компонент */,
         parameters: {
           design: [
             { type: 'figma', url: 'https://www.figma.com/design/<fileKey>?node-id=<nodeId>' },
             { type: 'image', name: 'Default', url: 'assets/atoms/<atom-name>/default.png' },
             { type: 'image', name: 'Hover', url: 'assets/atoms/<atom-name>/hover.png' },
           ],
         },
       } as Meta;
       ```
       
       • Если картинки недоступны по относительному пути, импортируй их в story и передавай импортированный URL:
       
       ```ts
       import defaultPng from '../../stories/assets/atoms/<atom-name>/default.png';
       MyStory.parameters = { design: [{ type: 'image', name: 'Default', url: defaultPng }] };
       ```
       
       • CSS (all layers): не коммить `figma.css` в ассеты историй. Храни сырой экспорт в `llm_current_task_context/atoms/<atom-name>/css/figma.css`, извлеки ключевые значения и отрази их через общие токены/переменные. В Docs опиши маппинг «сырой CSS → токены/переменные» с примерами.
       • Если в `llm_current_task_context/atoms/<atom-name>/raw/` есть единый артефакт со всеми состояниями (`combined.svg|png|pdf`), скопируй его в `projects/vsk-ui-kit/src/stories/assets/atoms/<atom-name>/figma/combined.<ext>` и укажи в `parameters.design` как основной референс. Не генерируй искусственные ассеты, используй предоставленные.
   - Выверка стилей:
     • Сопоставь CSS из Figma с токенами/переменными. Прямые жёсткие значения — только если нет токена.
     • Если нужны SVG‑иконки — подключай их как отдельные ассеты.
   - Подпапки для референсов (изображения):
     • База: `projects/vsk-ui-kit/src/stories/assets/atoms/<atom-name>/`
       - `figma/` — все экспортированные из Figma референсы (`default.png|jpg|svg|pdf`, `hover.png`, `active.png`, `focus.png`, `disabled.png`, или единый `combined.png|svg` со всеми состояниями).
       - `README.md` — опционально: заметки по выверке стилей/токенов.
     • Сырой CSS держи только во временной папке: `llm_current_task_context/atoms/<atom-name>/css/figma.css`.
   - Play‑тесты в историях:
     • Используй `@storybook/test` (`userEvent`, `within`, `expect`).
     • Проверь клики/клавиатуру/фокус, aria/roles, корректность disabled/loading.
   - Проверка: `npm run test` (запустит Storybook test‑runner).

3) Ветка B — с обёрткой (только при необходимости)
   - Файлы:
     • `projects/vsk-ui-kit/src/lib/atoms/<atom-name>/<atom-name>.component.ts`
     • `projects/vsk-ui-kit/src/lib/atoms/<atom-name>/<atom-name>.component.html`
     • `projects/vsk-ui-kit/src/lib/atoms/<atom-name>/<atom-name>.component.scss` (или .css)
     • `projects/vsk-ui-kit/src/lib/atoms/<atom-name>/<atom-name>.stories.ts`
     • `projects/vsk-ui-kit/src/lib/atoms/<atom-name>/<atom-name>.component.spec.ts` (по необходимости)
   - Компонент:
     • `standalone: true`; импортируй нужные Taiga‑компоненты/директивы.
     • Типизированные `@Input/@Output`; минимальная разметка, без обращения к приватному DOM Taiga.
     • Стили — через токены/переменные, BEM‑модификаторы.
   - Истории и play‑тесты — как в Ветке A.
   - Публичный экспорт: добавь обёртку в `projects/vsk-ui-kit/src/public-api.ts`.
   - Проверка: `npm run build:lib` и `npm run test`.

4) Генерация LLMS и визуальная сверка
   - Выполни `npm run build-storybook` (сгенерирует `storybook-static/llms.txt` и папку `storybook-static/llms`).
   - Используй их как ориентиры/снапшоты для последующей работы и унификации историй.
   - При необходимости сохраняй выдержки из `docs/llms_txt/*` в `llm_current_task_context/atoms/<atom-name>/extracts/` для экономии контекста (см. алгоритм ниже). В итоговые истории эти выдержки не подключай напрямую.

   Алгоритм выборки выдержек из `docs/llms_txt/*` (не читать целиком):
   1) Сформируй поисковые ключи: название/тип компонента, директивы Taiga, `standalone`, `typed forms`, `@if|@for|@switch`, `a11y`, `tokens`, `css variables` и т.п.
   2) Найди совпадения (из корня `vsk-ui-kit-workspace`):
      - `rg -n "<фраза>" docs/llms_txt`
   3) На каждый матч сохрани ±12 строк контекста в `extracts/`:
      - вычисли границы: `start=max(1, line-12)`, `end=line+12`
      - извлечение: `sed -n "${start},${end}p" <файл> > llm_current_task_context/atoms/<atom-name>/extracts/<slug>__L${start}-${end}.txt`
      - добавь в начало файла: `# source: <файл>:<start>-<end>`
   4) Для аккуратной секции по Markdown‑заголовкам:
      - найди заголовки: `rg -n "^#{1,6} " <файл>` и выбери ближайший предыдущий к строке матча
      - ограничь до следующего заголовка того же/более высокого уровня и сохрани как в п.3
   5) Перечисли сохранённые выдержки и зачем они нужны в `llm_current_task_context/atoms/<atom-name>/notes.md`.

   Обработка Figma SVG + CSS (из “Copy as SVG” и “Copy as code, CSS (all layers)”) — пошагово
   1) Сохрани сырой SVG и CSS в `llm_current_task_context/atoms/<atom-name>/raw/` и `.../css/figma.css`.
   2) Извлечение ресурсов из SVG/CSS:
      - Найди в SVG `<image href="data:*;base64,...">` и URL‑ссылки в CSS (`url(...)`).
      - Декодируй base64 и сохрани минимальный набор файлов в `projects/vsk-ui-kit/src/stories/assets/atoms/<atom-name>/figma/` (например, `bg@2x.png`, `icon.svg`).
      - Опиши в заметках, что и откуда извлечено; сослись на эти файлы в `parameters.design`.
   3) Определи размеры и состояния:
      - SVG: используй `viewBox` и `width/height` для базовых размеров; если в SVG слои/группы соответствуют состояниям — перечисли их.
      - CSS: сгруппируй по состояниям (hover/focus/disabled/active/loading) и размерам (s/m/l); выпиши высоты/отступы/радиусы.
      - Сформируй список сториз: `Playground`, `States`, `Sizes`, `Edge cases` исходя из найденного; если нет полноты — предложи стандартный набор и попроси подтверждение.
   4) Нормализация стилей:
      - Сконсолидируй цвета/шрифты/радиусы/тени/границы/отступы из CSS в таблицу и сопоставь с токенами.
      - Предложи изменения общих токенов (в `projects/vsk-ui-kit/tokens/src/styles/*`) или маппинг через текущие переменные. Прямые значения — только по согласованию и с документацией.
      - В Docs приложи краткую таблицу маппинга «сырой CSS → токены/переменные».

5) Согласование с разработчиком
   - Этап 1: черновые истории (подключён реэкспортируемый компонент, перечислены состояния и аргументы) — запроси подтверждение или список корректировок.
   - Этап 2: выверка стилей по Figma CSS и добавление вкладки Design (ссылки/изображения) — запроси подтверждение.
   - Этап 3: финализация (экспорт, команды проверки, документация исключений) — финальное подтверждение перед merge.

6) Критерии готовности
   - Визуал соответствует Figma (на уровне токенов/переменных), состояния реализованы.
   - Истории покрывают варианты; play‑тесты зелёные; выполнен `npm run test` (storybook test‑runner) и сформирован отчёт покрытия (`coverage/storybook`). Целевое покрытие: ≥80% statements для обёрток.
   - Если создана обёртка — экспортирована через `public-api.ts`, сборка `npm run build:lib` зелёная, при необходимости unit‑спеки.
   - Временная папка `llm_current_task_context/atoms/<atom-name>/` очищена (или оставлены только согласованные материалы; по умолчанию — чисто).

7) Что запросить при нехватке данных
   - CSS (all layers) из Figma для состояний/вариантов.
   - SVG‑ассеты (иконки/глифы), если они требуются.
   - Скриншоты/описание отступов/типографики, если CSS неполон.

Ограничения и стиль
- Не повторяй код Taiga и не опирайся на её приватную разметку — только публичные API/директивы.
- Минимизируй оверрайды: сначала CSS‑переменные/токены, затем частные правила.
- Именование файлов и селекторов — kebab-case; импорты отсортированы; отступ 2 пробела; trailing commas.

Выходные данные (что вернуть в ответе)
- По умолчанию измени файлы в репозитории и верни список добавленных/изменённых путей с кратким описанием изменений.
- Полные содержимое файлов (`.ts`, `.html`, `.scss/.css`, `.stories.ts`, `.spec.ts`) прикладывай только если нет прав на запись и ты не можешь применить изменения.
- Укажи выполненные/рекомендуемые команды (`npm run build:lib`, `npm run build-storybook`, `npm run test`) и краткий результат (включая путь к отчёту покрытия: `coverage/storybook`).
- Краткий чеклист соответствия (визуал, a11y, тесты, экспорт).
- Список недостающих материалов из Figma/ассетов, если без них нельзя точно выровнять стили.
- Подтверди очистку `llm_current_task_context/atoms/<atom-name>/`.
- Явно укажи соответствие имен: русское название компонента (для Storybook/Docs) ↔ англ. slug `<atom-name>` и класс(ы) (например, `VskButtonComponent`).

Пример фокуса (ориентир)
- “VskButton”: обёртка над Taiga кнопкой с вариантами `view: primary|secondary|ghost`, `size: sm|md|lg`, `loading`, `disabled`, опциональной иконкой слева/справа; соответствующие истории; play‑тесты на клики/клавиатуру/disabled; unit‑тесты на биндинги/эмит.

Обязательные ссылки на источники внутри ответа
- Укажи, что использовал локальные справочники `docs/llms_txt/angular/llms-full.txt` и `docs/llms_txt/taiga-ui/llms-full.txt` и следовал им (с учётом несовместимости версий с более старыми гайдами).
- Если опирался на существующие истории, перечисли конкретные записи из `storybook-static/llms.txt` и файлы из `storybook-static/llms`.
- Приведи ссылки на Figma, список добавленных референс‑изображений и путь к сырому CSS в `llm_current_task_context/atoms/<atom-name>/css/figma.css`, а также итоговую таблицу маппинга «сырой CSS → токены/переменные».

— END PROMPT —
