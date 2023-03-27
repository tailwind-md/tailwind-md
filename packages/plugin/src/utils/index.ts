import {
  hexFromArgb,
  CorePalette,
  TonalPalette as OldTonalPalette,
  argbFromHex,
} from "../material-color";
import type {
  ReferencePalette,
  SystemColorScheme,
  SystemKeyColor,
  TonalPalette,
  Tones,
  BaseColor,
  FontStyle,
  Elevation,
  ElevationDistance,
  State,
} from "../types";
import type { DeepPartial } from "./types";

export * from "./types";

type TransormerOptions = {
  prefix?: string;
  createKey?: (k: string, v: unknown) => string;
};

type ThemeTransformerOptions = TransormerOptions & {
  createValue?: (k: string, v: unknown) => string;
};

const defaultTransformerOptions: Required<TransormerOptions> = {
  prefix: "",
  // no-op
  createKey: (k) => k,
};

const defaultThemeTransformerOptions: Required<ThemeTransformerOptions> = {
  ...defaultTransformerOptions,
  // no-op
  createValue: (k) => k,
};

export function camelToKebabCase(camel: string): string {
  return camel.replace(/(?<=[a-z0-9A-Z])([A-Z])/g, "-$1").toLowerCase();
}

function pf(p: string) {
  return p === "" ? p : `${p}-`;
}

export function toCSSVariables(
  o: Record<string, unknown>,
  opts?: TransormerOptions
): Record<string, string> {
  const merged = { ...defaultTransformerOptions, ...opts };
  const vars: Record<`--${string}`, string> = {};
  for (const [key, value] of Object.entries(o)) {
    const k = `--${pf(merged.prefix)}${camelToKebabCase(
      merged.createKey(key, value)
    )}`;

    vars[k as keyof typeof vars] = `${value}`;
  }
  return vars;
}

export function toClassNames<K>(
  o: Record<string, K>,
  opts?: TransormerOptions
): Record<string, K> {
  const merged = { ...defaultTransformerOptions, ...opts };
  const c: Record<string, K> = {};

  for (const [key, value] of Object.entries(o)) {
    c[`${pf(merged.prefix)}${camelToKebabCase(merged.createKey(key, value))}`] =
      value;
  }

  return c;
}

function flattenObject(
  o: Record<string, unknown>,
  opts?: TransormerOptions
): Record<string, unknown> {
  opts = { ...defaultTransformerOptions, ...opts };
  const flattened: Record<string, unknown> = {};

  for (const [k, v] of Object.entries(o)) {
    const key = `${opts.prefix}${opts.prefix === "" ? k : capitalize(k)}`;

    if (typeof v === "object") {
      for (const [k2, v2] of Object.entries(
        flattenObject(v as Record<string, unknown>, { prefix: key })
      )) {
        flattened[k2] = v2;
      }
    } else {
      flattened[key] = v;
    }
  }

  return flattened;
}

export function flattenProperties(
  o: Record<string, unknown>
): Record<string, unknown> {
  return flattenObject(o, { prefix: "" });
}

export function capitalize<S extends string>(s: S): Capitalize<S> {
  return (s.slice(0, 1).toUpperCase() + s.slice(1)) as unknown as Capitalize<S>;
}

function createBlankTonalPalette(): TonalPalette {
  return {
    0: "",
    2: "",
    4: "",
    6: "",
    8: "",
    10: "",
    12: "",
    17: "",
    20: "",
    22: "",
    24: "",
    30: "",
    40: "",
    50: "",
    60: "",
    70: "",
    80: "",
    87: "",
    90: "",
    92: "",
    94: "",
    95: "",
    96: "",
    98: "",
    99: "",
    100: "",
  };
}

function switchMode<V>(mode: "light" | "dark", lightValue: V, darkValue: V): V {
  return mode === "light" ? lightValue : darkValue;
}

function createSystemKeyColors<C extends string>(
  color: C,
  mode: "light" | "dark" = "light",
  tp?: TonalPalette
): SystemKeyColor<C> {
  if (tp) {
    return {
      [`${color}`]: switchMode(mode, tp[40], tp[80]),
      [`on${capitalize(color)}`]: switchMode(mode, tp[100], tp[20]),
      [`${color}Container`]: switchMode(mode, tp[90], tp[30]),
      [`on${capitalize(color)}Container`]: switchMode(mode, tp[10], tp[90]),
      [`${color}Fixed`]: switchMode(mode, tp[90], tp[90]),
      [`${color}FixedDim`]: switchMode(mode, tp[80], tp[80]),
      [`on${capitalize(color)}Fixed`]: switchMode(mode, tp[10], tp[10]),
      [`on${capitalize(color)}FixedVariant`]: switchMode(mode, tp[30], tp[30]),
    } as unknown as SystemKeyColor<C>;
  }

  return {
    [`${color}`]: `var(--md-ref-palette-${color}${switchMode(mode, 40, 80)})`,
    [`on${capitalize(color)}`]: `var(--md-ref-palette-${color}${switchMode(
      mode,
      100,
      20
    )})`,
    [`${color}Container`]: `var(--md-ref-palette-${color}${switchMode(
      mode,
      90,
      30
    )})`,
    [`on${capitalize(
      color
    )}Container`]: `var(--md-ref-palette-${color}${switchMode(mode, 10, 90)})`,
    [`${color}Fixed`]: `var(--md-ref-palette-${color}${switchMode(
      mode,
      90,
      90
    )})`,
    [`${color}FixedDim`]: `var(--md-ref-palette-${color}${switchMode(
      mode,
      80,
      80
    )})`,
    [`on${capitalize(color)}Fixed`]: `var(--md-ref-palette-${color}${switchMode(
      mode,
      10,
      10
    )})`,
    [`on${capitalize(
      color
    )}FixedVariant`]: `var(--md-ref-palette-${color}${switchMode(
      mode,
      30,
      30
    )})`,
  } as unknown as SystemKeyColor<C>;
}

export function toTailwindColorTheme(
  o: Record<string, string | TonalPalette>,
  opts?: ThemeTransformerOptions
): Record<string, string | TonalPalette> {
  const merged = { ...defaultThemeTransformerOptions, ...opts };
  const x: Record<string, string | TonalPalette> = {};

  for (const [k, v] of Object.entries(o)) {
    const newKey = camelToKebabCase(merged.createKey(k, v));
    const cssVar = camelToKebabCase(merged.createValue(k, v));

    if (typeof v === "string") {
      x[newKey] = `rgb(var(--${pf(merged.prefix)}${cssVar}) / <alpha-value>)`;
    } else {
      x[newKey] = createBlankTonalPalette();
      for (const [k2] of Object.entries(v)) {
        (x[newKey as keyof typeof x] as TonalPalette)[
          k2 as unknown as keyof TonalPalette
        ] = `rgb(var(--${pf(merged.prefix)}${cssVar}${k2}) / <alpha-value>)`;
      }
    }
  }

  return x;
}

// type RecursiveRecord<K extends string | number | symbol, V> = {
//   [Key in K]: V | RecursiveRecord<K, V>;
// };
export function toTailwindTheme<V>(
  o: Record<string, V>,
  opts?: ThemeTransformerOptions
): Record<string, string> {
  const merged = { ...defaultThemeTransformerOptions, ...opts };
  const x: Record<string, string> = {};

  for (const [k, v] of Object.entries(o)) {
    x[camelToKebabCase(merged.createKey(k, v))] = `var(--${pf(
      merged.prefix
    )}${camelToKebabCase(merged.createValue(k, v))})`;
  }

  return x;
}

// type RecursiveRecord<K extends string | number | symbol, V> = {
//   [Key in K]: V | RecursiveRecord<K, V>;
// };
export function statesToTailwindTheme(
  o: Record<string, State>,
  opts?: ThemeTransformerOptions
): Record<string, string> {
  const merged = { ...defaultThemeTransformerOptions, ...opts };
  const x: Record<string, string> = {};

  for (const [k, v] of Object.entries(o)) {
    x[camelToKebabCase(merged.createKey(k, v))] = `var(--${pf(
      merged.prefix
    )}${camelToKebabCase(merged.createValue(k, v))})`;
  }

  return x;
}

type FontSizeTheme = Record<
  string,
  [string, { lineHeight: string; letterSpacing: string; fontWeight: string }]
>;

export function toTailwindFontSizeTheme(
  x: Record<string, FontStyle>,
  opts?: ThemeTransformerOptions
): FontSizeTheme {
  const merged = { ...defaultThemeTransformerOptions, ...opts };
  const t: FontSizeTheme = {};

  for (const [k, v] of Object.entries(x)) {
    const p = pf(merged.prefix);
    const cssVar = camelToKebabCase(merged.createValue(k, v));
    t[camelToKebabCase(merged.createKey(k, v))] = [
      `var(--${p}${cssVar}-size)`,
      {
        fontWeight: `var(--${p}${cssVar}-weight)`,
        lineHeight: `var(--${p}${cssVar}-line-height)`,
        letterSpacing: `var(--${p}${cssVar}-tracking)`,
      },
    ];
  }

  return t;
}

export function createColorScheme(
  mode: "light" | "dark" = "light",
  ref?: ReferencePalette
): SystemColorScheme {
  if (ref) {
    return {
      // Neutrals
      outline: switchMode(mode, ref.neutralVariant[50], ref.neutralVariant[60]),
      outlineVariant: switchMode(
        mode,
        ref.neutralVariant[80],
        ref.neutralVariant[30]
      ),
      surface: switchMode(mode, ref.neutral[99], ref.neutral[10]),
      surfaceDim: switchMode(mode, ref.neutral[87], ref.neutral[6]),
      surfaceBright: switchMode(mode, ref.neutral[99], ref.neutral[24]),
      surfaceContainerHighest: switchMode(
        mode,
        ref.neutral[90],
        ref.neutral[22]
      ),
      surfaceContainerHigh: switchMode(mode, ref.neutral[92], ref.neutral[17]),
      surfaceContainer: switchMode(mode, ref.neutral[94], ref.neutral[12]),
      surfaceContainerLow: switchMode(mode, ref.neutral[96], ref.neutral[10]),
      surfaceContainerLowest: switchMode(
        mode,
        ref.neutral[100],
        ref.neutral[4]
      ),

      onSurface: switchMode(mode, ref.neutral[10], ref.neutral[90]),
      surfaceVariant: switchMode(
        mode,
        ref.neutralVariant[90],
        ref.neutralVariant[30]
      ),
      onSurfaceVariant: switchMode(
        mode,
        ref.neutralVariant[30],
        ref.neutralVariant[80]
      ),
      background: switchMode(mode, ref.neutral[99], ref.neutral[10]),
      onBackground: switchMode(mode, ref.neutral[10], ref.neutral[90]),

      // Key colors
      ...createSystemKeyColors("primary", mode, ref.primary),
      ...createSystemKeyColors("secondary", mode, ref.secondary),
      ...createSystemKeyColors("tertiary", mode, ref.tertiary),
      ...createSystemKeyColors("success", mode, ref.success),
      ...createSystemKeyColors("warning", mode, ref.warning),
      ...createSystemKeyColors("error", mode, ref.error),

      // Extras
      white: ref.neutral[100],
      black: ref.neutral[0],
      scrim: ref.neutral[0],
      shadow: ref.neutral[0],
      inversePrimary: switchMode(mode, ref.primary[80], ref.primary[40]),
      inverseSurface: switchMode(mode, ref.neutral[20], ref.neutral[90]),
      inverseOnSurface: switchMode(mode, ref.neutral[95], ref.neutral[20]),
      surfaceTint: `var(--md-sys-color-primary)`,
    };
  }

  return {
    // Neutrals
    outline: `var(--md-ref-palette-neutral-variant${switchMode(mode, 50, 60)})`,
    outlineVariant: `var(--md-ref-palette-neutral-variant${switchMode(
      mode,
      80,
      30
    )})`,
    surface: `var(--md-ref-palette-neutral${switchMode(mode, 99, 10)})`,
    surfaceDim: `var(--md-ref-palette-neutral${switchMode(mode, 87, 6)})`,
    surfaceBright: `var(--md-ref-palette-neutral${switchMode(mode, 98, 24)})`,
    surfaceContainerHighest: `var(--md-ref-palette-neutral${switchMode(
      mode,
      90,
      22
    )})`,
    surfaceContainerHigh: `var(--md-ref-palette-neutral${switchMode(
      mode,
      92,
      17
    )})`,
    surfaceContainer: `var(--md-ref-palette-neutral${switchMode(
      mode,
      94,
      12
    )})`,
    surfaceContainerLow: `var(--md-ref-palette-neutral${switchMode(
      mode,
      96,
      10
    )})`,
    surfaceContainerLowest: `var(--md-ref-palette-neutral${switchMode(
      mode,
      100,
      4
    )})`,

    onSurface: `var(--md-ref-palette-neutral${switchMode(mode, 10, 90)})`,
    surfaceVariant: `var(--md-ref-palette-neutral-variant${switchMode(
      mode,
      90,
      30
    )})`,
    onSurfaceVariant: `var(--md-ref-palette-neutral-variant${switchMode(
      mode,
      30,
      80
    )})`,
    background: `var(--md-ref-palette-neutral${switchMode(mode, 99, 10)})`,
    onBackground: `var(--md-ref-palette-neutral${switchMode(mode, 10, 90)})`,

    // Key colors
    ...createSystemKeyColors("primary", mode),
    ...createSystemKeyColors("secondary", mode),
    ...createSystemKeyColors("tertiary", mode),
    ...createSystemKeyColors("success", mode),
    ...createSystemKeyColors("warning", mode),
    ...createSystemKeyColors("error", mode),

    // Extras
    white: "var(--md-ref-palette-neutral100)",
    black: "var(--md-ref-palette-neutral0)",
    scrim: "var(--md-ref-palette-neutral0)",
    shadow: "var(--md-ref-palette-neutral0)",
    inversePrimary: `var(--md-ref-palette-primary${switchMode(mode, 80, 40)})`,
    inverseSurface: `var(--md-ref-palette-neutral${switchMode(mode, 20, 90)})`,
    inverseOnSurface: `var(--md-ref-palette-neutral${switchMode(
      mode,
      95,
      20
    )})`,
    surfaceTint: `var(--md-sys-color-primary)`,
  };
}

export function createReferencePalette(hex: string): ReferencePalette {
  const cp = CorePalette.of(argbFromHex(hex));
  const tones: Tones[] = [
    0, 2, 4, 6, 8, 10, 12, 17, 20, 22, 24, 30, 40, 50, 60, 70, 80, 87, 90, 92,
    94, 95, 96, 98, 99, 100,
  ];

  const primary = createBlankTonalPalette();
  const secondary = createBlankTonalPalette();
  const tertiary = createBlankTonalPalette();
  const success = createBlankTonalPalette();
  const warning = createBlankTonalPalette();
  const error = createBlankTonalPalette();
  const neutral = createBlankTonalPalette();
  const neutralVariant = createBlankTonalPalette();

  const x = [
    primary,
    secondary,
    tertiary,
    success,
    warning,
    error,
    neutral,
    neutralVariant,
  ];

  const y = [
    cp.a1,
    cp.a2,
    cp.a3,
    cp.success,
    cp.warning,
    cp.error,
    cp.n1,
    cp.n2,
  ];

  for (const [a, b] of x.map<[TonalPalette, OldTonalPalette]>((x, i) => [
    x,
    y[i],
  ])) {
    for (const t of tones) {
      a[t] = hexToRGBSpaceSeparated(hexFromArgb(b.tone(t)));
    }
  }

  return {
    primary,
    secondary,
    tertiary,
    success,
    warning,
    error,
    neutral,
    neutralVariant,
  };
}

export function objectHexToRGBSpaceSeparated(
  o: Record<string, string>
): Record<string, string> {
  const x: Record<string, string> = {};

  for (const [k, v] of Object.entries(o)) {
    x[k] = hexToRGBSpaceSeparated(v);
  }

  return x;
}

function deepMergeImpl<T extends Record<string, unknown>>(
  o1: T,
  o2: DeepPartial<T>
): T {
  const merged: T = { ...o1 };

  for (const [key, value] of Object.entries(o2)) {
    if (typeof value === "object") {
      if (typeof merged[key] === "object") {
        merged[key as keyof T] = deepMergeImpl(
          o1[key] as T,
          value as T
        ) as T[keyof T];
      } else {
        if (value !== "undefined") {
          merged[key as keyof T] = value;
        }
      }
    } else {
      if (value !== "undefined") {
        merged[key as keyof T] = value;
      }
    }
  }

  return merged;
}

export function deepMerge<T extends Record<string, unknown>>(
  o1: T,
  ...rest: DeepPartial<T>[]
): T {
  let merged: T = { ...o1 };

  for (const o of rest) {
    merged = deepMergeImpl(merged, o);
  }

  return merged;
}

export function hexToRGB(h: string): [number, number, number] {
  if (!isHexColor(h)) {
    throw new Error(`Invalid hex color: ${h}`);
  }

  const singleDigit = h.length === 4;

  const r = singleDigit ? parseInt(h[1]) : parseInt(h[1] + h[2], 16);
  const g = singleDigit ? parseInt(h[2]) : parseInt(h[3] + h[4], 16);
  const b = singleDigit ? parseInt(h[3]) : parseInt(h[5] + h[6], 16);

  return [r, g, b];
}

export function hexToRGBSpaceSeparated(
  h: string
): `${number} ${number} ${number}` {
  const [r, g, b] = hexToRGB(h);

  return `${r} ${g} ${b}`;
}

export function deepEqual<T1 extends object, T2 extends object>(
  o1: T1,
  o2: T2
): boolean {
  if (typeof o1 !== typeof o2) {
    return false;
  }

  for (const [key, value] of Object.entries(o2)) {
    if (typeof value === "object") {
      if (typeof o1[key as keyof typeof o1] === "object") {
        if (!deepEqual(o1[key as keyof typeof o1] as T1, value as T2)) {
          return false;
        }
      } else {
        return false;
      }
    } else {
      if (o1[key as keyof typeof o1] !== value) {
        return false;
      }
    }
  }

  return true;
}

export function createTonalPalette(hex: string): TonalPalette {
  const tp = OldTonalPalette.fromInt(argbFromHex(hex));

  return {
    0: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(0))),
    2: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(2))),
    4: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(4))),
    6: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(6))),
    8: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(8))),
    10: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(10))),
    12: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(12))),
    17: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(17))),
    20: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(20))),
    22: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(22))),
    24: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(24))),
    30: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(30))),
    40: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(40))),
    50: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(50))),
    60: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(60))),
    70: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(70))),
    80: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(80))),
    87: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(87))),
    90: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(90))),
    92: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(92))),
    94: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(94))),
    95: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(95))),
    96: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(96))),
    98: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(98))),
    99: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(99))),
    100: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(100))),
  };
}

export function createCustomReferencePalatte(
  o: Partial<Record<BaseColor, string>>
): Partial<Record<BaseColor, TonalPalette>> {
  const x: Partial<Record<BaseColor, TonalPalette>> = {};

  for (const [k, v] of Object.entries(o)) {
    x[k as keyof typeof o] = createTonalPalette(v);
  }

  return x;
}

type CustomColors = {
  ref: { palette: Record<string, TonalPalette> };
  sys: { color: Record<string, string> };
};

export function createCustomColors(
  o: Record<string, string>,
  mode: "light" | "dark" = "light"
): CustomColors {
  const x: CustomColors = { ref: { palette: {} }, sys: { color: {} } };

  for (const [k, v] of Object.entries(o)) {
    x.ref.palette[k] = createTonalPalette(v);
    x.sys.color = { ...x.sys.color, ...createSystemKeyColors(k, mode) };
  }

  return x;
}

export function surfaceTintOpacity(elevationLevel: ElevationDistance): number {
  elevationLevel = parseInt(`${elevationLevel}`);

  if (elevationLevel === 0) {
    return 0;
  }

  return Math.round(
    0.02 * elevationLevel ** 3 -
      0.4686 * elevationLevel ** 2 +
      3.8613 * elevationLevel +
      0.5689
  );
}

export type BoxShadow = {
  xOffset: `${number}px`;
  yOffset: `${number}px`;
  blurRadius: `${number}px`;
  spreadRadius: `${number}px`;
};

export function shadowUmbra(distance: ElevationDistance): BoxShadow {
  distance = parseInt(`${distance}`);

  return {
    xOffset: "0px",
    yOffset: `${Math.round(
      distance === 0
        ? 0
        : 0.0054 * distance ** 3 -
            0.0756 * distance ** 2 +
            0.4406 * distance +
            0.2473
    )}px`,
    blurRadius: `${Math.round(
      distance === 0
        ? 0
        : 0.0076 * distance - 0.1573 * distance + 1.0961 * distance + 0.3605
    )}px`,
    spreadRadius: "0px",
  };
}

export function shadowPenumbra(distance: ElevationDistance): BoxShadow {
  distance = parseInt(`${distance}`);

  return {
    xOffset: "0px",
    yOffset: `${Math.round(
      distance === 0
        ? 0
        : -0.0032 * distance + 0.0533 * distance + 0.4782 * distance + 0.187
    )}px`,
    blurRadius: `${Math.round(
      distance === 0 ? 0 : -0.0637 * distance ** 2 + 1.6862 * distance + 0.7669
    )}px`,
    spreadRadius: `${Math.round(
      distance === 0
        ? 0
        : 0.0042 * distance ** 3 -
            0.0783 * distance ** 2 +
            0.8299 * distance +
            0.0984
    )}px`,
  };
}

export function toTailwindBoxShadowTheme(
  elevation: Elevation,
  opts?: ThemeTransformerOptions
): Record<string, string> {
  const merged = { ...defaultThemeTransformerOptions, ...opts };
  const t: Record<string, string> = {};

  for (const [k, v] of Object.entries(elevation)) {
    const p = pf(merged.prefix);
    const cssVar = camelToKebabCase(merged.createValue(k, v));
    t[camelToKebabCase(merged.createKey(k, v))] = `
    var(--${p}${cssVar}-shadow-umbra) var(--tw-shadow-color, rgb(var(--md-sys-color-black) / 30%)), 
    var(--${p}${cssVar}-shadow-penumbra) var(--tw-shadow-color, rgb(var(--md-sys-color-black) / 15%))
    `;
  }

  return t;
}

type Color =
  | string
  | {
      [key: "DEFAULT" | string]: string;
    };

type Colors = Record<string, Color>;

export function flattenColors(colors: Colors): Record<string, string> {
  const c: Record<string, string> = {};

  for (const [k, v] of Object.entries(colors)) {
    if (typeof v === "string") {
      c[k] = v;
    } else {
      for (const [k2, v2] of Object.entries(v)) {
        c[`${k}-${k2}`] = v2;
      }
    }
  }

  return c;
}

export function isHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}
