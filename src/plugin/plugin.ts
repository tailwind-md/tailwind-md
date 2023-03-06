import plugin from "tailwindcss/plugin";
import type { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";
import { materialDesignTheme, type MaterialDesignConfig } from "./theme";
export type { MaterialDesignConfig } from "./theme";
import {
  flattenColors,
  flattenProperties,
  hexToRGBSpaceSeparated,
  isHexColor,
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

function _toRgbWithOpacity(value: string, opacity: string): string {
  return typeof value === "function"
    ? (value as (o: number) => string)(1).replace("/ 1", `/ ${opacity}`)
    : isHexColor(value)
    ? `rgb(${hexToRGBSpaceSeparated(value)} / ${opacity})`
    : value;
}

const materialDesignPlugin = plugin.withOptions<Partial<MaterialDesignConfig>>(
  (opts) => {
    return ({ addBase, matchUtilities, theme, addUtilities }) => {
      // add base
      const { theme: md, mergedConfig: conf } = materialDesignTheme(opts);

      const color = { ...md.sys.color };
      delete md.sys.color;

      const els = { ...md.sys.elevation };

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
        const opacity = `${surfaceTintOpacity(value)}%`;

        elevations[key] = {
          surfaceTintOpacity: opacity,
          shadowUmbra: `${umbra.xOffset} ${umbra.yOffset} ${umbra.blurRadius} ${umbra.spreadRadius}`,
          shadowPenumbra: `${penumbra.xOffset} ${penumbra.yOffset} ${penumbra.blurRadius} ${penumbra.spreadRadius}`,
        };
      }

      addUtilities({
        ".material": {
          "--md-var-ripple-color": "transparent",
          "--md-var-ripple-image":
            "linear-gradient(0deg, transparent 0%, transparent 0%)",
          "--md-var-ripple-opacity": "1",
          "--md-var-state-layer-color": "transparent",
          "--md-var-state-layer-image":
            "linear-gradient(0deg, transparent 0%, transparent 0%)",
          "--md-var-state-layer-opacity": "1",
          "--md-var-surface-overlay-color": "transparent",
          "--md-var-surface-overlay-image":
            "linear-gradient(0deg, transparent 0%, transparent 0%)",
          "--md-var-container-color": "transparent",
          "--md-var-container-image":
            "linear-gradient(0deg, transparent 0%, transparent 0%)",
          backgroundImage: `
            /* Ripple Layer */
            var(--md-var-ripple-image),
            linear-gradient(0deg, var(--md-var-ripple-color) 0%, var(--md-var-ripple-color) 100%),

            /* State Layer */
            var(--md-var-state-layer-image),
            linear-gradient(0deg, var(--md-var-state-layer-color) 0%, var(--md-var-state-layer-color) 100%),

            /* Surface Overlay */
            var(--md-var-surface-overlay-image),
            linear-gradient(0deg, var(--md-var-surface-overlay-color) 0%, var(--md-var-surface-overlay-color) 100%),

            /* Container */
            var(--md-var-container-image),
            linear-gradient(0deg, var(--md-var-container-color) 0%, var(--md-var-container-color) 100%)
            `,
        },
      });

      matchUtilities(
        {
          ripple: (value) => {
            return {
              "--md-var-ripple-color": _toRgbWithOpacity(
                value,
                "var(--md-var-ripple-opacity, 1)",
              ),
            };
          },
          "state-layer": (value) => {
            return {
              "--md-var-state-layer-color": _toRgbWithOpacity(
                value,
                "var(--md-var-state-layer-opacity, 1)",
              ),
            };
          },
          "surface-overlay": (value) => {
            return {
              "--md-var-surface-overlay-color": _toRgbWithOpacity(
                value,
                "var(--md-var-surface-overlay-opacity, 1)",
              ),
            };
          },
          container: (value) => {
            return {
              "--md-var-container-color": _toRgbWithOpacity(
                value,
                "var(--md-var-container-opacity, 1)",
              ),
            };
          },
        },
        {
          values: flattenColors(theme("colors")),
          type: ["color"],
        },
      );

      matchUtilities(
        {
          ripple: (value) => {
            return {
              "--md-var-ripple-image": value,
            };
          },
          "state-layer": (value) => {
            return {
              "--md-var-state-layer-image": value,
            };
          },
          "surface-overlay": (value) => {
            return {
              "--md-var-surface-overlay-image": value,
            };
          },
          container: (value) => {
            return {
              "--md-var-container-image": value,
            };
          },
        },
        {
          values: theme("backgroundImage"),
          type: ["image"],
        },
      );

      matchUtilities(
        {
          "ripple-opacity": (value) => {
            return {
              "--md-var-ripple-opacity": value,
            };
          },
          "state-layer-opacity": (value) => {
            return {
              "--md-var-state-layer-opacity": value,
            };
          },
          "surface-overlay-opacity": (value) => {
            return {
              "--md-var-surface-overlay-opacity": value,
            };
          },
          "container-opacity": (value) => {
            return {
              "--md-var-container-opacity": value,
            };
          },
        },
        {
          values: theme("opacity"),
          type: ["percentage"],
        },
      );

      addBase({
        ":root": toCSSVariables(
          flattenProperties({
            md,
          }),
        ),
      });

      addBase({
        ":root": toCSSVariables(
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

      const themeModes = new Set(conf.theme.color.generateThemeModes);

      for (const themeMode of themeModes) {
        if (!["light", "dark"].includes(themeMode)) {
          throw new Error(
            `Invalid theme mode "${themeMode}" in generateThemeModes. Only "light" and "dark" are supported.`,
          );
        }

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

    const opacity = {
      ...toTailwindTheme(flattenProperties(md.sys.state), {
        prefix: "md-sys-state",
        createKey: (k) => k.replace("Opacity", ""),
      }),
      ...toTailwindTheme(flattenProperties(md.sys.elevation), {
        prefix: "md-sys-elevation",
        createKey: (k) => `${k}-surface-tint`,
        createValue: (k) => `${k}-surface-tint-opacity`,
      }),
    } as unknown as RTKVP;

    const borderRadius = toTailwindTheme(md.sys.shape.corner, {
      prefix: "md-sys-shape-corner",
    });

    const fontSize = toTailwindFontSizeTheme(md.sys.typescale, {
      prefix: "md-sys-typescale",
    });

    const boxShadow = toTailwindBoxShadowTheme(md.sys.elevation, {
      prefix: "md-sys-elevation",
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
