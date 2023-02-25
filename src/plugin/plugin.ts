import plugin from "tailwindcss/plugin";
import type { BaseColors, TonalPalette, AccentColor } from "./types";
import {
  corePaletteToReferenceCorePalette,
  flattenProperties,
  toCSSVariables,
} from "./utils";
import { Hct, argbFromHex, CorePalette } from "./material-color";




export type Material3Options = {
  systemColors?: Record<string, string> &
    Partial<AccentColor<"primary">> &
    Partial<AccentColor<"secondary">> &
    Partial<AccentColor<"tertiary">> &
    Partial<AccentColor<"success">> &
    Partial<AccentColor<"warning">> &
    Partial<AccentColor<"error">>;

  seedReferenceKeyColors?: Record<string, string> &
    Partial<Record<BaseColors, string>>;

  seedKeyColor?: string;
};

const defaultOptions: Material3Options = {};

const tailwindPlugin = plugin.withOptions<Material3Options>(
  (opts) => {
    return ({ addBase }) => {
      const corePalette = CorePalette.of(
        argbFromHex(opts?.seedKeyColor ?? "#6750a4"),
      );

      const refCorePalette = corePaletteToReferenceCorePalette(corePalette);

      for (const tonalPalette of Object.values(corePalette)) {
        addBase({ "*": toCSSVariables(flattenProperties(tonalPalette)) });
      }
    };
  },
  (opts) => {
    return {};
  },
);

export default tailwindPlugin;
