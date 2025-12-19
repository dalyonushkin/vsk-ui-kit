import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef, computed, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TuiLabel } from '@vsk/ui-kit/taiga-ui/core';
import { TuiPlatform } from '@vsk/ui-kit/taiga-ui/cdk';

// Базовые перечисления для общих витрин.
export type VskShowcaseTheme = 'light' | 'dark';
export type VskShowcasePlatform = 'web' | 'android' | 'ios';
export type VskShowcaseSize = 's' | 'm' | 'l';
export type VskShowcaseLayout = 'grid' | 'stack' | 'full';

// Унифицированная опция для тем/платформ/размеров и других перечислений.
export interface VskShowcaseOption<T> {
  label: string;
  value: T;
}

// Значение измерения (например disabled/showIcons/appearance), с опциональным id и кастомным текстом.
export interface VskShowcaseDimensionValue<T> extends VskShowcaseOption<T> {
  id?: string;
  title?: string;
}

// Описание измерения для генератора вариантов.
export interface VskShowcaseDimension<T> {
  key: string;
  label: string;
  values: VskShowcaseDimensionValue<T>[];
}

// Описание конкретного варианта (заголовок + данные для шаблона).
export interface VskShowcaseVariant<TData = unknown> {
  id: string;
  title: string;
  data: TData;
}

// Группа используется для сохранения "отсутствия" темы/платформы/размера как корректного значения.
export interface VskShowcaseGroup<T> extends VskShowcaseOption<T | null> {
  key: string;
  isFallback: boolean;
}

// Контекст шаблона элемента витрины, чтобы потребитель мог достать группу и ключ.
export interface VskShowcaseItemContext<
  TData = unknown,
  TTheme = string,
  TPlatform = VskShowcasePlatform,
  TSize = string,
> {
  $implicit: VskShowcaseVariant<TData>;
  theme: VskShowcaseGroup<TTheme>;
  platform: VskShowcaseGroup<TPlatform>;
  size: VskShowcaseGroup<TSize>;
  key: string;
}

// Дефолты: можно не передавать в сторе, если устраивают стандартные значения.
export const DEFAULT_SHOWCASE_THEMES: VskShowcaseOption<VskShowcaseTheme>[] = [
  { label: 'Светлая', value: 'light' },
  { label: 'Темная', value: 'dark' },
];

// Дефолтные платформы.
export const DEFAULT_SHOWCASE_PLATFORMS: VskShowcaseOption<VskShowcasePlatform>[] = [
  { label: 'Web', value: 'web' },
  { label: 'Android', value: 'android' },
  { label: 'iOS', value: 'ios' },
];

// Дефолтные размеры.
export const DEFAULT_SHOWCASE_SIZES: VskShowcaseOption<VskShowcaseSize>[] = [
  { label: 'S', value: 's' },
  { label: 'M', value: 'm' },
  { label: 'L', value: 'l' },
];

// Генератор всех комбинаций значений. Полезен для "матриц" состояний.
export const createShowcaseVariants = <TData>(config: {
  prefix?: string;
  dimensions: Array<VskShowcaseDimension<unknown>>;
  mapData: (values: Record<string, unknown>) => TData;
  filter?: (values: Record<string, unknown>) => boolean;
  formatTitle?: (segments: string[]) => string;
  createId?: (values: Record<string, unknown>, idParts: string[]) => string;
}): VskShowcaseVariant<TData>[] => {
  const prefix = config.prefix ?? 'Вариант';
  const formatTitle =
    config.formatTitle ??
    ((segments: string[]) => `${prefix} ${segments.length ? segments.join(' и ') : ''}`.trim());

  // Комбинации в виде накопленного набора значений/сегментов/частей id.
  type Combo = {
    values: Record<string, unknown>;
    segments: string[];
    idParts: string[];
  };

  const combos = config.dimensions.reduce<Combo[]>(
    (acc, dimension) => {
      const next: Combo[] = [];

      acc.forEach((combo) => {
        dimension.values.forEach((value, index) => {
          const segment = value.title ?? `${dimension.label}=${value.label}`;
          const valueKey = value.id ?? `${index}-${String(value.value)}`;
          next.push({
            values: { ...combo.values, [dimension.key]: value.value },
            segments: [...combo.segments, segment],
            idParts: [...combo.idParts, `${dimension.key}-${valueKey}`],
          });
        });
      });

      return next;
    },
    [{ values: {}, segments: [], idParts: [] }],
  );

  // На выходе получаем список вариантов с уникальным id и готовым заголовком.
  return combos
    .filter((combo) => (config.filter ? config.filter(combo.values) : true))
    .map((combo, index) => {
      const resolvedId = config.createId
        ? config.createId(combo.values, combo.idParts)
        : combo.idParts.join('__');

      return {
        id: resolvedId || `variant-${index}`,
        title: formatTitle(combo.segments),
        data: config.mapData(combo.values),
      };
    });
};

// Резолвер для FormControl-ов: кеширует контролы по ключу, чтобы форма не пересоздавалась.
export const createShowcaseControlResolver = () => {
  const controlMap = new Map<string, FormControl<unknown>>();

  return <T>(key: string, createControl: () => FormControl<T>): FormControl<T> => {
    const existing = controlMap.get(key) as FormControl<T> | undefined;

    if (existing) {
      return existing;
    }

    const control = createControl();
    controlMap.set(key, control);
    return control;
  };
};

// Утилита для создания invalid-контрола (например для демонстрации ошибок).
export const createInvalidControl = <T>(value: T): FormControl<T> =>
  new FormControl(value, {
    nonNullable: true,
    validators: () => ({ invalid: true }),
  });

const createGroupKey = (prefix: string, value: unknown, index: number): string =>
  `${prefix}-${index}-${String(value ?? 'default')}`;

// Преобразует список значений в группы, добавляя fallback при пустом списке.
const normalizeGroups = <T>(
  items: VskShowcaseOption<T>[],
  prefix: string,
): VskShowcaseGroup<T>[] => {
  if (items.length > 0) {
    return items.map((item, index) => ({
      ...item,
      key: createGroupKey(prefix, item.value, index),
      isFallback: false,
    }));
  }

  return [
    {
      label: '',
      value: null,
      key: createGroupKey(prefix, null, 0),
      isFallback: true,
    },
  ];
};

@Component({
  selector: 'vsk-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, TuiLabel, TuiPlatform],
  template: `
    <!-- Общая витрина: темы -> платформы -> размеры -> варианты. -->
    <section class="showcase">
      @for (theme of themeGroups(); track theme.key) {
        <article class="theme" [attr.data-tui-theme]="theme.isFallback ? null : theme.value">
          @if (hasThemes()) {
            <header class="theme__header">
              <span class="theme__badge">Тема</span>
              <h2 class="theme__title">{{ theme.label }}</h2>
            </header>
          }
          <div class="theme__content">
            @for (platform of platformGroups(); track platform.key) {
              @if (platform.value) {
                <section class="platform" [tuiPlatform]="platform.value">
                  <ng-container
                    [ngTemplateOutlet]="platformContent"
                    [ngTemplateOutletContext]="{ $implicit: platform, theme: theme }"
                  />
                </section>
              } @else {
                <section class="platform platform--flat">
                  <ng-container
                    [ngTemplateOutlet]="platformContent"
                    [ngTemplateOutletContext]="{ $implicit: platform, theme: theme }"
                  />
                </section>
              }
            }
          </div>
        </article>
      }
    </section>

    <ng-template #platformContent let-platform let-theme="theme">
      @if (hasPlatforms()) {
        <header class="platform__header">
          <span class="platform__badge">Платформа</span>
          <h3 class="platform__title">{{ platform.label }}</h3>
        </header>
      }
      @for (size of sizeGroups(); track size.key) {
        <div class="size">
          @if (hasSizes()) {
            <div class="size__header">
              <span class="size__badge">Размер</span>
              <span class="size__label">{{ size.label }}</span>
            </div>
          }
          <div
            class="size__canvas"
            [class.size__canvas--stack]="layout() !== 'grid'"
            [class.size__canvas--full]="layout() === 'full'"
          >
            @if (itemTemplate()) {
              @for (variant of variants(); track variant.id) {
                <article class="variant">
                  <div class="variant__title">{{ variant.title }}</div>
                  @if (wrapInLabel()) {
                    <label tuiLabel class="variant__content">
                      <ng-container
                        [ngTemplateOutlet]="itemTemplate()"
                        [ngTemplateOutletContext]="createContext(variant, theme, platform, size)"
                      />
                    </label>
                  } @else {
                    <div class="variant__content">
                      <ng-container
                        [ngTemplateOutlet]="itemTemplate()"
                        [ngTemplateOutletContext]="createContext(variant, theme, platform, size)"
                      />
                    </div>
                  }
                </article>
              }
            } @else {
              <div class="variant variant--placeholder">
                <div class="variant__title">Не задан шаблон элемента.</div>
              </div>
            }
          </div>
        </div>
      }
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: block;
        color: var(--tui-text-01);
      }

      .showcase {
        display: flex;
        flex-direction: column;
        gap: 32px;
      }

      .theme {
        padding: 20px;
        border-radius: 20px;
        border: 1px solid var(--tui-base-03);
        background: var(--tui-base-01);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
      }

      .theme__header {
        display: flex;
        align-items: baseline;
        gap: 12px;
        margin-bottom: 16px;
      }

      .theme__badge {
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 12px;
        color: var(--tui-text-02);
      }

      .theme__title {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        color: var(--tui-text-01);
      }

      .theme__content {
        display: grid;
        gap: 20px;
      }

      .platform {
        border-radius: 16px;
        border: 1px dashed var(--tui-base-03);
        background: var(--tui-base-02);
        padding: 16px;
        display: grid;
        gap: 16px;
      }

      .platform--flat {
        background: transparent;
        border-style: solid;
      }

      .platform__header {
        display: flex;
        align-items: baseline;
        gap: 10px;
      }

      .platform__badge {
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 11px;
        color: var(--tui-text-02);
      }

      .platform__title {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: var(--tui-text-01);
      }

      .size {
        display: grid;
        gap: 12px;
      }

      .size__header {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .size__badge {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--tui-text-02);
      }

      .size__label {
        font-size: 14px;
        font-weight: 600;
        color: var(--tui-text-01);
      }

      .size__canvas {
        border-radius: 14px;
        border: 1px solid var(--tui-base-03);
        background: var(--tui-base-01);
        padding: 16px;
        display: grid;
        gap: 12px;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }

      /* Режим списка: один столбец без автоматической сетки. */
      .size__canvas--stack {
        grid-template-columns: 1fr;
      }

      /* Полноширинный режим: крупные карточки, удобно для сложных блоков. */
      .size__canvas--full {
        grid-template-columns: 1fr;
      }

      .size__canvas--full .variant {
        min-height: 160px;
        padding: 16px;
      }

      .size__canvas--full .variant__content {
        align-items: flex-start;
      }

      .variant {
        border-radius: 12px;
        padding: 12px;
        background: var(--tui-base-02);
        display: grid;
        gap: 10px;
        min-height: 110px;
      }

      .variant--placeholder {
        border: 1px dashed var(--tui-base-03);
        align-items: center;
      }

      .variant__title {
        font-size: 13px;
        color: var(--tui-text-02);
        line-height: 1.35;
      }

      .variant__content {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    `,
  ],
})
export class VskShowcaseComponent {
  // Темы/платформы/размеры по умолчанию — можно не передавать в сторе.
  readonly themes = input<VskShowcaseOption<string>[]>(DEFAULT_SHOWCASE_THEMES);
  readonly platforms = input<VskShowcaseOption<VskShowcasePlatform>[]>(DEFAULT_SHOWCASE_PLATFORMS);
  readonly sizes = input<VskShowcaseOption<string>[]>(DEFAULT_SHOWCASE_SIZES);
  // Список вариантов отображения.
  readonly variants = input<VskShowcaseVariant[]>([]);
  // Шаблон рендера одного варианта.
  readonly itemTemplate = input<TemplateRef<VskShowcaseItemContext> | null>(null);
  // Способ раскладки вариантов: сетка, список, или полноширинный режим.
  readonly layout = input<VskShowcaseLayout>('grid');
  // Оборачивать ли шаблон в <label tuiLabel> (частый случай для форм-контролов).
  readonly wrapInLabel = input(false);

  // Сигнальные флаги для отображения заголовков групп.
  readonly hasThemes = computed(() => this.themes().length > 0);
  readonly hasPlatforms = computed(() => this.platforms().length > 0);
  readonly hasSizes = computed(() => this.sizes().length > 0);

  // Нормализуем списки, чтобы даже при отсутствии значений был 1 "fallback" элемент.
  readonly themeGroups = computed(() => normalizeGroups(this.themes(), 'theme'));
  readonly platformGroups = computed(() => normalizeGroups(this.platforms(), 'platform'));
  readonly sizeGroups = computed(() => normalizeGroups(this.sizes(), 'size'));

  // Служебный контекст для template outlet.
  createContext(
    variant: VskShowcaseVariant,
    theme: VskShowcaseGroup<string>,
    platform: VskShowcaseGroup<VskShowcasePlatform>,
    size: VskShowcaseGroup<string>,
  ): VskShowcaseItemContext {
    const key = `${theme.key}:${platform.key}:${size.key}:${variant.id}`;
    return {
      $implicit: variant,
      theme,
      platform,
      size,
      key,
    };
  }
}
