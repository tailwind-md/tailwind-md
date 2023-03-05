import plugin from "tailwindcss/plugin";
import type { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";
import { materialDesignTheme, type MaterialDesignConfig } from "./theme";
export type { MaterialDesignConfig } from "./theme";
import {
  flattenProperties,
  shadowPenumbra,
  shadowUmbra,
  surfaceTintOpacity,
  toCSSVariables,
  toTailwindBoxShadowTheme,
  toTailwindColorTheme,
  toTailwindFontSizeTheme,
  toTailwindTheme,
} from "./utils";

type RTKVP = ResolvableTo<KeyValuePair<string, string>>;

const materialDesignPlugin = plugin.withOptions<Partial<MaterialDesignConfig>>(
  (opts) => {
    return ({ addBase }) => {
      // add base
      const { theme: md, mergedConfig: conf } = materialDesignTheme(opts);

      const color = { ...md.sys.color };
      delete md.sys.color;

      const els = md.sys.elevation;

      delete md.sys.elevation;

      const elevations: Record<
        string,
        {
          surfaceTintOpacity: string;
          shadowUmbra: string;
          shadowPenumbra: string;
        }
      > = {};

      for (const [key, value] of Object.entries(els)) {
        const umbra = shadowUmbra(value);
        const penumbra = shadowPenumbra(value);
        elevations[key] = {
          surfaceTintOpacity: `${surfaceTintOpacity(value)}%`,
          shadowUmbra: `${umbra.xOffset} ${umbra.yOffset} ${umbra.blurRadius} ${umbra.spreadRadius}`,
          shadowPenumbra: `${penumbra.xOffset} ${penumbra.yOffset} ${penumbra.blurRadius} ${penumbra.spreadRadius}`,
        };
      }

      addBase({
        "*": toCSSVariables(
          flattenProperties({
            md,
          }),
        ),
      });

      addBase({
        "*": toCSSVariables(
          flattenProperties({
            md: {
              sys: {
                elevation: elevations,
              },
            },
          }),
        ),
      });

      addBase({
        ":root": toCSSVariables(
          flattenProperties({
            md: {
              sys: {
                color: color[conf.theme.color.defaultThemeMode],
              },
            },
          }),
        ),
      });

      const themeModes = conf.theme.color.generateThemeModes;

      for (const themeMode of themeModes) {
        if (conf.theme.color.themeModeSwitchMethod === "class") {
          addBase({
            [`.${themeMode}`]: toCSSVariables(
              flattenProperties({
                md: {
                  sys: {
                    color: color[themeMode],
                  },
                },
              }),
            ),
          });
        } else {
          addBase({
            [`[data-theme-mode="${themeMode}"]`]: toCSSVariables(
              flattenProperties({
                md: {
                  sys: {
                    color: color[themeMode],
                  },
                },
              }),
            ),
          });
        }
      }
    };
  },
  (opts) => {
    const { theme: md } = materialDesignTheme(opts);

    let colors = toTailwindColorTheme(md.sys.color.light, {
      prefix: "md-sys-color",
    });

    let opacity = toTailwindTheme(flattenProperties(md.sys.state), {
      prefix: "md-sys-state",
      createKey: (k) => k.replace("Opacity", ""),
    }) as unknown as RTKVP;

    const borderRadius = toTailwindTheme(md.sys.shape.corner, {
      prefix: "md-sys-shape-corner",
    });

    const fontSize = toTailwindFontSizeTheme(md.sys.typescale, {
      prefix: "md-sys-typescale",
    });

    const boxShadow = toTailwindBoxShadowTheme(md.sys.elevation, {
      prefix: "md-sys-elevation",
      createKey: (k) => `elevation-${k}`,
    });

    if (opts?.emitReferenceClasses) {
      colors = {
        ...colors,

        ...toTailwindColorTheme(md.ref.palette, {
          prefix: "md-ref-palette",
        }),
      };
    }

    return {
      theme: {
        extend: {
          colors,
          borderRadius,
          boxShadow,
          opacity,
          fontSize,
        },
      },
    };
  },
);

export default materialDesignPlugin;
