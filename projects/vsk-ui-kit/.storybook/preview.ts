import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import docJson from '../documentation.json';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import parserBabel from 'prettier/parser-babel'; // Для JS/TS
import parserPostcss from 'prettier/parser-postcss'; // Для CSS

setCompodocJson(docJson);

const preview: Preview = {
  // 1. Настраиваем кнопку в тулбаре
  globalTypes: {
    // --- Тема (Светлая/Темная) ---
    theme: {
      description: 'Глобальная тема',
      defaultValue: 'light',
      toolbar: {
        title: 'Тема',
        icon: 'mirror',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
    
    // --- Размер (Accessibility) ---
    viewSize: {
      description: 'Размер элементов (для слабовидящих)',
      defaultValue: 'view-standard-size',
      toolbar: {
        title: 'Размер',
        icon: 'zoom', // Иконка лупы
        items: [
          { value: 'view-standard-size', title: 'Standard', icon: 'ruler' },
          { value: 'view-large-size', title: 'Large (x1.2)', icon: 'grow' },
          { value: 'view-extralarge-size', title: 'Extra Large (x1.5)', icon: 'expand' },
        ],
        dynamicTitle: true,
      },
    },

    // --- Платформа (Web/iOS/Android) ---
    platform: {
      description: 'Платформа устройства',
      defaultValue: 'web',
      toolbar: {
        title: 'Платформа',
        icon: 'mobile', // Иконка девайса
        items: [
          { value: 'web', title: 'Web', icon: 'browser' },
          { value: 'ios', title: 'iOS', icon: 'apple' }, // (icon 'apple' может не быть в старых версиях, замените на 'mobile')
          { value: 'android', title: 'Android', icon: 'mobile' }, // аналогично
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    tags: ['autodocs'],
    a11y: {
      // todo включить после деплоя 
     // test: 'error', // Fail all accessibility tests when violations are found
      options: {
        /*
         * Opt in to running WCAG 2.x AAA rules
         * Note that you must explicitly re-specify the defaults (all but the last array entry)
         * See https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter-examples for more details
         */
        runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice', 'wcag2aaa'],
      },
      config: {
        rules: [
          { id: 'aria-allowed-attr', enabled: true },
          { id: 'aria-required-attr', enabled: true },
          { id: 'aria-required-children', enabled: true },
          { id: 'aria-required-parent', enabled: true },
          { id: 'aria-roles', enabled: true },
          { id: 'aria-valid-attr', enabled: true },
          { id: 'aria-valid-attr-value', enabled: true },
          { id: 'aria-prohibited-attr', enabled: true },
        ],
      },
    },
    viewport: {
      options: { ...MINIMAL_VIEWPORTS, ...INITIAL_VIEWPORTS },
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    docs: {
      codePanel: true,
      //source: { language: 'html',format: true },
       source: {
        transform: (code: string, context: any) => {
          const language = context?.parameters?.docs?.source?.language || 'html';

          // 1. МАГИЯ ЗДЕСЬ: Очистка кода перед форматированием
          // Ищем паттерн [prop]="'value'" и меняем на prop="value"
          let cleanCode = code.replace(/\[([a-zA-Z0-9_-]+)\]="'([^']*)'"/g, '$1="$2"');
          
          // Опционально: убрать [prop]="false", если вам не нужно показывать выключенные булевы флаги
          // cleanCode = cleanCode.replace(/\[([a-zA-Z0-9_-]+)\]="false"\s?/g, '');

          let parser = 'html';
          let plugins: any[] = [parserHtml];

          if (language === 'typescript' || language === 'ts' || language === 'javascript') {
            parser = 'babel-ts'; 
            plugins = [parserBabel];
            // Для TS чистку выше применять не стоит, поэтому вернем исходный code, если нужно
            cleanCode = code; 
          } else if (language === 'css' || language === 'scss') {
            parser = 'css';
            plugins = [parserPostcss];
            cleanCode = code;
          }

          try {
            // Форматируем уже очищенный код
            return prettier.format(cleanCode, {
              parser: parser,
              plugins: plugins,
              htmlWhitespaceSensitivity: 'ignore',
              printWidth: 80,
              tabWidth: 2,
              useTabs: false,
            });
          } catch (error) {
            return code;
          }
        },
      },
    },
    backgrounds: {
      disable: true, // Отключаем стандартный выбор цвета фона, чтобы он зависел от темы
    },
    options: {
      storySort: {
        order: [
          'Atoms',
          [
            'Кнопка — tuiButton',
            ['Playground', 'EdgeCases', 'Состояния', 'Размеры'],
          ],
          'Taiga UI',
        ],
      },
    },
  },
  initialGlobals: {
    viewport: { value: 'ipad', isRotated: false },
  },
  // 2. Декоратор, который применяет тему
  decorators: [
    (story, context:any) => {
      if (context.viewMode === 'docs') {
      return story();
    }
    console.log('Глобальные параметры:', context);
    console.log('Глобальные параметры:', story);
// Получаем значения из тулбара или берем дефолтные
      const theme = context.globals.theme || 'light';
      const viewSize = context.globals.viewSize || 'view-standard-size';
      const platform = context.globals.platform || 'web';

      // ВАША ЛОГИКА: Устанавливаем атрибут на body
      // Storybook запускает это внутри iframe, поэтому document.body безопасен
  //  document.body.setAttribute('data-tui-theme', theme);
// 2. Размер (используем атрибут data-view-size)
      document.body.setAttribute('data-view-size', viewSize);

      // 3. Платформа (используем атрибут data-platform)
      //document.body.setAttribute('data-platform', platform);

      return story();
    },
  ],
};

export default preview;
