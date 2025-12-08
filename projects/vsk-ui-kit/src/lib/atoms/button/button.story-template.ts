export const BUTTON_TEMPLATE = `
  <button
    tuiButton
    type="button"
    iconEnd="@tui.vsk-home"
    [appearance]="appearance"
    [size]="size"
    [disabled]="disabled || loading"
    [attr.type]="type"
    [attr.data-testid]="dataTestId || null"
    [attr.aria-label]="ariaLabel || label"
    [attr.aria-describedby]="ariaDescribedBy || null"
    [attr.aria-controls]="ariaControls || null"
    [attr.aria-expanded]="ariaExpanded === null ? null : ariaExpanded"
    [attr.aria-pressed]="ariaPressed === null ? null : ariaPressed"
    [attr.aria-busy]="loading ? 'true' : null"
    [attr.aria-live]="ariaLive || null"
    (click)="onClick?.($event)"
  >
    @if (loading) {
      <tui-loader size="s" [inheritColor]="true" [showLoader]="true" />
      <span class="vsk-visually-hidden">Загрузка</span>
    } @else {
      @if (leftIcon) {
        <span aria-hidden="true">{{ leftIcon }}</span>
      }
      <span>{{ label }}</span>
      @if (rightIcon) {
        <span aria-hidden="true">{{ rightIcon }}</span>
      }
    }
  </button>
`;
