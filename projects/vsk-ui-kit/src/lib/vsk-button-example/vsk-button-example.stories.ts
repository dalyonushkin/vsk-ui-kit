import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';

import { VskButtonExampleComponent } from './vsk-button-example.component';

const meta: Meta<VskButtonExampleComponent> = {
  title: 'Atoms/Vsk Button Example',
  component: VskButtonExampleComponent,
  tags: ['autodocs','experimental'],
  decorators: [
    applicationConfig({
      providers: [],
    }),
  ],
  parameters: {
     design: {
    type: "figma",
    url: "https://www.figma.com/design/f0bA6l4GAGQCY5Tdit66lh/C%D0%B1%D0%BE%D1%80%D0%BA%D0%B0-UI-%D1%8D%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2-%D0%9B%D0%9A%D0%9F?node-id=450-43503&t=EE5Y1oJyrCGHeEm4-4",
  },
    docs: {
      description: {
        component:
          'Референсная кнопка с WCAG‑совместимыми атрибутами и предопределёнными вариантами оформления.',
      },
    },
    actions: {
      handles: ['pressed'],
    },
  },
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'danger'],
      control: { type: 'radio' },
    },
    size: {
      options: ['md', 'lg'],
      control: { type: 'radio' },
    },
    block: { control: 'boolean' },
    disabled: { control: 'boolean' },
    pressed: { action: 'pressed' },
  },
  args: {
    label: 'Отправить заявку',
    variant: 'primary',
    size: 'md',
    ariaLabel: 'Отправить заявку',
    block: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <vsk-button-example
        [label]="label"
        [variant]="variant"
        [size]="size"
        [block]="block"
        [disabled]="disabled"
        [ariaLabel]="ariaLabel"
        [ariaDescribedBy]="ariaDescribedBy"
        [ariaControls]="ariaControls"
        [ariaExpanded]="ariaExpanded"
        [ariaPressed]="ariaPressed"
        [ariaLive]="ariaLive"
        (pressed)="pressed($event)"
      ></vsk-button-example>
    `,
  }),
};

export default meta;
type Story = StoryObj<VskButtonExampleComponent>;

export const Primary: Story = {};

export const SecondaryBlock: Story = {
  args: {
    variant: 'secondary',
    size: 'lg',
    block: true,
    label: 'Подробнее',
  },
};

export const WithAssistiveText: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p id="fee-hint" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;">
        Комиссия за перевод 0 ₽. Кнопка открывает диалог подтверждения.
      </p>
      <vsk-button-example
        [label]="label"
        [variant]="variant"
        [size]="size"
        [block]="block"
        [disabled]="disabled"
        [ariaLabel]="ariaLabel"
        ariaDescribedBy="fee-hint"
        ariaControls="confirm-dialog"
        [ariaExpanded]="false"
        (pressed)="pressed($event)"
      ></vsk-button-example>
    `,
  }),
  args: {
    label: 'Перевести',
    variant: 'danger',
    ariaLabel: 'Перевести средства',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Показывает использование с `aria-describedby`/`aria-controls`, чтобы связать кнопку с дополнительным описанием и целевым диалогом.',
      },
    },
  },
};

export const InteractionDemo: Story = {
  args: {
    label: 'Выполнить действие',
    ariaLabel: 'Выполнить действие',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button', { name: /выполнить действие/i });
    await expect(button).toBeEnabled();

    await userEvent.click(button);
    await expect(button).toHaveFocus();
  },
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация Interaction Testing: Storybook программно кликает по кнопке и убеждается, что она остаётся доступной.',
      },
    },
  },
};
