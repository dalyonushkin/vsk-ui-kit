export type ButtonAppearance = 'primary' | 'secondary' | 'outline' | 'flat';
export type ButtonSize = 's' | 'm' | 'l';
export type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonStoryArgs {
  label: string;
  appearance: ButtonAppearance;
  size: ButtonSize;
  disabled: boolean;
  loading: boolean;
  block: boolean;
  type: ButtonType;
  leftIcon: string | null;
  rightIcon: string | null;
  ariaLabel: string | null;
  ariaDescribedBy: string | null;
  ariaControls: string | null;
  ariaExpanded: boolean | null;
  ariaPressed: boolean | null;
  ariaLive: 'off' | 'polite' | 'assertive' | null;
  onClick?: (event: Event) => void;
  dataTestId?: string | null;
}

export const createButtonArgs = (config: Partial<ButtonStoryArgs> & { label: string; dataTestId: string }): ButtonStoryArgs => ({
  label: config.label,
  appearance: config.appearance ?? 'primary',
  size: config.size ?? 'm',
  disabled: config.disabled ?? false,
  loading: config.loading ?? false,
  block: config.block ?? false,
  type: config.type ?? 'button',
  leftIcon: config.leftIcon ?? null,
  rightIcon: config.rightIcon ?? null,
  ariaLabel: config.ariaLabel ?? config.label,
  ariaDescribedBy: config.ariaDescribedBy ?? null,
  ariaControls: config.ariaControls ?? null,
  ariaExpanded: config.ariaExpanded ?? null,
  ariaPressed: config.ariaPressed ?? null,
  ariaLive: config.ariaLive ?? null,
  dataTestId: config.dataTestId,
  onClick: config.onClick,
});