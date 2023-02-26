import type {
  BaseColor,
  ReferencePalette as ReferencePalette,
  SystemColorScheme as SystemColorScheme,
  States,
  Typescale,
} from "$plugin/types";
import type { Shape } from "$plugin/types/shape";
import {
  createReferencePalette,
  createColorScheme,
  deepEqual,
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
      scheme: SystemColorScheme;
    };

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
      scheme: {},
      seedReferencePalette: {},
      custom: {},
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
        stateLayerOpacity: "12%",
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
    // TODO: add typescale
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
  emitReferenceClasses: false,
} satisfies Required<MaterialDesignConfig>;

type MaterialDesignTheme = {
  ref: { palette: ReferencePalette };
  sys: {
    color: SystemColorScheme;
    state: States;
    shape: Shape;
    typescale: Typescale;
  };
};

let _mdt: MaterialDesignTheme | undefined;
let _lastOpts: MaterialDesignConfig | undefined;

export function materialDesignTheme(
  opts: MaterialDesignConfig,
): MaterialDesignTheme {
  if (_mdt && deepEqual(_lastOpts, opts ?? {})) {
    return _mdt;
  }

  _lastOpts = opts;

  opts = deepMerge(
    materialDefaultOptions as Required<MaterialDesignConfig>,
    opts ?? {},
  );

  _mdt = deepMerge(
    {
      ref: {
        palette: createReferencePalette(opts.theme.color.seed),
      },
      sys: {
        color: createColorScheme(),
        state: opts.theme.state,
        shape: opts.theme.shape,
        typescale: opts.theme.typescale,
      },
    },
    {
      ref: {
        palette: createCustomReferencePalatte(
          opts.theme.color.seedReferencePalette ?? {},
        ),
      },
    },
    { sys: { color: objectHexToRGBSpaceSeparated(opts.theme.color.scheme) } },
    { ...createCustomColors(opts.theme.color.custom) },
  ) as unknown as MaterialDesignTheme;

  return _mdt;
}
