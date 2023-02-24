import plugin from "tailwindcss/plugin";
import { toCSSVariables } from "./utils";

function createSystemAccentColorClasses(accentColors: string[]) {
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

function createSystemNeutralColorClasses() {
  return {
    "sys-background": { DEFAULT: "var(--sys-background)" },
    "sys-on-background": { DEFAULT: "var(--sys-on-background)" },
    "sys-on-surface": { DEFAULT: "var(--sys-surface)" },
    "sys-on-surface-variant": { DEFAULT: "var(--sys-on-surface)" },
    "sys-outline": { DEFAULT: "var(--sys-outline)" },
    "sys-outline-variant": { DEFAULT: "var(--sys-outline-variant)" },
  };
}

export type ColorTones =
  | "0"
  | "10"
  | "20"
  | "30"
  | "40"
  | "50"
  | "60"
  | "70"
  | "80"
  | "90"
  | "95"
  | "99"
  | "100";

export type ColorPalette = Record<ColorTones, string>;

export type BaseAccentColors =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "error";

export type BaseNeutralColors = "neutral" | "neutralVariant";

export type BaseColors = BaseAccentColors | BaseNeutralColors;

export type SystemAccentColors<AccentColor extends string> = Record<
  | `${AccentColor}`
  | `on${Capitalize<AccentColor>}`
  | `on${Capitalize<AccentColor>}Variant`
  | `${AccentColor}Container`
  | `on${Capitalize<AccentColor>}Container`
  | `on${Capitalize<AccentColor>}ContainerVariant`,
  string
>;

export type Material3Options = {
  systemColors?: Record<string, string> &
    Partial<SystemAccentColors<"primary">> &
    Partial<SystemAccentColors<"secondary">> &
    Partial<SystemAccentColors<"tertiary">> &
    Partial<SystemAccentColors<"success">> &
    Partial<SystemAccentColors<"warning">> &
    Partial<SystemAccentColors<"error">>;

  keyReferenceColorPalettes?: Record<string, string> &
    Partial<Record<BaseColors, ColorPalette>>;

  seedReferenceKeyColors?: Record<string, string> &
    Partial<Record<BaseColors, string>>;

  seedKeyColor?: string;
};

const tailwindPlugin = plugin.withOptions<Material3Options | undefined>(
  (opts) => {
    return ({ addBase }) => {
      addBase({ "*": toCSSVariables(opts?.systemColors ?? {}) });
    };
  },
);

export default tailwindPlugin;
