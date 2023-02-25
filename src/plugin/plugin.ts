import plugin from "tailwindcss/plugin";
import type {
  KeyValuePair,
  RecursiveKeyValuePair,
  ResolvableTo,
} from "tailwindcss/types/config";
import { materialDesignTheme, type MaterialDesignOptions } from "./theme";
import {
  flattenProperties,
  toClassNames,
  toCSSVariables,
  toTailwindColorsWithAlpha,
} from "./utils";

type TWThemeValue = ResolvableTo<RecursiveKeyValuePair<string, string>>;
type TWThemeValue2 = ResolvableTo<KeyValuePair<string, string>>;

const materialDesignPlugin = plugin.withOptions<Partial<MaterialDesignOptions>>(
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

    let colors: TWThemeValue = {
      ...toClassNames(
        toTailwindColorsWithAlpha(mt.sys.color, { prefix: "md-sys-color" }),
        {},
      ),
    };

    let opacity: TWThemeValue2 = toClassNames(flattenProperties(mt.sys.state), {
      transformKey: (k) => k.replace("Opacity", ""),
    }) as unknown as TWThemeValue2;

    let borderRadius: TWThemeValue2 = toClassNames(mt.sys.shape.corner);

    if (opts?.emitReferenceClasses) {
      colors = {
        ...colors,

        ...toClassNames(
          toTailwindColorsWithAlpha(mt.ref.palette, {
            prefix: "md-ref-palette",
          }),
        ),
      };
    }

    return {
      theme: {
        colors,
        borderRadius,
        opacity,
      },
    };
  },
);

export default materialDesignPlugin;
