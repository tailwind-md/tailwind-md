import plugin from "tailwindcss/plugin";
import type { BaseColors, BaseSystemColors } from "./types";
import {
  corePaletteToReferencePalette,
  createSystemColors,
  deepMerge,
  flattenProperties,
  toCSSVariables,
} from "./utils";
import { argbFromHex, CorePalette } from "./material-color";

export type Material3Options = {
  systemColors?: Partial<BaseSystemColors>;

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
            m3: {
              ref: { palette: colorRefPalette },
              sys: { color: createSystemColors() },
            },
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
