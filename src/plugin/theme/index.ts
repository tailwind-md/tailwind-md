import type {
  BaseColor,
  ReferencePalette,
  SystemColorScheme,
  States,
  Typescale,
  Elevation,
  Shape,
} from "$plugin/types";
import {
  createReferencePalette,
  createColorScheme,
  // deepEqual,
  deepMerge,
  objectHexToRGBSpaceSeparated,
  createCustomReferencePalatte,
  createCustomColors,
  type DeepPartial,
} from "$plugin/utils";

export type MaterialDesignConfig = DeepPartial<{
  theme: {
    color: {
      seed: string;
      seedReferencePalette: Record<BaseColor, string>;
      custom: Record<string, string>;
      scheme: { light: SystemColorScheme; dark: SystemColorScheme };
      defaultThemeMode: "light" | "dark";
      generateThemeModes: ("light" | "dark")[];
      themeModeSwitchMethod: "class" | "data-attribute";
    };

    elevation: Elevation;

    state: States;

    shape: Shape;

    typescale: Typescale;
  };

  emitReferenceClasses?: boolean;
}>;

export const materialDefaultOptions = {
  theme: {
    color: {
      seed: "#6750a4",
      scheme: { light: {}, dark: {} },
      seedReferencePalette: {},
      custom: {},
      defaultThemeMode: "light",
      generateThemeModes: ["light", "dark"],
      themeModeSwitchMethod: "class",
    } satisfies Required<MaterialDesignConfig["theme"]["color"]>,
    state: {
      hovered: {
        contentOpacity: "100%",
        stateLayerOpacity: "8%",
        containerOpacity: "100%",
      },
      focused: {
        contentOpacity: "100%",
        stateLayerOpacity: "12%",
        containerOpacity: "100%",
      },
      enabled: {
        contentOpacity: "100%",
        stateLayerOpacity: "0%",
        containerOpacity: "100%",
      },
      activated: {
        contentOpacity: "100%",
        stateLayerOpacity: "0%",
        containerOpacity: "100%",
      },
      selected: {
        contentOpacity: "100%",
        stateLayerOpacity: "0%",
        containerOpacity: "100%",
      },
      pressed: {
        contentOpacity: "100%",
        stateLayerOpacity: "12%",
        containerOpacity: "100%",
      },
      dragged: {
        contentOpacity: "100%",
        stateLayerOpacity: "16%",
        containerOpacity: "100%",
      },
      disabled: {
        contentOpacity: "38%",
        stateLayerOpacity: "100%",
        containerOpacity: "12%",
      },
    },
    elevation: {
      // level0: {
      //   surfaceTintOpacity: "0%",
      //   umbra: "0px 0px 0px 0px rgb(var(--md-sys-color-black) / 30%)",
      //   penumbra: "0px 0px 0px 0px rgb(var(--md-sys-color-black) / 15%)",
      // },
      // level1: {
      //   surfaceTintOpacity: "5%",
      //   umbra: "0px 1px 2px 0px rgb(var(--md-sys-color-black) / 30%)",
      //   penumbra: "0px 1px 3px 1px rgb(var(--md-sys-color-black) / 15%)",
      // },
      // level2: {
      //   surfaceTintOpacity: "8%",
      //   umbra: "0px 1px 2px 0px rgb(var(--md-sys-color-black) / 30%)",
      //   penumbra: "0px 2px 6px 2px rgb(var(--md-sys-color-black) / 15%)",
      // },
      // level3: {
      //   surfaceTintOpacity: "11%",
      //   umbra: "0px 1px 3px 0px rgb(var(--md-sys-color-black) / 30%)",
      //   penumbra: "0px 4px 8px 3px rgb(var(--md-sys-color-black) / 15%)",
      // },
      // level4: {
      //   surfaceTintOpacity: "12%",
      //   umbra: "0px 2px 3px 0px rgb(var(--md-sys-color-black) / 30%)",
      //   penumbra: "0px 6px 10px 4px rgb(var(--md-sys-color-black) / 15%)",
      // },
      // level5: {
      //   surfaceTintOpacity: "14%",
      //   umbra: "0px 4px 4px 0px rgb(var(--md-sys-color-black) / 30%)",
      //   penumbra: "0px 8px 12px 6px rgb(var(--md-sys-color-black) / 15%)",
      // },
      level0: "0px",
      level1: "1px",
      level2: "3px",
      level3: "6px",
      level4: "8px",
      level5: "12px",
    },
    shape: {
      corner: {
        none: "0px",
        extraSmall: "4px",
        small: "8px",
        medium: "12px",
        large: "16px",
        extraLarge: "28px",
        full: "9999px",
      },
    },
    typescale: {
      displayLarge: {
        font: "Roboto",
        lineHeight: "4rem",
        size: "3.5625rem",
        tracking: "0rem",
        weight: "400",
      },
      displayMedium: {
        font: "Roboto",
        lineHeight: "3.25rem",
        size: "2.8125rem",
        tracking: "0rem",
        weight: "400",
      },
      displaySmall: {
        font: "Roboto",
        lineHeight: "2.75rem",
        size: "2.25rem",
        tracking: "0rem",
        weight: "400",
      },
      headlineLarge: {
        font: "Roboto",
        lineHeight: "2.5rem",
        size: "2rem",
        tracking: "0rem",
        weight: "400",
      },
      headlineMedium: {
        font: "Roboto",
        lineHeight: "2.25rem",
        size: "1.75rem",
        tracking: "0rem",
        weight: "400",
      },
      headlineSmall: {
        font: "Roboto",
        lineHeight: "2rem",
        size: "1.5rem",
        tracking: "0rem",
        weight: "400",
      },
      titleLarge: {
        font: "Roboto",
        lineHeight: "1.75rem",
        size: "1.375rem",
        tracking: "0rem",
        weight: "400",
      },
      titleMedium: {
        font: "Roboto",
        lineHeight: "1.5rem",
        size: "1rem",
        tracking: "0.009375rem",
        weight: "500",
      },
      titleSmall: {
        font: "Roboto",
        lineHeight: "1.25rem",
        size: "0.875rem",
        tracking: "0.00625rem",
        weight: "500",
      },
      labelLarge: {
        font: "Roboto",
        lineHeight: "1.25rem",
        size: "14px",
        tracking: "0.00625rem",
        weight: "500",
      },
      labelMedium: {
        font: "Roboto",
        lineHeight: "1rem",
        size: "0.75rem",
        tracking: "0.03125rem",
        weight: "500",
      },
      labelSmall: {
        font: "Roboto",
        lineHeight: "1rem",
        size: "0.6875rem",
        tracking: "0.03125rem",
        weight: "500",
      },
      bodyLarge: {
        font: "Roboto",
        lineHeight: "1.5rem",
        size: "1rem",
        tracking: "0.03125rem",
        weight: "400",
      },
      bodyMedium: {
        font: "Roboto",
        lineHeight: "1.25rem",
        size: "0.875rem",
        tracking: "0.015625rem",
        weight: "400",
      },
      bodySmall: {
        font: "Roboto",
        lineHeight: "1rem",
        size: "0.75rem",
        tracking: "0.025rem",
        weight: "400",
      },
    },
  },
  emitReferenceClasses: false as boolean,
} satisfies Required<MaterialDesignConfig>;

type MaterialDesignTheme = {
  ref: { palette: ReferencePalette };
  sys: {
    color: { light: SystemColorScheme; dark: SystemColorScheme };
    state: States;
    shape: Shape;
    elevation: Elevation;
    typescale: Typescale;
  };
};

type MergedConfig = typeof materialDefaultOptions;

let _mdt: MaterialDesignTheme | undefined;
let _lastOpts: MaterialDesignConfig | undefined;
let _lastMergedConfig: MergedConfig | undefined;

export function materialDesignTheme(opts: MaterialDesignConfig): {
  theme: MaterialDesignTheme;
  mergedConfig: MergedConfig;
} {
  // TODO: This is not working as expected. Need to figure out why.
  // Some properties are becoming null after the first time this is called.
  //
  // if (_mdt && deepEqual(_lastOpts, opts)) {
  //   return { theme: _mdt, mergedConfig: _lastMergedConfig };
  // }

  _lastOpts = opts;

  _lastMergedConfig = deepMerge(materialDefaultOptions, opts);

  _mdt = deepMerge(
    {
      ref: {
        palette: createReferencePalette(_lastMergedConfig.theme.color.seed),
      },
      sys: {
        color: {
          light: createColorScheme("light"),
          dark: createColorScheme("dark"),
        },
        state: _lastMergedConfig.theme.state,
        shape: _lastMergedConfig.theme.shape,
        typescale: _lastMergedConfig.theme.typescale,
        elevation: _lastMergedConfig.theme.elevation,
      },
    },
    {
      ref: {
        palette: createCustomReferencePalatte(
          _lastMergedConfig.theme.color.seedReferencePalette ?? {},
        ),
      },
    },
    {
      sys: {
        color: {
          light: objectHexToRGBSpaceSeparated(
            _lastMergedConfig.theme.color.scheme.light,
          ),
          dark: objectHexToRGBSpaceSeparated(
            _lastMergedConfig.theme.color.scheme.dark,
          ),
        },
      },
    },
    { ...createCustomColors(_lastMergedConfig.theme.color.custom) },
  ) as unknown as MaterialDesignTheme;

  return { theme: _mdt, mergedConfig: _lastMergedConfig };
}
