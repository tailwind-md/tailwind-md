import plugin from "tailwindcss/plugin";
import type { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";
import { materialDesignTheme, type MaterialDesignConfig } from "./theme";
export type { MaterialDesignConfig } from "./theme";
import {
  flattenProperties,
  toCSSVariables,
  toTailwindColorTheme,
  toTailwindFontSizeTheme,
  toTailwindTheme,
} from "./utils";

type RTKVP = ResolvableTo<KeyValuePair<string, string>>;

const materialDesignPlugin = plugin.withOptions<Partial<MaterialDesignConfig>>(
  (opts) => {
    return ({ addBase }) => {
      // add base
      const md = materialDesignTheme(opts);

      addBase({
        "*": toCSSVariables(
          flattenProperties({
            md: md,
          }),
        ),
      });
    };
  },
  (opts) => {
    const mt = materialDesignTheme(opts);

    let colors = toTailwindColorTheme(mt.sys.color, {
      prefix: "md-sys-color",
    });

    const opacity = toTailwindTheme(flattenProperties(mt.sys.state), {
      prefix: "md-sys-state",
      createKey: (k) => k.replace("Opacity", ""),
    }) as unknown as RTKVP;

    const borderRadius = toTailwindTheme(mt.sys.shape.corner, {
      prefix: "md-sys-shape-corner",
    });

    const fontSize = toTailwindFontSizeTheme(mt.sys.typescale, {
      prefix: "md-sys-typescale",
    });

    if (opts?.emitReferenceClasses) {
      colors = {
        ...colors,

        ...toTailwindColorTheme(mt.ref.palette, {
          prefix: "md-ref-palette",
        }),
      };
    }

    return {
      theme: {
        colors,
        borderRadius,
        opacity,
        fontSize,
      },
    };
  },
);

export default materialDesignPlugin;
