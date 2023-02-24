import plugin from "tailwindcss/plugin";
import type { BaseColors, TonalPalette, SystemAccentColor } from "./types";
import { toCSSVariables } from "./utils";
import { Hct, argbFromHex, CorePalette } from "./material-color";

export type Material3Options = {
  systemColors?: Record<string, string> &
    Partial<SystemAccentColor<"primary">> &
    Partial<SystemAccentColor<"secondary">> &
    Partial<SystemAccentColor<"tertiary">> &
    Partial<SystemAccentColor<"success">> &
    Partial<SystemAccentColor<"warning">> &
    Partial<SystemAccentColor<"error">>;

  seedReferenceKeyColors?: Record<string, string> &
    Partial<Record<BaseColors, string>>;

  seedKeyColor?: string;
};

const defaultOptions: Material3Options = {};

const tailwindPlugin = plugin.withOptions<Material3Options | undefined>(
  (opts) => {
    return ({ addBase }) => {
      const corePalette = CorePalette.of(
        argbFromHex(opts.seedKeyColor ?? "#6750a4"),
      );

      for (const tonalPalette of Object.values(corePalette)) {
        addBase({ "*": toCSSVariables(opts?.systemColors ?? {}) });
      }
    };
  },
  (opts) => {
    return {};
  },
);

export default tailwindPlugin;
