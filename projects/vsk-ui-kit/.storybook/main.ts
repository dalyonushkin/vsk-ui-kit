import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-designs",
    "@storybook/addon-a11y",
    'storybook-addon-tag-badges',
    "@storybook/addon-coverage",
    '@storybook/addon-links'
  ],
  "framework": {
    "name": "@storybook/angular",
    "options": {}
  },
  staticDirs: [
    '../tokens/src/styles',
    { from: '../src/stories/assets', to: '/assets' },
    {
      from: '../src/assets/vsk-icons',
      to: '/assets/taiga-ui/icons',
    },
    {
      from: '../../../node_modules/@taiga-ui/icons/src',
      to: '/assets/taiga-ui/icons',
    },
  ],
};

export default config;
