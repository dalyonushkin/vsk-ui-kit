import type { Meta, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { TuiLabel } from '@vsk/ui-kit/taiga-ui/core';
import { TuiPlatform } from '@vsk/ui-kit/taiga-ui/cdk';
import { TuiSwitch } from '@vsk/ui-kit/taiga-ui/kit';
import {
  createInvalidControl,
  createShowcaseVariants,
  createShowcaseControlResolver,
  DEFAULT_SHOWCASE_SIZES,
  VskShowcaseComponent,
  VskShowcaseOption,
  VskShowcaseSize,
  VskShowcasePlatform,
  VskShowcaseVariant,
} from '../../storybook/showcase/vsk-showcase.component';

type TuiSizeS = 's' | 'm';
type TuiPlatformName = VskShowcasePlatform;
type SwitchShowcaseSize = Exclude<VskShowcaseSize, 'l'>;

// Модель значения для витрины: либо простое ngModel, либо formControl с ошибкой/валидацией.
interface SwitchShowcaseNgModel {
  kind: 'ngModel';
  value: boolean;
}

interface SwitchShowcaseFormControl {
  kind: 'formControl';
  createControl: () => FormControl<boolean>;
}

type SwitchShowcaseModel = SwitchShowcaseNgModel | SwitchShowcaseFormControl;

// Данные, которые попадут в шаблон элемента витрины.
interface SwitchShowcaseVariantData {
  disabled: boolean;
  showIcons: boolean;
  model: SwitchShowcaseModel;
}
type SwitchShowcaseVariant = VskShowcaseVariant<SwitchShowcaseVariantData>;

// Переключатель поддерживает только S/M, поэтому исключаем L.
const switchSizes: VskShowcaseOption<SwitchShowcaseSize>[] = DEFAULT_SHOWCASE_SIZES.filter(
  (size): size is VskShowcaseOption<SwitchShowcaseSize> => size.value !== 'l',
);

// Генерируем все комбинации значений: disabled x showIcons x model.
const defaultVariants: SwitchShowcaseVariant[] = createShowcaseVariants<SwitchShowcaseVariantData>({
  prefix: 'Переключатель в состояниях',
  dimensions: [
    {
      key: 'disabled',
      label: 'disabled',
      values: [
        { label: 'выключено', value: false, id: 'off' },
        { label: 'включено', value: true, id: 'on' },
      ],
    },
    {
      key: 'showIcons',
      label: 'showIcons',
      values: [
        { label: 'нет', value: false, id: 'no' },
        { label: 'есть', value: true, id: 'yes' },
      ],
    },
    {
      key: 'model',
      label: 'ngModel',
      values: [
        // Обычные состояния через ngModel.
        { label: 'включено', value: { kind: 'ngModel', value: true }, id: 'ng-on' },
        { label: 'выключено', value: { kind: 'ngModel', value: false }, id: 'ng-off' },
        // Состояния с ошибкой через FormControl.
        {
          label: 'ошибка (on)',
          title: 'formControl=ошибка (on)',
          value: { kind: 'formControl', createControl: () => createInvalidControl(true) },
          id: 'fc-on',
        },
        {
          label: 'ошибка (off)',
          title: 'formControl=ошибка (off)',
          value: { kind: 'formControl', createControl: () => createInvalidControl(false) },
          id: 'fc-off',
        },
      ],
    },
  ],
  mapData: (values) => ({
    // Читаем из словаря комбинации по ключу измерения.
    disabled: values['disabled'] as boolean,
    showIcons: values['showIcons'] as boolean,
    model: values['model'] as SwitchShowcaseModel,
  }),
});

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
          @if (label) {
            <span>{{ label }}</span>
          }
        </label>
        @if (helperText) {
          <p id="switch-helper" class="vsk-visually-hidden">
            {{ helperText }}
          </p>
        }
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
  render: () => {
    // Кешируем FormControl по ключу, чтобы каждый вариант был стабильным.
    const resolveControl = createShowcaseControlResolver();

    return {
      props: {
        // Передаем только разрешенные размеры и список вариантов.
        sizes: switchSizes,
        variants: defaultVariants,
        // Просим витрину оборачивать элементы в <label tuiLabel>.
        resolveControl,
        wrapInLabel: true,
      },
      moduleMetadata: {
        imports: [VskShowcaseComponent, FormsModule, ReactiveFormsModule, TuiSwitch],
      },
      template: `
        <!-- Шаблон одного элемента витрины для переключателя. -->
        <ng-template #item let-variant let-size="size" let-key="key">
          @switch (variant.data.model.kind) {
            @case ('ngModel') {
              <!-- size.value берется из входного списка sizes -->
              <input
                tuiSwitch
                type="checkbox"
                [ngModel]="variant.data.model.value"
                [disabled]="variant.data.disabled"
                [showIcons]="variant.data.showIcons"
                [size]="size.value"
                [attr.aria-label]="variant.title"
              />
            }
            @case ('formControl') {
              <!-- FormControl создается на каждый уникальный ключ витрины -->
              <input
                tuiSwitch
                type="checkbox"
                [formControl]="resolveControl(key, variant.data.model.createControl)"
                [disabled]="variant.data.disabled"
                [showIcons]="variant.data.showIcons"
                [size]="size.value"
                [attr.aria-label]="variant.title"
              />
            }
          }
        </ng-template>

        <!-- Общая витрина, которая сама разбивает на темы/платформы/размеры. -->
        <vsk-showcase
          [sizes]="sizes"
          [variants]="variants"
          [wrapInLabel]="wrapInLabel"
          [itemTemplate]="item"
        />
      `,
    };
  },
};
