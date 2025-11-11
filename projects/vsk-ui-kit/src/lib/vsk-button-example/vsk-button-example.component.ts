import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

type VskButtonVariant = 'primary' | 'secondary' | 'danger';
type VskButtonSize = 'md' | 'lg';

@Component({
  selector: 'vsk-button-example',
  template: `
    <button
      type="button"
      class="vsk-button"
      (click)="pressed.emit($event)"
      [class.vsk-button--secondary]="variant() === 'secondary'"
      [class.vsk-button--danger]="variant() === 'danger'"
      [class.vsk-button--block]="block()"
      [class.vsk-button--lg]="size() === 'lg'"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-disabled]="isDisabled() ? 'true' : null"
      [disabled]="isDisabled()"
      [attr.aria-describedby]="ariaDescribedBy()"
      [attr.aria-controls]="ariaControls()"
      [attr.aria-expanded]="toAriaBoolean(ariaExpanded())"
      [attr.aria-pressed]="toAriaBoolean(ariaPressed())"
      [attr.aria-live]="ariaLive()"
    >
      <span class="vsk-button__label">{{ label() }}</span>
    </button>
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
  readonly ariaDescribedBy = input<string | null>(null);
  readonly ariaControls = input<string | null>(null);
  readonly ariaExpanded = input<boolean | null>(null);
  readonly ariaPressed = input<boolean | null>(null);
  readonly ariaLive = input<'off' | 'polite' | 'assertive' | null>(null);
  readonly pressed = output<Event>();

  protected readonly isDisabled = computed(() => this.disabled());

  protected toAriaBoolean(value: boolean | null): 'true' | 'false' | null {
    if (value === null) {
      return null;
    }

    return value ? 'true' : 'false';
  }
}
