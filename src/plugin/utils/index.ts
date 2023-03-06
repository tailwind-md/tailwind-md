import {
  hexFromArgb,
  CorePalette,
  TonalPalette as OldTonalPalette,
  argbFromHex,
} from "$plugin/material-color";
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
} from "$plugin/types";
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
  opts?: TransormerOptions,
): Record<string, string> {
  opts = { ...defaultTransformerOptions, ...opts };
  const vars: Record<`--${string}`, string> = {};
  for (const [key, value] of Object.entries(o)) {
    const k = `--${pf(opts.prefix)}${camelToKebabCase(
      opts.createKey(key, value),
    )}`;

    vars[k] = `${value}`;
  }
  return vars;
}

export function toClassNames<K extends unknown>(
  o: Record<string, K>,
  opts?: TransormerOptions,
): Record<string, K> {
  opts = { ...defaultTransformerOptions, ...opts };
  const c: Record<string, K> = {};

  for (const [key, value] of Object.entries(o)) {
    c[`${pf(opts.prefix)}${camelToKebabCase(opts.createKey(key, value))}`] =
      value;
  }

  return c;
}

function flattenObject(
  o: Record<string, unknown>,
  opts?: TransormerOptions,
): Record<string, unknown> {
  opts = { ...defaultTransformerOptions, ...opts };
  const flattened: Record<string, unknown> = {};

  for (const [k, v] of Object.entries(o)) {
    const key = `${opts.prefix}${opts.prefix === "" ? k : capitalize(k)}`;

    if (typeof v === "object") {
      for (const [k2, v2] of Object.entries(
        flattenObject(v as Record<string, unknown>, { prefix: key }),
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
  o: Record<string, unknown>,
): Record<string, unknown> {
  return flattenObject(o, { prefix: "" });
}

export function capitalize<S extends string>(s: S): Capitalize<S> {
  return (s[0].toUpperCase() + s.slice(1)) as unknown as Capitalize<S>;
}

function createBlankTonalPalette(): TonalPalette {
  return {
    "0": "",
    "10": "",
    "20": "",
    "30": "",
    "40": "",
    "50": "",
    "60": "",
    "70": "",
    "80": "",
    "90": "",
    "95": "",
    "99": "",
    "100": "",
  };
}

function switchMode<V>(mode: "light" | "dark", lightValue: V, darkValue: V): V {
  return mode === "light" ? lightValue : darkValue;
}

function createSystemKeyColors<C extends string>(
  color: C,
  mode: "light" | "dark" = "light",
): SystemKeyColor<C> {
  return {
    [`${color}`]: `var(--md-ref-palette-${color}${switchMode(mode, 40, 80)})`,
    [`on${capitalize(color)}`]: `var(--md-ref-palette-${color}${switchMode(
      mode,
      100,
      20,
    )})`,
    [`${color}Container`]: `var(--md-ref-palette-${color}${switchMode(
      mode,
      90,
      30,
    )})`,
    [`on${capitalize(
      color,
    )}Container`]: `var(--md-ref-palette-${color}${switchMode(mode, 10, 90)})`,
  } as unknown as SystemKeyColor<C>;
}

export function toTailwindColorTheme(
  o: Record<string, string | TonalPalette>,
  opts?: ThemeTransformerOptions,
): Record<string, string | TonalPalette> {
  opts = { ...defaultThemeTransformerOptions, ...opts };
  const x: Record<string, string | TonalPalette> = {};

  for (let [k, v] of Object.entries(o)) {
    const newKey = camelToKebabCase(opts.createKey(k, v));
    const cssVar = camelToKebabCase(opts.createValue(k, v));

    if (typeof v === "string") {
      x[newKey] = `rgb(var(--${pf(opts.prefix)}${cssVar}) / <alpha-value>)`;
    } else {
      x[newKey] = createBlankTonalPalette();
      for (const [k2] of Object.entries(v)) {
        x[newKey][k2] = `rgb(var(--${pf(
          opts.prefix,
        )}${cssVar}${k2}) / <alpha-value>)`;
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
  opts?: ThemeTransformerOptions,
): Record<string, string> {
  opts = { ...defaultThemeTransformerOptions, ...opts };
  const x: Record<string, string> = {};

  for (let [k, v] of Object.entries(o)) {
    x[camelToKebabCase(opts.createKey(k, v))] = `var(--${pf(
      opts.prefix,
    )}${camelToKebabCase(opts.createValue(k, v))})`;
  }

  return x;
}

type FontSizeTheme = Record<
  string,
  [string, { lineHeight: string; letterSpacing: string; fontWeight: string }]
>;

export function toTailwindFontSizeTheme(
  x: Record<string, FontStyle>,
  opts?: ThemeTransformerOptions,
): FontSizeTheme {
  opts = { ...defaultThemeTransformerOptions, ...opts };
  const t: FontSizeTheme = {};

  for (const [k, v] of Object.entries(x)) {
    const p = pf(opts.prefix);
    const cssVar = camelToKebabCase(opts.createValue(k, v));
    t[camelToKebabCase(opts.createKey(k, v))] = [
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
): SystemColorScheme {
  return {
    // Neutrals
    outline: `var(--md-ref-palette-neutral-variant${switchMode(mode, 50, 60)})`,
    outlineVariant: `var(--md-ref-palette-neutral-variant${switchMode(
      mode,
      80,
      30,
    )})`,
    surface: `var(--md-ref-palette-neutral${switchMode(mode, 99, 10)})`,
    onSurface: `var(--md-ref-palette-neutral${switchMode(mode, 10, 90)})`,
    surfaceVariant: `var(--md-ref-palette-neutral-variant${switchMode(
      mode,
      90,
      30,
    )})`,
    onSurfaceVariant: `var(--md-ref-palette-neutral-variant${switchMode(
      mode,
      30,
      80,
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
      20,
    )})`,
    surfaceTint: `var(--md-sys-color-primary)`,
  };
}

export function createReferencePalette(hex: string): ReferencePalette {
  const cp = CorePalette.of(argbFromHex(hex));
  const tones: Tones[] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];

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
  o: Record<string, string>,
): Record<string, string> {
  const x: Record<string, string> = {};

  for (const [k, v] of Object.entries(o)) {
    x[k] = hexToRGBSpaceSeparated(v);
  }

  return x;
}

function deepMergeImpl<T extends Record<string, unknown>>(
  o1: T,
  o2: DeepPartial<T>,
): T {
  const merged: T = { ...o1 };

  for (const [key, value] of Object.entries(o2)) {
    if (typeof value === "object") {
      if (typeof merged[key] === "object") {
        merged[key as keyof T] = deepMergeImpl(
          o1[key] as T,
          value as T,
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
  h: string,
): `${number} ${number} ${number}` {
  const [r, g, b] = hexToRGB(h);

  return `${r} ${g} ${b}`;
}

export function deepEqual<T1 extends object, T2 extends object>(
  o1: T1,
  o2: T2,
): boolean {
  if (typeof o1 !== typeof o2) {
    return false;
  }

  for (const [key, value] of Object.entries(o2)) {
    if (typeof value === "object") {
      if (typeof o1[key] === "object") {
        if (!deepEqual(o1[key] as T1, value as T2)) {
          return false;
        }
      } else {
        return false;
      }
    } else {
      if (o1[key] !== value) {
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
    10: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(10))),
    20: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(20))),
    30: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(30))),
    40: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(40))),
    50: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(50))),
    60: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(60))),
    70: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(70))),
    80: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(80))),
    90: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(90))),
    95: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(95))),
    99: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(99))),
    100: hexToRGBSpaceSeparated(hexFromArgb(tp.tone(100))),
  };
}

export function createCustomReferencePalatte(
  o: Partial<Record<BaseColor, string>>,
): Partial<Record<BaseColor, TonalPalette>> {
  const x: Partial<Record<BaseColor, TonalPalette>> = {};

  for (const [k, v] of Object.entries(o)) {
    x[k] = createTonalPalette(v);
  }

  return x;
}

type CustomColors = {
  ref: { palette: Record<string, TonalPalette> };
  sys: { color: Record<string, string> };
};

export function createCustomColors(
  o: Record<string, string>,
  mode: "light" | "dark" = "light",
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
      0.5689,
  );
}

export function elevationDistanceToBackgroundImage(
  elevationLevel: ElevationDistance,
): string {
  const op = surfaceTintOpacity(elevationLevel);

  const surfaceTint = `rgb(var(--md-sys-color-surface-tint) / ${op}%)`;
  const surface = `rgb(var(--md-sys-color-surface) / 100%)`;

  return `linear-gradient(0deg, ${surfaceTint} 0%, ${surfaceTint} 100%), linear-gradient(0deg, ${surface} 100%, ${surface} 100%)`;
}

export function toTailwindBackgroundImageTheme(
  elevation: Elevation,
  opts?: ThemeTransformerOptions,
): Record<string, string> {
  opts = { ...defaultThemeTransformerOptions, ...opts };
  const t: Record<string, string> = {};

  const p = pf(opts.prefix);
  for (const [k, v] of Object.entries(elevation)) {
    const key = `${camelToKebabCase(opts.createKey(k, v))}`;
    const value = `var(--${p}${camelToKebabCase(
      opts.createValue(k, v),
    )}-surface)`;

    t[key] = value;
  }

  return t;
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
            0.2473,
    )}px`,
    blurRadius: `${Math.round(
      distance === 0
        ? 0
        : 0.0076 * distance - 0.1573 * distance + 1.0961 * distance + 0.3605,
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
        : -0.0032 * distance + 0.0533 * distance + 0.4782 * distance + 0.187,
    )}px`,
    blurRadius: `${Math.round(
      distance === 0 ? 0 : -0.0637 * distance ** 2 + 1.6862 * distance + 0.7669,
    )}px`,
    spreadRadius: `${Math.round(
      distance === 0
        ? 0
        : 0.0042 * distance ** 3 -
            0.0783 * distance ** 2 +
            0.8299 * distance +
            0.0984,
    )}px`,
  };
}

export function toTailwindBoxShadowTheme(
  elevation: Elevation,
  opts?: ThemeTransformerOptions,
): Record<string, string> {
  opts = { ...defaultThemeTransformerOptions, ...opts };
  const t: Record<string, string> = {};

  for (const [k, v] of Object.entries(elevation)) {
    const p = pf(opts.prefix);
    const cssVar = camelToKebabCase(opts.createValue(k, v));
    t[camelToKebabCase(opts.createKey(k, v))] = `
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
