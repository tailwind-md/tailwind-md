import type {
  BaseColor,
  ReferencePalette,
  SystemColorScheme,
  States,
  Typescale,
  Elevation,
  Shape,
} from "../types";
import {
  createReferencePalette,
  createColorScheme,
  // deepEqual,
  deepMerge,
  objectHexToRGBSpaceSeparated,
  createCustomReferencePalatte,
  createCustomColors,
  type DeepPartial,
} from "../utils";

export type MaterialDesignConfig<CustomColors extends string = string> =
  DeepPartial<{
    themeMode: string | string[];
    defaultThemeMode: "dark" | "light";
    theme: {
      color: {
        seed: string;
        seedReferencePalette: Record<BaseColor, string>;
        custom: Record<CustomColors, string>;
        scheme: { light: SystemColorScheme; dark: SystemColorScheme };
      };

      elevation: Elevation;

      state: States;

      shape: Shape;

      typescale: Typescale;
    };

    emitReferenceClasses?: boolean;
  }>;

export const materialDefaultOptions = {
  themeMode: ".<theme-mode>" as string | string[],
  defaultThemeMode: "light" as "dark" | "light",
  theme: {
    color: {
      seed: "#6750a4",
      scheme: { light: {}, dark: {} },
      seedReferencePalette: {},
      custom: {},
    } satisfies Required<Required<MaterialDesignConfig>["theme"]["color"]>,
    state: {
      hovered: {
        stateLayerOpacity: "8%",
      },
      focused: {
        stateLayerOpacity: "12%",
      },
      pressed: {
        stateLayerOpacity: "12%",
      },
      dragged: {
        stateLayerOpacity: "16%",
      },
      enabled: {},
      activated: {},
      selected: {},
      disabled: {
        contentOpacity: "38%",
        stateLayerOpacity: "0%",
        containerOpacity: "12%",
      },
    },
    elevation: {
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
// let _lastOpts: MaterialDesignConfig | undefined;
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

  // _lastOpts = opts;

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
          _lastMergedConfig.theme.color.seedReferencePalette ?? {}
        ),
      },
    },
    {
      sys: {
        color: {
          light: objectHexToRGBSpaceSeparated(
            _lastMergedConfig.theme.color.scheme.light
          ),
          dark: objectHexToRGBSpaceSeparated(
            _lastMergedConfig.theme.color.scheme.dark
          ),
        },
      },
    },
    { ...createCustomColors(_lastMergedConfig.theme.color.custom) }
  ) as unknown as MaterialDesignTheme;

  return { theme: _mdt, mergedConfig: _lastMergedConfig };
}
