import type { Meta, StoryObj } from '@storybook/angular';
import { expect, within } from 'storybook/test';
import { TuiButton, TuiLoader } from '@vsk/ui-kit/taiga-ui/core';

import { createButtonArgs, type ButtonStoryArgs } from './button.story-types';
import { BUTTON_TEMPLATE } from './button.story-template';
import { buildButtonParameters } from './button.story-config';

type SizeStoryConfig = {
  storyName: string;
  docsDescription: string;
  args: ButtonStoryArgs;
};


const SIZE_STORIES: SizeStoryConfig[] = [
  {
    storyName: 'Размеры/Размер S (32px)',
    docsDescription: 'Размер S: высота 32px, компактные отступы и шрифт S.',
    args: createButtonArgs({
      label: 'S · 32px',
      size: 's',
      dataTestId: 'size-s',
    }),
  },
  {
    storyName: 'Размеры/Размер M (48px)',
    docsDescription: 'Размер M: высота 48px, базовый размер текста.',
    args: createButtonArgs({
      label: 'M · 48px',
      size: 'm',
      dataTestId: 'size-m',
    }),
  },
  {
    storyName: 'Размеры/Размер L (56px)',
    docsDescription: 'Размер L: высота 56px, крупный текст и увеличенные отступы.',
    args: createButtonArgs({
      label: 'L · 56px',
      size: 'l',
      dataTestId: 'size-l',
    }),
  },
];

const meta: Meta<ButtonStoryArgs> = {
  id: 'atoms-button-sizes',
  title: 'Atoms/Кнопка — tuiButton/Размеры',
  tags: ['autodocs', 'beta'],
  parameters: buildButtonParameters({
    docsDescription: 'Размеры: Small (32px), Medium (48px), Large (56px). Выбирайте размер в зависимости от плотности интерфейса.',
    includeDesign: true,
    controlsDisabled: true,
  }),
};

export default meta;

type Story = StoryObj<ButtonStoryArgs>;

const createSizeStory = (config: SizeStoryConfig): Story => ({
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
    await expect(button).toHaveTextContent(config.args.label);
  },
});

export const SizeS = createSizeStory(SIZE_STORIES[0]);
export const SizeM = createSizeStory(SIZE_STORIES[1]);
export const SizeL = createSizeStory(SIZE_STORIES[2]);
