import type { Meta, StoryObj } from '@storybook/angular';
import { TuiButton } from '@vsk/ui-kit/taiga-ui/core';
import { TuiButtonLoading } from '@vsk/ui-kit/taiga-ui/kit';

import { buildButtonParameters } from './button.story-config';

const TAIGA_APPEARANCES = [
  'primary',
  'primary-destructive',
  'primary-grayscale',
  'secondary',
  'secondary-destructive',
  'secondary-grayscale',
  'accent',
  'action',
  'action-destructive',
  'action-grayscale',
  'outline',
  'outline-destructive',
  'outline-grayscale',
  'flat',
  'flat-destructive',
  'flat-grayscale',
  'floating',
  'glass',
  'neutral',
  'positive',
  'negative',
  'warning',
  'info',
  'icon',
  'textfield',
] as const;

type TaigaAppearance = (typeof TAIGA_APPEARANCES)[number];
type TaigaSize = 'xs' | 's' | 'm' | 'l' | 'xl';
type TaigaInteractiveState = 'hover' | 'active' | 'disabled';
type TaigaAriaLive = 'off' | 'polite' | 'assertive';

interface ButtonApiStoryArgs {
  label: string;
  appearance: TaigaAppearance;
  appearanceMode: string | null;
  appearanceState: TaigaInteractiveState | null;
  appearanceFocus: boolean | null;
  size: TaigaSize;
  iconStart: string | null;
  iconEnd: string | null;
  loading: boolean;
  loadingLabel: string | null;
  disabled: boolean;
  block: boolean;
  vertical: boolean;
  type: 'button' | 'submit' | 'reset';
  ariaLabel: string | null;
  ariaDescribedBy: string | null;
  ariaControls: string | null;
  ariaExpanded: boolean | null;
  ariaPressed: boolean | null;
  ariaLive: TaigaAriaLive | null;
  dataTestId: string | null;
}

const DOCS_REFERENCE = [
  'Taiga UI · Appearance: "Используйте `tuiAppearanceMode`, чтобы эмулировать CSS-состояния `:checked`/`:invalid` для outline-вариантов (пример: `<button appearance="outline" tuiAppearanceMode="checked" tuiButton ...>`)"',
  'Taiga UI · Icons: "В разделе Icons приведён пример `<button appearance="outline" iconEnd="@tui.chevron-down" size="s" tuiButton ...>More</button>`, который демонстрирует входы `iconStart`/`iconEnd`."',
  'Taiga UI · Loading: "Шаблон `<button iconStart="@tui.clock" tuiButton type="button" [loading]="loading$ | async">Click to start</button>` подчёркивает использование `[loading]` и компонента `TuiButtonLoading`."',
  'Taiga UI · Vertical: "Пример `<button tuiButton tuiButtonVertical ...>` включает вертикальный режим за счёт атрибута `tuiButtonVertical`."',
  'Источник: https://taiga-ui.dev/components/button',
].join('\n\n');

const BUTTON_API_TEMPLATE = `
  <button
    tuiButton
    class="vsk-button-api"
    [appearance]="appearance"
    [size]="size"
    [disabled]="disabled"
    [loading]="loading ? (loadingLabel?.trim() || true) : null"
    [iconStart]="iconStart || null"
    [iconEnd]="iconEnd || null"
    [tuiAppearanceMode]="appearanceMode?.trim() ? appearanceMode : null"
    [tuiAppearanceState]="appearanceState || null"
    [tuiAppearanceFocus]="appearanceFocus"
    [attr.type]="type"
    [attr.data-testid]="dataTestId || null"
    [attr.aria-label]="ariaLabel || label"
    [attr.aria-describedby]="ariaDescribedBy || null"
    [attr.aria-controls]="ariaControls || null"
    [attr.aria-expanded]="ariaExpanded === null ? null : ariaExpanded"
    [attr.aria-pressed]="ariaPressed === null ? null : ariaPressed"
    [attr.aria-live]="ariaLive || null"
    [attr.aria-busy]="loading ? 'true' : null"
    [attr.tuiButtonVertical]="vertical ? '' : null"
    [style.display]="block ? 'flex' : null"
    [style.width.%]="block ? 100 : null"
    [style.justifyContent]="block ? 'center' : null"
  >
    <span class="vsk-button-api__label">{{ label }}</span>
  </button>
`;

const meta: Meta<ButtonApiStoryArgs> = {
  id: 'atoms-button-full-api',
  title: 'Atoms/Кнопка — tuiButton/Полный API',
  tags: ['autodocs', 'beta'],
  parameters: buildButtonParameters({
    docsDescription:
      'Полный playground для `tuiButton`: доступны appearance, размеры, иконки, вертикальный режим, атрибуты доступности и встроенный `[loading]`. ' +
      'Ниже приведена выдержка из официальной документации Taiga UI:\n\n' +
      DOCS_REFERENCE,
    includeDesign: true,
    controlsDisabled: false,
  }),
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст кнопки.',
    },
    appearance: {
      control: 'select',
      options: TAIGA_APPEARANCES,
      description: 'Темы Taiga UI из `TuiAppearance`.',
    },
    appearanceMode: {
      control: 'text',
      description: 'Строка для `tuiAppearanceMode` (например, "checked invalid").',
    },
    appearanceState: {
      control: {
        type: 'select',
        labels: { null: 'auto' },
      },
      options: [null, 'hover', 'active', 'disabled'],
      description: 'Принудительное состояние `tuiAppearanceState`.',
    },
    appearanceFocus: {
      control: {
        type: 'select',
        labels: { null: 'auto', true: 'в фокусе', false: 'без фокуса' },
      },
      options: [null, true, false],
      description: 'Управление `tuiAppearanceFocus`.',
    },
    size: {
      control: 'inline-radio',
      options: ['xs', 's', 'm', 'l', 'xl'],
      description: 'Высота кнопки (`size` вход `tuiButton`).',
    },
    iconStart: {
      control: 'text',
      description: 'Левая иконка (`iconStart`).',
    },
    iconEnd: {
      control: 'text',
      description: 'Правая иконка (`iconEnd`).',
    },
    loading: {
      control: 'boolean',
      description: 'Активирует встроенный `TuiButtonLoading`.',
    },
    loadingLabel: {
      control: 'text',
      description: 'Текст индикатора загрузки (передаётся как строка в `[loading]`).',
    },
    disabled: {
      control: 'boolean',
    },
    block: {
      control: 'boolean',
      description: 'Растянуть кнопку на 100% ширины.',
    },
    vertical: {
      control: 'boolean',
      description: 'Добавляет атрибут `tuiButtonVertical`.',
    },
    type: {
      control: 'inline-radio',
      options: ['button', 'submit', 'reset'],
    },
    ariaLabel: {
      control: 'text',
    },
    ariaDescribedBy: {
      control: 'text',
    },
    ariaControls: {
      control: 'text',
    },
    ariaExpanded: {
      control: {
        type: 'select',
        labels: { null: 'auto' },
      },
      options: [null, true, false],
    },
    ariaPressed: {
      control: {
        type: 'select',
        labels: { null: 'auto' },
      },
      options: [null, true, false],
    },
    ariaLive: {
      control: {
        type: 'select',
        labels: { null: 'off (auto)' },
      },
      options: [null, 'off', 'polite', 'assertive'],
    },
    dataTestId: {
      control: 'text',
    },
  },
  args: {
    label: 'Игровая кнопка Taiga',
    appearance: 'primary',
    appearanceMode: '',
    appearanceState: null,
    appearanceFocus: null,
    size: 'm',
    iconStart: '@tui.search',
    iconEnd: '@tui.chevron-down',
    loading: false,
    loadingLabel: 'Загрузка...',
    disabled: false,
    block: false,
    vertical: false,
    type: 'button',
    ariaLabel: 'Игровая кнопка Taiga',
    ariaDescribedBy: null,
    ariaControls: null,
    ariaExpanded: null,
    ariaPressed: null,
    ariaLive: null,
    dataTestId: 'button-api-playground',
  },
};

export default meta;

type Story = StoryObj<ButtonApiStoryArgs>;

export const FullAPI: Story = {
  name: 'Playground/Полный набор атрибутов',
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [TuiButton, TuiButtonLoading],
    },
    template: BUTTON_API_TEMPLATE,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'История повторяет все входы `tuiButton`, включая `appearance`, `size`, `iconStart`/`iconEnd`, `[loading]`, `tuiButtonVertical` и ARIA-атрибуты.' +
          ' Используйте контролы, чтобы собрать нужную комбинацию перед копированием кода.',
      },
    },
  },
};
