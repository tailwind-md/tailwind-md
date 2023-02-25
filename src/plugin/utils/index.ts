import {
  hexFromArgb,
  CorePalette,
  TonalPalette as OldTonalPalette,
  argbFromHex,
} from "$plugin/material-color";
import type {
  BaseReferencePalette,
  BaseColorScheme,
  SystemKeyColor,
  TonalPalette,
  Tones,
  BaseColors,
} from "$plugin/types";

export function camelToKebabCase(snake: string): string {
  return /^([A-Z])/.test(snake)
    ? snake
    : snake.replace(/([a-z]+|(?:[a-z]+[0-9]+))([A-Z])/g, "$1-$2").toLowerCase();
}

function pref(p: string) {
  return p === "" ? p : `${p}-`;
}

export function toCSSVariables(
  o: Record<string, unknown>,
  prefix = "",
): Record<string, string> {
  const vars: Record<`--${string}`, string> = {};
  for (const [key, value] of Object.entries(o)) {
    vars[`--${pref(prefix)}${camelToKebabCase(key)}`] = `${value}`;
  }
  return vars;
}

export function toClassNames<K extends unknown>(
  o: Record<string, K>,
  prefix = "",
): Record<string, K> {
  const c: Record<string, K> = {};

  for (const [key, value] of Object.entries(o)) {
    c[`${pref(prefix)}${camelToKebabCase(key)}`] = value;
  }

  return c;
}

function flattenObject(
  pre: string,
  o: Record<string, unknown>,
): Record<string, unknown> {
  const flattened: Record<string, unknown> = {};

  for (const [k, v] of Object.entries(o)) {
    const key = `${pre}${pre === "" ? k : capitalize(k)}`;

    if (typeof v === "object") {
      for (const [k2, v2] of Object.entries(
        flattenObject(key, v as Record<string, unknown>),
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
  return flattenObject("", o);
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

export function toTailwindColorsWithAlpha(
  o: Record<string, string | TonalPalette>,
  prefix = "",
): Record<string, string | TonalPalette> {
  const x: Record<string, string | TonalPalette> = {};

  for (const [k, v] of Object.entries(o)) {
    if (typeof v === "string") {
      x[k] = `rgb(var(--${pref(prefix)}${camelToKebabCase(
        k,
      )}) / <alpha-value>)`;
    } else {
      x[k] = createBlankTonalPalette();
      for (const [k2] of Object.entries(v)) {
        x[k][k2] = `rgb(var(--${pref(prefix)}${camelToKebabCase(
          k,
        )}${k2}) / <alpha-value>)`;
      }
    }
  }

  return x;
}

export function createColorScheme(
  mode: "light" | "dark" = "light",
): BaseColorScheme {
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

export function createReferencePalette(hex: string): BaseReferencePalette {
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

function deepMergeImpl<T extends object>(o1: T, o2: T): T {
  const merged: T = { ...o1 };
  for (const [key, value] of Object.entries(o2)) {
    if (typeof value === "object") {
      if (typeof merged[key] === "object") {
        merged[key] = deepMerge(o1[key] as T, value as T);
      } else {
        merged[key] = value;
      }
    } else {
      merged[key] = value;
    }
  }

  return merged;
}
export function deepMerge<T extends object>(o1: T, ...rest: T[]): T {
  let merged: T = { ...o1 };

  for (const o of rest) {
    merged = deepMergeImpl(merged, o);
  }

  return merged;
}

export function hexToRGB(h: string): [number, number, number] {
  const r = parseInt(h[1] + h[2], 16);
  const g = parseInt(h[3] + h[4], 16);
  const b = parseInt(h[5] + h[6], 16);

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
  o: Partial<Record<BaseColors, string>>,
): Partial<Record<BaseColors, TonalPalette>> {
  const x: Partial<Record<BaseColors, TonalPalette>> = {};

  for (const [k, v] of Object.entries(o)) {
    x[k] = createTonalPalette(v);
  }

  return x;
}

type CustomColors = {
  ref: { palatte: Record<string, TonalPalette> };
  sys: { color: Record<string, string> };
};

export function createCustomColors(
  o: Record<string, string>,
  mode: "light" | "dark" = "light",
): CustomColors {
  const x: CustomColors = { ref: { palatte: {} }, sys: { color: {} } };

  for (const [k, v] of Object.entries(o)) {
    x.ref.palatte[k] = createTonalPalette(v);
    x.sys.color = { ...x.sys.color, ...createSystemKeyColors(k, mode) };
  }

  return x;
}
