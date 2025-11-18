import type { Meta, StoryObj } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';
import { TuiButton, TuiLoader } from '@vsk/ui-kit/taiga-ui/core';

import { BUTTON_TEMPLATE } from './button.story-template';
import { buildButtonParameters } from './button.story-config';
import type { ButtonStoryArgs } from './button.story-types';
import { createButtonArgs } from './button.story-types';

const meta: Meta<ButtonStoryArgs> = {
  id: 'atoms-button',
  title: 'Atoms/Кнопка — tuiButton',
  parameters: buildButtonParameters({
    docsDescription:
      'Кнопка на базе `tuiButton`, стилизованная токенами VSK. Поддерживает варианты Primary, Secondary, Outlined и Text, размеры S/M/L, состояния disabled/loading и ARIA-атрибуты. Дополнительные истории и автодок по состояниям и размерам доступны во вложенных разделах: [Состояния](?path=/docs/atoms-button-states--docs) и [Размеры](?path=/docs/atoms-button-sizes--docs).',
    includeDesign: true,
    controlsDisabled: false,
  }),
  tags: ['autodocs', 'beta'],
  argTypes: {
    appearance: {
      options: ['primary', 'secondary', 'outline', 'flat'],
      control: { type: 'inline-radio' },
      description: 'Вариант оформления из дизайн-системы Taiga/VSK.',
    },
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'inline-radio' },
      description: 'Высота кнопки: 32/48/56 px.',
    },
    type: {
      options: ['button', 'submit', 'reset'],
      control: { type: 'inline-radio' },
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    block: { control: 'boolean' },
    leftIcon: { control: 'text' },
    rightIcon: { control: 'text' },
    ariaLabel: { control: 'text' },
    ariaDescribedBy: { control: 'text' },
    ariaControls: { control: 'text' },
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
      options: [null, 'off', 'polite', 'assertive'],
      control: { type: 'select' },
    },
    onClick: { action: 'clicked' },
  },
  args: createButtonArgs({
    label: 'Открыть полис',
    appearance: 'primary',
    size: 'm',
    leftIcon: '+',
    rightIcon: '→',
    ariaLabel: 'Открыть полис',
    dataTestId: 'playground',
  }),
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [TuiButton, TuiLoader],
    },
    template: BUTTON_TEMPLATE,
  }),
};

export default meta;

type Story = StoryObj<ButtonStoryArgs>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Базовый пример с управляемыми аргументами. Проверяйте варианты `appearance`, размеры и состояния `disabled/loading` через панель Controls.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button', { name: /открыть полис/i });


    await userEvent.tab();
    await expect(button).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    await expect(button).toHaveFocus();
    await expect(button).toHaveAttribute('aria-label', 'Открыть полис');
  },
};


export const EdgeCases: Story = {
  args: createButtonArgs({
    label: 'Распечатать договор',
    appearance: 'outline',
    size: 'l',
    block: true,
    rightIcon: '→',
    ariaLabel: 'Распечатать договор',
    ariaDescribedBy: 'button-note',
    ariaControls: 'print-dialog',
    ariaExpanded: false,
    dataTestId: 'edge-case',
  }),
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [TuiButton, TuiLoader],
    },
    template: `
      <section aria-label="Пограничные случаи">
        <p id="button-note" class="vsk-visually-hidden">
          Команда откроет модальное окно подтверждения печати договора.
        </p>
        ${BUTTON_TEMPLATE}
      </section>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Пример с `aria-describedby`: дополнительная подсказка размещена рядом с кнопкой (элемент с `id="button-note"`), и на неё указывает `aria-describedby`. Так разработчик может передавать инструкции («Команда откроет модальное окно подтверждения печати договора»). Проверяем наличие описания через вкладку Accessibility или автотест `toHaveAccessibleDescription`.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button', { name: /распечатать договор/i });
    await expect(button).toHaveAttribute('aria-describedby', 'button-note');
    await expect(button).toHaveAttribute('aria-controls', 'print-dialog');
    await expect(button).toHaveAccessibleDescription(
      /Команда откроет модальное окно подтверждения печати договора\./i,
    );

    await userEvent.click(button);
    await expect(button).toHaveFocus();
  },
};
