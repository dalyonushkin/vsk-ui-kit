import type { Meta, StoryObj } from '@storybook/angular';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { TuiLabel } from '@vsk/ui-kit/taiga-ui/core';
import { TuiPlatform } from '@vsk/ui-kit/taiga-ui/cdk';
import { TuiSwitch } from '@vsk/ui-kit/taiga-ui/kit';
import {TuiCardMedium,TuiCell} from '@taiga-ui/layout';

type TuiSizeS = 's' | 'm';
type TuiPlatformName = 'web' | 'android' | 'ios';

interface SwitchStoryArgs {
  checked: boolean;
  disabled: boolean;
  showIcons: boolean;
  size: TuiSizeS;
  platform: TuiPlatformName;
  label: string | null;
  helperText: string | null;
  ariaLabel: string | null;
}

const meta: Meta<SwitchStoryArgs> = {
  id: 'atoms-switch',
  title: 'Atoms/Переключатель — tuiSwitch',
  tags: ['autodocs', 'beta'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'image',
      name: 'Дизайн',
      url: 'assets/atoms/switch/figma/image.png',
      scale: 0.35,
      offset: [-200, 120],
    },
    docs: {
      description: {
        component:
          'Переключатель на базе директивы `tuiSwitch` (Taiga UI, пакет KIT), применяется на нативном `<input type="checkbox">`. Компонент поддерживает двоичное состояние on/off, опциональные иконки внутри бегунка и платформенные различия отображения (web, Android, iOS) через директиву `tuiPlatform`.\n\n' +
          'Основные входные параметры: `[(ngModel)]` или `[formControl]` для управления значением, `[disabled]` для недоступного состояния, `[showIcons]` для отображения иконок, `[size]` со значениями `"s" | "m"`. Для демонстрации платформ используйте `[tuiPlatform]="platform"`.\n\n' +
          'Доступность: элемент имеет семантику переключателя на базе нативного чекбокса. В примерах Taiga UI подпись оформляется через `<label tuiLabel>`, оборачивающий и сам переключатель, и текст. Если визуальной метки нет, используйте `aria-label`. Для вспомогательного текста используйте `aria-describedby`, связывая элемент с описанием (например, скрытым текстом). Для состояний валидации через реактивные формы корректно отображаются `aria-invalid` и стили ошибки.',
      },
    },
  },
  argTypes: {
    size: {
      options: ['s', 'm'],
      control: { type: 'inline-radio' },
      description: 'Размер переключателя (S/M).',
    },
    platform: {
      options: ['web', 'android', 'ios'],
      control: { type: 'inline-radio' },
      description: 'Платформа визуализации через директиву `tuiPlatform`.',
    },
    checked: { control: 'boolean', description: 'Текущее состояние: включён/выключен.' },
    disabled: { control: 'boolean', description: 'Недоступное состояние.' },
    showIcons: { control: 'boolean', description: 'Показывать иконки в бегунке.' },
    label: { control: 'text', description: 'Текстовая метка для переключателя.' },
    helperText: {
      control: 'text',
      description:
        'Вспомогательный текст. Если задан, подключается к элементу через aria-describedby.',
    },
    ariaLabel: {
      control: 'text',
      description:
        'Альтернативная метка через `aria-label`, используется, когда видимого label нет.',
    },
  },
  args: {
    checked: false,
    disabled: false,
    showIcons: true,
    size: 'm',
    platform: 'web',
    label: 'Использовать биометрию',
    helperText: 'Переключает вход по отпечатку/Face ID при поддержке устройством',
    ariaLabel: null,
  },
};

export default meta;

type Story = StoryObj<SwitchStoryArgs>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Песочница с управляемыми параметрами. Метка оформлена через обёртку `<label tuiLabel>`, как в примерах Taiga UI; при отсутствии видимой метки используйте `aria-label`. Вспомогательный текст подключён к переключателю через `aria-describedby`.',
      },
    },
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [CommonModule, FormsModule, TuiLabel, TuiPlatform, TuiSwitch],
    },
    template: `
      <section [tuiPlatform]="platform" aria-label="Playground">
        <label tuiLabel>
          <input
            tuiSwitch
            type="checkbox"
            [(ngModel)]="checked"
            [disabled]="disabled"
            [showIcons]="showIcons"
            [size]="size"
            [attr.aria-label]="!label ? ariaLabel : null"
            [attr.aria-describedby]="helperText ? 'switch-helper' : null"
          />
          <span *ngIf="label">{{ label }}</span>
        </label>
        <p *ngIf="helperText" id="switch-helper" class="vsk-visually-hidden">
          {{ helperText }}
        </p>
      </section>
    `,
  }),
};

export const Showcase: Story = {
  parameters: {
    controls: { disabled: true },
   viewport: null,
    docs: {
      description: {
        story:
          'Подборка ключевых состояний по официальной документации Taiga UI: размеры S/M, доступность, недоступные состояния, и ошибка валидации через реактивные формы. Также показаны платформенные различия (web/android/ios) через `tuiPlatform` и ряд примеров из дизайн-макетов с логическими размерами S/M/L (в Taiga UI для переключателя доступны размеры `s` и `m`, размер L реализуется на уровне дизайн-системы поверх `m`).',
      },
    },
  },
  render: () => ({
    props: {
      themes: [ 'ligth', 'dark'] as string[],
      platforms: [ 'web', 'android', 'ios'] as TuiPlatformName[],
      sizes: [ 's', 'm', 'l'] as string[],
      booleanValues: [ true, false ],
      invalidTrue: new FormControl(true, () => ({ invalid: true })),
      invalidFalse: new FormControl(false, () => ({ invalid: true })),
    },
    moduleMetadata: {
      imports: [NgFor, FormsModule, ReactiveFormsModule, TuiLabel, TuiPlatform, TuiSwitch, TuiCardMedium, TuiCell],
    },
    template: `
      
      <div *ngFor="let theme of themes" [attr.data-tui-theme]="theme" class="theme-card">
        <h2>Тема: {{ theme }}</h2>
        <div *ngFor="let platform of platforms" [tuiPlatform]="platform" >
          <div *ngFor="let size of sizes">
            <h3>Платформа: {{ platform }}, Размер: {{ size }}</h3>
            <div *ngFor="let disabled of booleanValues">
              <span *ngFor="let modelValue of booleanValues">
                <!-- on -->
                <span tuiCardMedium>
                  <input tuiSwitch type="checkbox" [disabled]="disabled" [ngModel]="modelValue" [showIcons]="first" [size]="size" />
                </span>
              </span>
            </div>
            <!-- disabled on -->
            <input tuiSwitch type="checkbox" [disabled]="disabled" [ngModel]="true" [showIcons]="first" [size]="first ? 'm' : 's'" />

            <!-- off -->
            <input tuiSwitch type="checkbox" [ngModel]="false" [showIcons]="first" [size]="first ? 'm' : 's'" />

            <!-- disabled off -->
            <input tuiSwitch type="checkbox" [disabled]="true" [ngModel]="false" [showIcons]="first" [size]="first ? 'm' : 's'" />

            <!-- invalid on/off (touched) -->
            <input tuiSwitch type="checkbox" [formControl]="invalidTrue" [showIcons]="first" [size]="first ? 'm' : 's'" />
            <input tuiSwitch type="checkbox" [formControl]="invalidFalse" [showIcons]="first" [size]="first ? 'm' : 's'" />

            <hr />
          </div>
        </div>
      </div>

      <section aria-label="Размеры переключателя по дизайну">
        <div [tuiCell]="s">
          <label tuiLabel>
            <input tuiSwitch type="checkbox" [ngModel]="true" [size]="'s'" />
            Маленький переключатель (S)
          </label>
        </div>

        <div [tuiCell]="s">
          <label tuiLabel>
            <input tuiSwitch type="checkbox" [ngModel]="true" [size]="'m'" />
            Средний переключатель (M)
          </label>
        </div>

        <div [tuiCell]="s">
          <label tuiLabel>
            <input tuiSwitch type="checkbox" [ngModel]="true" [size]="'l'" />
            Большой переключатель (L, макет VSK, размер Taiga — m)
          </label>
        </div>
      </section>
          <style>
    .theme-card {
    background-color: var(--tui-base-02);
    color: var(--tui-text-01);
    transition: background-color 0.3s, color 0.3s;
}
    </style>
    `,
  }),
};
