import plugin from "tailwindcss/plugin";
import type { BaseColors, AccentColor } from "./types";
import {
  corePaletteToReferencePalette,
  deepMerge,
  flattenProperties,
  toCSSVariables,
} from "./utils";
import { argbFromHex, CorePalette } from "./material-color";

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

const defaultOptions: Required<Material3Options> = {
  seedKeyColor: "#6750a4",
  systemColors: {},
  seedReferenceKeyColors: {},
};

const tailwindPlugin = plugin.withOptions<Material3Options>(
  (opts) => {
    opts = deepMerge(defaultOptions, opts ?? {});

    return ({ addBase }) => {
      const corePalette = CorePalette.of(argbFromHex(opts.seedKeyColor));

      const colorRefPalette = corePaletteToReferencePalette(corePalette);

      // add base CSS variables
      addBase({
        "*": toCSSVariables(
          flattenProperties({
            m3: { ref: { color: colorRefPalette }, sys: {} },
          }),
        ),
      });
    };
  },
  (opts) => {
    opts = deepMerge(defaultOptions, opts ?? {});
    return {};
  },
);

export default tailwindPlugin;
