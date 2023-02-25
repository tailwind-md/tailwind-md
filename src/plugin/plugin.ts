import plugin from "tailwindcss/plugin";
import type {
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

const materialDesignPlugin = plugin.withOptions<Partial<MaterialDesignOptions>>(
  (opts) => {
    return ({ addBase }) => {
      // add base CSS variables
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

    let colors: ResolvableTo<RecursiveKeyValuePair<string, string>> = {
      ...toClassNames(
        toTailwindColorsWithAlpha(mt.sys.color, "md-sys-color"),
        "sys",
      ),
    };

    if (opts?.emitReferenceClasses) {
      colors = {
        ...colors,

        ...toClassNames(
          toTailwindColorsWithAlpha(mt.ref.palette, "ref"),
          "ref",
        ),
      };
    }

    return {
      theme: {
        colors,
      },
    };
  },
);

export default materialDesignPlugin;
