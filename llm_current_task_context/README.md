llm_current_task_context

Назначение
- Временная рабочая папка для AI‑агента и разработчика.
- Хранит входные материалы по текущей задаче: сырой экспорт из Figma (CSS, SVG/PNG/JPG/PDF), выдержки из LLMS‑доков и заметки.
- Папка находится под `.gitignore` и не должна попадать в репозиторий.

Структура (рекомендуемая)
- atoms/<atom-name>/
  - raw/ — исходные выгрузки (SVG, PNG/JPG, комбинированные изображения, PDF)
  - css/ — экспортированный CSS (all layers)
  - extracts/ — выдержки из `docs/llms_txt/*` (минимально необходимое)
  - notes.md — краткие заметки/решения
- organisms/<organism-name>/ — аналогично

Процесс
1) Складируйте входные материалы сюда перед началом работы.
2) По мере готовности перенесите только финальные, согласованные референсы в постоянные ассеты Storybook:
   - `projects/vsk-ui-kit/src/stories/assets/atoms/<atom-name>/...`
   - `projects/vsk-ui-kit/src/stories/assets/organisms/<organism-name>/...`
3) Не ссылайтесь на файлы из `llm_current_task_context` в историях — после завершения работы папка очищается.
4) В конце задачи очистите соответствующую подпапку `llm_current_task_context`.

Миграция старых/ад‑hoc папок
- Если материалы были загружены в неканоничные подпапки (например, `llm_current_task_context/кнопка`), их нужно перенести в целевую структуру:
  1) Найдите кандидатов: `find llm_current_task_context -mindepth 1 -maxdepth 2 -type d`
  2) Проверьте содержимое: `rg -n -i '\\.(css|svg|png|jpg|jpeg|pdf)$' llm_current_task_context`
  3) Создайте целевую папку: `mkdir -p llm_current_task_context/{atoms|organisms}/<slug>/{raw,css,extracts}`
  4) Перенесите CSS → `css/`, медиа → `raw/` (используйте `mv -n`), ссылки/решения занесите в `notes.md`.
  5) При сомнениях продублируйте список планируемых переносов разработчику для подтверждения.
