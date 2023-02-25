import { hexFromArgb, type CorePalette } from "$plugin/material-color";
import type { ReferenceColorPalatte, TonalPalette, Tones } from "$plugin/types";

export function camelToSnake(snake: string): string {
  return snake;
}

export function toCSSVariables(
  o: Record<string, unknown>
): Record<string, string> {
  const vars: Record<`--${string}`, string> = {};
  for (const [key, value] of Object.entries(o)) {
    vars[`--${camelToSnake(key)}`] = `${value}`;
  }
  return vars;
}

function flattenObject(o: Record<string, unknown>): Record<string, unknown> {
  // Convert a tree of properties into a single object
  for (const [k, v] of Object.entries(o)) {
  }

  return {};
}

export function flattenProperties(
  o: Record<string, unknown>
): Record<string, unknown> {
  return flattenObject(o);
}

export function capitalize(s: string): string {
  return s[0].toUpperCase() + s.slice(1);
}

export function createAccentColorClasses(accentColors: string[]) {
  const colors: Record<string, Record<string, string> & { DEFAULT: string }> =
    {};
  for (const accentColor of accentColors) {
    colors[`${accentColor}`] = { DEFAULT: `var(--sys-${accentColor})` };
    colors[`on-${accentColor}`] = {
      DEFAULT: `var(--sys-on-${accentColor})`,
    };
    colors[`${accentColor}-container`] = {
      DEFAULT: `var(--sys-${accentColor}-container)`,
    };
    colors[`on-${accentColor}-container`] = {
      DEFAULT: `var(--sys-on-${accentColor}-container)`,
    };
  }
  return colors;
}

export function createSemanticColorClasses(accentColors: string[]) {
  const colors: Record<string, Record<string, string> & { DEFAULT: string }> =
    {};
  for (const accentColor of accentColors) {
    colors[`${accentColor}`] = { DEFAULT: `var(--sys-${accentColor})` };
    colors[`on-${accentColor}`] = {
      DEFAULT: `var(--sys-on-${accentColor})`,
    };
    colors[`${accentColor}-container`] = {
      DEFAULT: `var(--sys-${accentColor}-container)`,
    };
    colors[`on-${accentColor}-container`] = {
      DEFAULT: `var(--sys-on-${accentColor}-container)`,
    };
  }
  return colors;
}

export function createSystemNeutralColorClasses() {
  return {
    background: { DEFAULT: "var(--sys-background)" },
    "on-background": { DEFAULT: "var(--sys-on-background)" },
    "on-surface": { DEFAULT: "var(--sys-surface)" },
    "on-surface-variant": { DEFAULT: "var(--sys-on-surface)" },
    outline: { DEFAULT: "var(--sys-outline)" },
    "outline-variant": { DEFAULT: "var(--sys-outline-variant)" },
  };
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

export function corePaletteToReferenceCorePalette(
  cp: CorePalette
): ReferenceColorPalatte {
  const tones: Tones[] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];

  const primary = createBlankTonalPalette();
  for (const tone of tones) {
    primary[tone] = hexFromArgb(cp.a1.tone(tone));
  }

  const secondary = createBlankTonalPalette();
  for (const tone of tones) {
    secondary[tone] = hexFromArgb(cp.a2.tone(tone));
  }

  const tertiary = createBlankTonalPalette();
  for (const tone of tones) {
    tertiary[tone] = hexFromArgb(cp.a3.tone(tone));
  }

  const success = createBlankTonalPalette();
  for (const tone of tones) {
    success[tone] = hexFromArgb(cp.success.tone(tone));
  }

  const warning = createBlankTonalPalette();
  for (const tone of tones) {
    warning[tone] = hexFromArgb(cp.warning.tone(tone));
  }

  const error = createBlankTonalPalette();
  for (const tone of tones) {
    error[tone] = hexFromArgb(cp.error.tone(tone));
  }

  const neutral = createBlankTonalPalette();
  for (const tone of tones) {
    neutral[tone] = hexFromArgb(cp.n1.tone(tone));
  }

  const neutralVariant = createBlankTonalPalette();
  for (const tone of tones) {
    neutralVariant[tone] = hexFromArgb(cp.n2.tone(tone));
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
