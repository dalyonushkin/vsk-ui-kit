import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

type VskButtonVariant = 'primary' | 'secondary' | 'danger';
type VskButtonSize = 'md' | 'lg';

@Component({
  selector: 'vsk-button-example',
  template: `
    <button
      type="button"
      class="vsk-button"
      [class.vsk-button--secondary]="variant() === 'secondary'"
      [class.vsk-button--danger]="variant() === 'danger'"
      [class.vsk-button--block]="block()"
      [class.vsk-button--lg]="size() === 'lg'"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-disabled]="isDisabled() ? 'true' : null"
      [disabled]="isDisabled()"
    >
      <span class="vsk-button__label">{{ label() }}</span>
    </button>
  `,
  styles: `
    :host {
      display: inline-block;
    }

    .vsk-button {
      --vsk-button-bg: #0044cc;
      --vsk-button-color: #ffffff;
      --vsk-button-bg-hover: #0037a5;
      --vsk-button-bg-disabled: #a7b6d7;
      --vsk-button-color-disabled: #ffffff;
      --vsk-button-border-radius: 999px;
      --vsk-button-gap: 0.375rem;
      --vsk-button-padding-md: 0.625rem 1.25rem;
      --vsk-button-padding-lg: 0.875rem 1.5rem;

      align-items: center;
      background-color: var(--vsk-button-bg);
      border: none;
      border-radius: var(--vsk-button-border-radius);
      color: var(--vsk-button-color);
      cursor: pointer;
      display: inline-flex;
      font: 600 0.9375rem/1.2 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      gap: var(--vsk-button-gap);
      letter-spacing: 0.01em;
      min-height: 2.5rem;
      padding: var(--vsk-button-padding-md);
      transition: background-color 150ms ease, transform 120ms ease, box-shadow 120ms ease;
    }

    .vsk-button--lg {
      font-size: 1.0625rem;
      min-height: 2.875rem;
      padding: var(--vsk-button-padding-lg);
    }

    .vsk-button--secondary {
      --vsk-button-bg: #fefefe;
      --vsk-button-color: #303030;
      --vsk-button-bg-hover: #ebedf5;
      box-shadow: inset 0 0 0 1px #8c96b2;
    }

    .vsk-button--danger {
      --vsk-button-bg: #b60e35;
      --vsk-button-bg-hover: #9b0c2d;
    }

    .vsk-button--block {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    .vsk-button:hover {
      background-color: var(--vsk-button-bg-hover);
    }

    .vsk-button:focus-visible {
      outline: 3px solid #9ec5ff;
      outline-offset: 2px;
      box-shadow: 0 0 0 2px #0b1f51;
    }

    .vsk-button:active:not(:disabled) {
      transform: translateY(1px);
    }

    .vsk-button:disabled {
      background-color: var(--vsk-button-bg-disabled);
      color: var(--vsk-button-color-disabled);
      cursor: not-allowed;
      box-shadow: none;
    }

    .vsk-button__label {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'vsk-button-host',
  },
})
export class VskButtonExampleComponent {
  readonly label = input.required<string>();
  readonly variant = input<VskButtonVariant>('primary');
  readonly size = input<VskButtonSize>('md');
  readonly block = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly ariaLabel = input<string | null>(null);

  protected readonly isDisabled = computed(() => this.disabled());
}
