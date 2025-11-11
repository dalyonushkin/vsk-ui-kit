import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { TuiButton } from '@vsk/ui-kit/taiga-ui/core';

type TaigaAppearance = 'primary' | 'secondary' | 'whiteblock' | 'outline' | 'flat' | 'destructive';
type TaigaSize = 's' | 'm' | 'l';

interface TaigaButtonStoryArgs {
  label: string;
  appearance: TaigaAppearance;
  size: TaigaSize;
  disabled: boolean;
  type: 'button' | 'submit' | 'reset';
}

const TAIGA_SNIPPET = `\
<button
  tuiButton
  type="button"
  appearance="primary"
  size="m"
>
  Скачать выписку
</button>
`;

const meta: Meta<TaigaButtonStoryArgs> = {
  title: 'Taiga UI/Button',
 // component: TuiButton,
  tags: ['autodocs','alpha'],
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
