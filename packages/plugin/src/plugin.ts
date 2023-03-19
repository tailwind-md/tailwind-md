import plugin from "tailwindcss/plugin";
import type { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";
import { materialDesignTheme, type MaterialDesignConfig } from "./theme";
export type { MaterialDesignConfig } from "./theme";
import {
  camelToKebabCase,
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

type RTKVP = ResolvableTo<KeyValuePair<string, string>> &
  Record<string, unknown>;

function _toRgbWithOpacity(value: string, opacity: string): string {
  return typeof value === "function"
    ? (value as (o: number) => string)(1).replace("/ 1", `/ ${opacity}`)
    : isHexColor(value)
    ? `rgb(${hexToRGBSpaceSeparated(value)} / ${opacity})`
    : value;
}

const vars = {
  // rippleColor: "--md-var-ripple-color",
  // rippleImage: "--md-var-ripple-image",
  // rippleOpacity: "--md-var-ripple-opacity",
  stateLayerColor: "--md-var-state-layer-color",
  stateLayerImage: "--md-var-state-layer-image",
  stateLayerOpacity: "--md-var-state-layer-opacity",
  surfaceOverlayColor: "--md-var-surface-overlay-color",
  surfaceOverlayImage: "--md-var-surface-overlay-image",
  surfaceOverlayOpacity: "--md-var-surface-overlay-opacity",
  containerColor: "--md-var-container-color",
  containerImage: "--md-var-container-image",
  containerOpacity: "--md-var-container-opacity",

  // State
  stateContentOpacity: "--md-var-state-surface-overlay-opacity",
  stateStateLayerOpacity: "--md-var-state-state-layer-opacity",
  stateContainerOpacity: "--md-var-state-container-opacity",

  // Elevation
  elevationSurfaceTintOpacity: "--md-var-elevation-surface-tint-opacity",
  elevationBoxShadowUmbra: "--md-var-elevation-box-shadow-umbra",
  elevationBoxShadowPenumbra: "--md-var-elevation-box-shadow-penumbra",
};

const materialDesignPlugin = plugin.withOptions<Partial<MaterialDesignConfig>>(
  (opts) => {
    return ({ addBase, matchUtilities, theme, addUtilities }) => {
      // add base
      const { theme: md, mergedConfig: conf } = materialDesignTheme(opts);

      const color = { ...md.sys.color };
      delete (md.sys as any).color;

      const els = { ...md.sys.elevation };

      delete (md.sys as any).elevation;

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

      /**
       * Variable Defaults
       */
      addBase({
        "*, ::before, ::after": {
          // Material
          // [vars.rippleColor]: "transparent",
          // [vars.rippleImage]:
          //   "linear-gradient(0deg, transparent 0%, transparent 0%)",
          // [vars.rippleOpacity]: "0%",

          [vars.stateLayerColor]: "transparent",
          [vars.stateLayerImage]:
            "linear-gradient(0deg, transparent 0%, transparent 0%)",
          [vars.stateLayerOpacity]: "0%",

          [vars.surfaceOverlayColor]: "transparent",
          [vars.surfaceOverlayImage]:
            "linear-gradient(0deg, transparent 0%, transparent 0%)",
          [vars.surfaceOverlayOpacity]: "0%",

          [vars.containerColor]: "transparent",
          [vars.containerImage]:
            "linear-gradient(0deg, transparent 0%, transparent 0%)",
          [vars.containerOpacity]: "100%",

          // Elevation
          [vars.elevationSurfaceTintOpacity]: "0%",
          [vars.elevationBoxShadowUmbra]: "0 0 0 0",
          [vars.elevationBoxShadowPenumbra]: "0 0 0 0",

          // State
          [vars.stateContentOpacity]: "100%",
          [vars.stateStateLayerOpacity]: "0%",
          [vars.stateContainerOpacity]: "100%",
        },
      });

      addUtilities({
        ".material": {
          // /* Ripple Layer */
          // var(${vars.rippleImage}),
          // linear-gradient(0deg, var(${vars.rippleColor}) 0%, var(${vars.rippleColor}) 100%),
          backgroundImage: `
            /* State Layer */
            var(${vars.stateLayerImage}),
            linear-gradient(0deg, var(${vars.stateLayerColor}) 0%, var(${vars.stateLayerColor}) 100%),

            /* Surface Overlay */
            var(${vars.surfaceOverlayImage}),
            linear-gradient(0deg, var(${vars.surfaceOverlayColor}) 0%, var(${vars.surfaceOverlayColor}) 100%),

            /* Container */
            var(${vars.containerImage}),
            linear-gradient(0deg, var(${vars.containerColor}) 0%, var(${vars.containerColor}) 100%)
            `,
        },
      });

      const _states: Record<string, Record<string, string>> = {};

      for (const [key] of Object.entries(md.sys.state)) {
        const n = camelToKebabCase(key);
        _states[`.state-${n}`] = {
          [vars.stateStateLayerOpacity]: `var(--md-sys-state-${n}-state-layer-opacity)`,
          [vars.stateContentOpacity]: `var(--md-sys-state-${n}-content-opacity)`,
          [vars.stateContainerOpacity]: `var(--md-sys-state-${n}-container-opacity)`,
        };
      }

      addUtilities(_states);

      const _elevations: Record<string, Record<string, string>> = {};

      for (const [key] of Object.entries(conf.theme.elevation)) {
        const n = camelToKebabCase(key);
        _elevations[`.elevation-${n}`] = {
          [vars.elevationBoxShadowPenumbra]: `var(--md-sys-elevation-${n}-shadow-penumbra)`,
          [vars.elevationBoxShadowUmbra]: `var(--md-sys-elevation-${n}-shadow-umbra)`,
          [vars.elevationSurfaceTintOpacity]: `var(--md-sys-elevation-${n}-surface-tint-opacity)`,
        };
      }

      addUtilities(_elevations);

      matchUtilities(
        {
          // ripple: (value) => {
          //   return {
          //     [vars.rippleColor]: _toRgbWithOpacity(
          //       value,
          //       `var(${vars.rippleOpacity}, 1)`,
          //     ),
          //   };
          // },
          "state-layer": (value) => {
            return {
              [vars.stateLayerColor]: _toRgbWithOpacity(
                value,
                `var(${vars.stateLayerOpacity}, 1)`
              ),
            };
          },
          "surface-overlay": (value) => {
            return {
              [vars.surfaceOverlayColor]: _toRgbWithOpacity(
                value,
                `var(${vars.surfaceOverlayOpacity}, 1)`
              ),
            };
          },
          container: (value) => {
            return {
              [vars.containerColor]: _toRgbWithOpacity(
                value,
                `var(${vars.containerOpacity}, 1)`
              ),
            };
          },
        },
        {
          values: flattenColors(theme("colors")),
          type: ["color", "any"],
        }
      );

      matchUtilities(
        {
          // ripple: (value) => {
          //   return {
          //     [vars.rippleImage]: value,
          //   };
          // },
          "state-layer": (value) => {
            return {
              [vars.stateLayerImage]: value,
            };
          },
          "surface-overlay": (value) => {
            return {
              [vars.surfaceOverlayImage]: value,
            };
          },
          container: (value) => {
            return {
              [vars.containerImage]: value,
            };
          },
        },
        {
          values: theme("backgroundImage")!,
          type: ["image", "any"],
        }
      );

      matchUtilities(
        {
          // "ripple-opacity": (value) => {
          //   return {
          //     [vars.rippleOpacity]: value,
          //   };
          // },
          "state-layer-opacity": (value) => {
            return {
              [vars.stateLayerOpacity]: value,
            };
          },
          "surface-overlay-opacity": (value) => {
            return {
              [vars.surfaceOverlayOpacity]: value,
            };
          },
          "container-opacity": (value) => {
            return {
              [vars.containerOpacity]: value,
            };
          },
        },
        {
          values: theme("opacity")!,
          type: ["percentage", "any"],
        }
      );

      addBase({
        ":root": toCSSVariables(
          flattenProperties({
            md,
          })
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
          })
        ),
      });

      addBase({
        ":root": toCSSVariables(
          flattenProperties({
            md: {
              sys: {
                color: color[conf.defaultThemeMode],
              },
            },
          })
        ),
      });

      const themeMode = conf.themeMode;

      if (typeof themeMode === "string") {
        addBase({
          [themeMode.replace("<theme-mode>", "dark")]: toCSSVariables(
            flattenProperties({
              md: {
                sys: {
                  color: color.dark,
                },
              },
            })
          ),
        });
        addBase({
          [themeMode.replace("<theme-mode>", "light")]: toCSSVariables(
            flattenProperties({
              md: {
                sys: {
                  color: color.light,
                },
              },
            })
          ),
        });
      } else {
        for (const mode of themeMode) {
          addBase({
            [mode.replace("<theme-mode>", "dark")]: toCSSVariables(
              flattenProperties({
                md: {
                  sys: {
                    color: color.dark,
                  },
                },
              })
            ),
          });
          addBase({
            [mode.replace("<theme-mode>", "light")]: toCSSVariables(
              flattenProperties({
                md: {
                  sys: {
                    color: color.light,
                  },
                },
              })
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

    // state
    opacity["state-content"] = `var(${vars.stateContentOpacity}, 1)`;
    opacity["state-layer"] = `var(${vars.stateStateLayerOpacity}, 0)`;
    opacity["state-container"] = `var(${vars.stateContainerOpacity}, 1)`;

    // elevation
    opacity[
      "elevation-surface-tint"
    ] = `var(${vars.elevationSurfaceTintOpacity}, 1)`;

    boxShadow["elevation"] = `
      var(${vars.elevationBoxShadowUmbra}, 0 0 0 0) var(--tw-shadow-color, rgb(var(--md-sys-color-black) / 30%)), 
      var(${vars.elevationBoxShadowPenumbra}, 0 0 0 0) var(--tw-shadow-color, rgb(var(--md-sys-color-black) / 15%))
    `;

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
  }
);

export default materialDesignPlugin;
