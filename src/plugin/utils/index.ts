import { hexFromArgb, type CorePalette } from "$plugin/material-color";
import type { ReferenceColorPalatte, TonalPalette, Tones } from "$plugin/types";

export function camelToSnake(snake: string): string {
  return snake;
}

export function toCSSVariables(o: Record<string, string>) {
  const vars: Record<`--${string}`, string> = {};
  for (const [key, value] of Object.entries(o)) {
    vars[`--${camelToSnake(key)}`] = value;
  }
  return vars;
}

export function createSystemAccentColorClasses(accentColors: string[]) {
  const colors: Record<string, Record<string, string> & { DEFAULT: string }> =
    {};
  for (const accentColor of accentColors) {
    colors[`sys-${accentColor}`] = { DEFAULT: `var(--sys-${accentColor})` };
    colors[`sys-on-${accentColor}`] = {
      DEFAULT: `var(--sys-on-${accentColor})`,
    };
    colors[`sys-${accentColor}-container`] = {
      DEFAULT: `var(--sys-${accentColor}-container)`,
    };
    colors[`sys-on-${accentColor}-container`] = {
      DEFAULT: `var(--sys-on-${accentColor}-container)`,
    };
  }
  return colors;
}

export function createSystemNeutralColorClasses() {
  return {
    "sys-background": { DEFAULT: "var(--sys-background)" },
    "sys-on-background": { DEFAULT: "var(--sys-on-background)" },
    "sys-on-surface": { DEFAULT: "var(--sys-surface)" },
    "sys-on-surface-variant": { DEFAULT: "var(--sys-on-surface)" },
    "sys-outline": { DEFAULT: "var(--sys-outline)" },
    "sys-outline-variant": { DEFAULT: "var(--sys-outline-variant)" },
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
  cp: CorePalette,
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
  const warning = createBlankTonalPalette();

  const error = createBlankTonalPalette();
  for (const tone of tones) {
    tertiary[tone] = hexFromArgb(cp.error.tone(tone));
  }

  const neutral = createBlankTonalPalette();
  for (const tone of tones) {
    tertiary[tone] = hexFromArgb(cp.n1.tone(tone));
  }

  const neutralVariant = createBlankTonalPalette();
  for (const tone of tones) {
    tertiary[tone] = hexFromArgb(cp.n2.tone(tone));
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
