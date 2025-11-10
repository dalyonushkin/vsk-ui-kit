import { DOCUMENT } from '@angular/common';
import {
  ENVIRONMENT_INITIALIZER,
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';

const STYLE_ELEMENT_ID = 'vsk-ui-kit-design-tokens';

export const VSK_UI_KIT_TOKENS_CSS = /* css */ `
@import url('@taiga-ui/styles/taiga-ui-fonts.css');
@import url('@taiga-ui/styles/taiga-ui-global.css');

@layer vsk-ui-kit.tokens {
  :root {
    color-scheme: light;
    --vsk-color-primary: #0044cc;
    --vsk-color-primary-hover: #0036a5;
    --vsk-color-accent: #12b1c4;
    --vsk-color-surface: #f4f6fb;
    --vsk-color-border: #dde1f0;
    --vsk-radius-pill: 999px;
    --vsk-shadow-focus: 0 0 0 3px rgba(16, 69, 174, 0.35);

    /* Map to Taiga tokens */
    --tui-primary: var(--vsk-color-primary);
    --tui-primary-hover: var(--vsk-color-primary-hover);
    --tui-primary-active: #002266;
    --tui-link: var(--vsk-color-accent);
    --tui-base-01: #ffffff;
    --tui-base-02: var(--vsk-color-surface);
    --tui-base-03: #e7eaf5;
    --tui-base-04: #c4c8da;
    --tui-base-06: #4c5370;
    --tui-radius-m: 14px;
    --tui-radius-l: 20px;
    --tui-radius-xl: 32px;
  }

  body {
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background-color: var(--vsk-color-surface);
    color: #0f172a;
  }

  .tui-button,
  button {
    border-radius: var(--vsk-radius-pill);
  }

  tui-chip[aria-pressed='true'],
  [tuiChip][aria-pressed='true'] {
    border-radius: 1px !important;
    border-color: red !important;
    border-width: 29px !important;
    border-style: solid !important;
  }
[tuiChip][aria-pressed='true'] {
  border-radius: 1px;
  border-color: red;
}
  :focus-visible {
    outline: none;
    box-shadow: var(--vsk-shadow-focus);
  }
}

@media (prefers-color-scheme: dark) {
  @layer vsk-ui-kit.tokens {
    :root {
      color-scheme: dark;
      --vsk-color-primary: #7da6ff;
      --vsk-color-primary-hover: #98b9ff;
      --vsk-color-surface: #0b1120;
      --vsk-color-border: #1f2b4d;

      --tui-primary: var(--vsk-color-primary);
      --tui-primary-hover: var(--vsk-color-primary-hover);
      --tui-base-01: #0f172a;
      --tui-base-02: #111c32;
      --tui-base-03: #1e2a45;
      --tui-base-04: #3b4765;
      --tui-base-06: #f8fafc;
    }

    body {
      background-color: var(--vsk-color-surface);
      color: #f8fafc;
    }
  }
}
`;

export function provideVskDesignTokens(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue: () => {
        const document = inject(DOCUMENT);

        if (document.getElementById(STYLE_ELEMENT_ID)) {
          return;
        }

        const styleElement = document.createElement('style');
        styleElement.id = STYLE_ELEMENT_ID;
        styleElement.textContent = VSK_UI_KIT_TOKENS_CSS;
        document.head.appendChild(styleElement);
      },
    },
  ]);
}
