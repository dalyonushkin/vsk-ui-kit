import type { Meta, StoryObj } from '@storybook/angular';
import { expect, within } from 'storybook/test';
import { TuiButton, TuiLoader } from '@vsk/ui-kit/taiga-ui/core';

import { createButtonArgs, type ButtonStoryArgs } from './button.story-types';
import { BUTTON_TEMPLATE } from './button.story-template';
import {  buildButtonParameters } from './button.story-config';

type StateStoryConfig = {
  storyName: string;
  docsDescription: string;
  args: ButtonStoryArgs;
};


const STATE_STORIES: StateStoryConfig[] = [
  {
    storyName: 'Состояния/Primary · Rest',
    docsDescription: 'Primary · Rest — активное состояние по умолчанию.',
    args: createButtonArgs({
      label: 'Отправить',
      appearance: 'primary',
      leftIcon: '+',
      rightIcon: '→',
      dataTestId: 'primary-rest',
    }),
  },
  {
    storyName: 'Состояния/Primary · Disabled',
    docsDescription: 'Primary · Disabled — выключенная кнопка с приглушённым цветом.',
    args: createButtonArgs({
      label: 'Недоступно',
      appearance: 'primary',
      disabled: true,
      leftIcon: '+',
      dataTestId: 'primary-disabled',
    }),
  },
  {
    storyName: 'Состояния/Primary · Loading',
    docsDescription: 'Primary · Loading — индикатор загрузки поверх primary.',
    args: createButtonArgs({
      label: 'Загрузка',
      appearance: 'primary',
      loading: true,
      dataTestId: 'primary-loading',
    }),
  },
  {
    storyName: 'Состояния/Secondary · Rest',
    docsDescription: 'Secondary · Rest — светлый вариант кнопки.',
    args: createButtonArgs({
      label: 'Создать',
      appearance: 'secondary',
      leftIcon: '+',
      dataTestId: 'secondary-rest',
    }),
  },
  {
    storyName: 'Состояния/Secondary · Disabled',
    docsDescription: 'Secondary · Disabled — выключенный secondary вариант.',
    args: createButtonArgs({
      label: 'Недоступно',
      appearance: 'secondary',
      disabled: true,
      rightIcon: '→',
      dataTestId: 'secondary-disabled',
    }),
  },
  {
    storyName: 'Состояния/Secondary · Loading',
    docsDescription: 'Secondary · Loading — загрузка в светлой раскладке.',
    args: createButtonArgs({
      label: 'Загрузка',
      appearance: 'secondary',
      loading: true,
      dataTestId: 'secondary-loading',
    }),
  },
  {
    storyName: 'Состояния/Outlined · Rest',
    docsDescription: 'Outlined · Rest — кнопка только с контуром.',
    args: createButtonArgs({
      label: 'Подробнее',
      appearance: 'outline',
      leftIcon: '+',
      rightIcon: '→',
      dataTestId: 'outline-rest',
    }),
  },
  {
    storyName: 'Состояния/Outlined · Disabled',
    docsDescription: 'Outlined · Disabled — выключенный контурный вариант.',
    args: createButtonArgs({
      label: 'Недоступно',
      appearance: 'outline',
      disabled: true,
      dataTestId: 'outline-disabled',
    }),
  },
  {
    storyName: 'Состояния/Outlined · Loading',
    docsDescription: 'Outlined · Loading — загрузка в контурном стиле.',
    args: createButtonArgs({
      label: 'Загрузка',
      appearance: 'outline',
      loading: true,
      dataTestId: 'outline-loading',
    }),
  },
  {
    storyName: 'Состояния/Text · Rest',
    docsDescription: 'Text · Rest — текстовая кнопка без фона.',
    args: createButtonArgs({
      label: 'Перейти',
      appearance: 'flat',
      rightIcon: '→',
      dataTestId: 'text-rest',
    }),
  },
  {
    storyName: 'Состояния/Text · Disabled',
    docsDescription: 'Text · Disabled — выключенная текстовая кнопка.',
    args: createButtonArgs({
      label: 'Недоступно',
      appearance: 'flat',
      disabled: true,
      dataTestId: 'text-disabled',
    }),
  },
];

const meta: Meta<ButtonStoryArgs> = {
  id: 'atoms-button-states',
  title: 'Atoms/Кнопка — tuiButton/Состояния',
  tags: ['autodocs', 'beta'],
  parameters: buildButtonParameters({
    docsDescription:
      'Состояния: Rest, Disabled, Loading для всех вариантов кнопки. Каждая история соответствует Figma-слою и помогает сверить цвета, иконки и поведение.',
    includeDesign: true,
    controlsDisabled: true,
  }),
};

export default meta;

type Story = StoryObj<ButtonStoryArgs>;

const createStateStory = (config: StateStoryConfig): Story => ({
  name: config.storyName,
  parameters: {
    docs: {
      description: {
        story: config.docsDescription,
      },
    },
  },
  render: () => ({
    props: config.args,
    moduleMetadata: {
      imports: [TuiButton, TuiLoader],
    },
    template: BUTTON_TEMPLATE,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByTestId(config.args.dataTestId!);

    if (config.args.disabled||config.args.loading) {
      await expect(button).toBeDisabled();
    } else {
      await expect(button).toBeEnabled();
    }

    if (config.args.loading) {
      await expect(button).toHaveAttribute('aria-busy', 'true');
    } else {
      await expect(button).not.toHaveAttribute('aria-busy');
    }
  },
});

export const PrimaryRest = createStateStory(STATE_STORIES[0]);
export const PrimaryDisabled = createStateStory(STATE_STORIES[1]);
export const PrimaryLoading = createStateStory(STATE_STORIES[2]);
export const SecondaryRest = createStateStory(STATE_STORIES[3]);
export const SecondaryDisabled = createStateStory(STATE_STORIES[4]);
export const SecondaryLoading = createStateStory(STATE_STORIES[5]);
export const OutlinedRest = createStateStory(STATE_STORIES[6]);
export const OutlinedDisabled = createStateStory(STATE_STORIES[7]);
export const OutlinedLoading = createStateStory(STATE_STORIES[8]);
export const TextRest = createStateStory(STATE_STORIES[9]);
export const TextDisabled = createStateStory(STATE_STORIES[10]);
