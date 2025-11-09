import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { TuiButton } from '@vsk/ui-kit/taiga-ui/core';

type TaigaAppearance = 'primary' | 'secondary' | 'whiteblock' | 'outline' | 'flat' | 'destructive';
type TaigaSize = 's' | 'm' | 'l';

interface TaigaButtonStoryArgs {
  label: string;
  appearance: TaigaAppearance;
  size: TaigaSize;
  iconLeft?: string;
  iconRight?: string;
  disabled: boolean;
  type: 'button' | 'submit' | 'reset';
}

const TAIGA_SNIPPET = `\
<button
  tuiButton
  type="button"
  appearance="primary"
  size="m"
  iconLeft="tuiIconCalendar"
>
  Скачать выписку
</button>
`;

const meta: Meta<TaigaButtonStoryArgs> = {
  title: 'Taiga UI/Button',
 // component: TuiButton,
  tags: ['autodocs'],
  parameters: {
    status: 'Ready',
    docs: {
      description: {
        component:
          'Готовая кнопка из Taiga UI, доступная через реэкспорт `@vsk/ui-kit/taiga-ui/kit`. Компонент наследует WCAG 2.2 AA стили (фокус, контраст, размеры) из глобальных стилей Taiga и поддерживает полный набор входных параметров.'
      }
    },
    layout: 'centered'
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст кнопки',
      name: 'label'
    },
    appearance: {
      control: 'select',
      options: ['primary', 'secondary', 'whiteblock', 'outline', 'flat', 'destructive','accent'],
      description: 'Стандартные темы Taiga UI',
      name: 'appearance'
    },
    size: {
      control: 'inline-radio',
      options: ['s', 'm', 'l'],
      description: 'Высота кнопки',
      name: 'size'
    },
    iconLeft: {
      control: 'text',
      description: 'Левая иконка (поддерживает имя из `@taiga-ui/icons` или текст)',
      name: 'iconLeft'
    },
    iconRight: {
      control: 'text',
      description: 'Правая иконка',
      name: 'iconRight'
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает кнопку',
      name: 'disabled'
    },
    type: {
      control: 'inline-radio',
      options: ['button', 'submit', 'reset'],
      name: 'type'
    }
  }
};

export default meta;

type Story = StoryObj<TaigaButtonStoryArgs>;

export const TaigaButtonStory: Story = {
  args: {
    label: 'Скачать выписку',
    appearance: 'primary',
    size: 'm',
    iconLeft: 'tuiIconDownload',
    iconRight: '',
    disabled: false,
    type: 'button'
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [CommonModule, TuiButton]
    },
    template: `
      <button
        tuiButton
        [attr.type]="type"
        [appearance]="appearance"
        [size]="size"
        [iconLeft]="iconLeft || null"
        [iconRight]="iconRight || null"
        [disabled]="disabled"
      >
        {{ label }}
      </button>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Taiga UI кнопка с поддержкой всех основных свойств: `appearance`, `size`, `iconLeft`, `iconRight`, `type` и `disabled`. Значения можно скопировать и использовать напрямую в продуктах.'
      },
      source: {
        code: TAIGA_SNIPPET
      }
    }
  }
};
