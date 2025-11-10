# @vsk/ui-kit

`@vsk/ui-kit` — это монорепозитория для поставки UI‑компонентов VSK, обёрток вокруг Taiga UI и централизованных дизайн‑токенов. Ниже кратко описаны ключевые подходы и сценарии.

## Архитектура

- **Standalone‑библиотека.** Библиотека собирается через `ng-packagr` и распределяется по нескольким entry point’ам:
  - `@vsk/ui-kit` — собственные компоненты (например, `VskButtonExampleComponent`).
  - `@vsk/ui-kit/taiga-ui/*` — реэкспорт Taiga UI (kit, core, cdk и т. д.), чтобы потребители подключали конкретные пакеты из единой точки.
  - `@vsk/ui-kit/tokens` — глобальный поставщик дизайн‑токенов и стилей.
- **Дизайн‑токены.** Вся кастомизация базируется на Taiga UI: мы импортируем её фонты и глобальные правила, после чего надстраиваем собственные CSS‑переменные для цветов, радиусов, фокуса. Поставщик `provideVskDesignTokens()` добавляет `<style>` в `document.head` и гарантирует единообразные темы в любых приложениях.

## Как подключить библиотеку

1. Установка пакета (обычно через локальный Verdaccio):
   ```bash
   npm install @vsk/ui-kit
   ```
2. Подключение дизайн‑токенов:
   ```ts
   import { bootstrapApplication } from '@angular/platform-browser';
   import { provideVskDesignTokens } from '@vsk/ui-kit/tokens';

   bootstrapApplication(AppComponent, {
     providers: [provideVskDesignTokens()],
   });
   ```
3. Использование компонентов либо реэкспортов Taiga UI:
   ```ts
   import { VskButtonExampleComponent } from '@vsk/ui-kit';
   import { TuiChip } from '@vsk/ui-kit/taiga-ui/kit';
   ```

## Скрипты и процессы

- `npm run build:lib` — сборка всех entry point’ов в `dist/vsk-ui-kit`.
- `npm run publish:local` — сборка + публикация в локальный npm‑registry (`http://localhost:4873` по умолчанию).
- `npm run test` — юнит‑тесты.
- `npm run storybook` / `npm run build-storybook` — Storybook для быстрой проверки визуальных изменений.

## Стандарты и стили

- **Angular 20, standalone API.** Все компоненты используют `standalone: true`, сигнал‑API (`signal`, `computed`), современный контроль (`@if`, `@for`).
- **Taiga UI.** Не импортируем Taiga напрямую в продуктах, а берём реэкспорт из `@vsk/ui-kit/taiga-ui/*`, чтобы гарантировать синхронизацию версий и токенов.
- **CSS.** Токены определены на уровне CSS‑переменных (`--vsk-color-primary` и т. п.). Стили можно расширять у потребителя, но вся база должна приезжать из `provideVskDesignTokens()` — так мы централизованно меняем тему.

## Обновления и публикация

1. Вносим изменения/фиксируем версию (`package.json` в корне и внутри `projects/vsk-ui-kit`).
2. `npm run build:lib`.
3. `npm run publish:local` или `npm publish` (если отправляем во внешний registry).
4. В потребителях (например, демо‑приложение внутри `publish-tests/`) обновляем зависимость и проверяем через `npm run build`.

## Тестирование и проверка

- **Unit.** `ng test`/`npm run test` покрывает компоненты Jest/Karma (пока Karma, см. `karma.conf.js`).
- **Storybook.** Используем для визуальных smoke‑тестов и документации сценариев `@vsk/ui-kit`.
- **Пример приложения.** В `publish-tests/vsk-ui-kit-demo` есть Angular‑демо, которое одновременно подключает UI‑компоненты, Taiga‑реэкспорты и дизайн‑токены. Это основной инструмент для проверки, что библиотека работает «как в бою».

## Рекомендации для контрибьюторов

- Соблюдайте [Angular Style Guide](https://angular.dev/style-guide) + внутренние правила (standalone, signals, typed forms).
- Добавляйте новые публичные части в `projects/vsk-ui-kit/src/public-api.ts` или соответствующий entry point.
- Если нужно доставить глобальные стили или переопределения, делайте это через `@vsk/ui-kit/tokens`, чтобы потребители автоматически получали обновления.
- Всегда проверяйте `npm run build:lib` перед публикацией — ng-packagr валидирует публичный API.
