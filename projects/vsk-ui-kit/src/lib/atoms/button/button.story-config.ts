import type { Meta } from '@storybook/angular';
import { Tag } from 'storybook/internal/csf';

export const BUTTON_DESIGN = {
  type: 'image' as const,
  name: 'Дизайн',
  url: 'assets/atoms/button/figma/combined.svg',
  offset: [-300, 140] as [number, number],
  scale: 0.3,
};

type BuildParametersOptions = {
  docsDescription: string;
  includeDesign?: boolean;
  controlsDisabled?: boolean;
};

export const buildButtonParameters = ({
  docsDescription,
  includeDesign = true,
  controlsDisabled = true,
}: BuildParametersOptions): Meta['parameters'] => {
  const parameters: Meta['parameters'] = {
    layout: 'padded',
    docs: {
      description: {
        component: docsDescription,
      },
    },
  };

  if (controlsDisabled) {
    parameters['controls'] = { disabled: true };
  }

  if (includeDesign) {
    parameters['design'] = BUTTON_DESIGN;
  }

  return parameters;
};

