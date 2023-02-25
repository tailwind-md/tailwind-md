import plugin from "tailwindcss/plugin";
import type {
  BaseColors,
  BaseReferencePalette,
  BaseSystemColors,
} from "./types";
import {
  corePaletteToReferencePalette,
  createSystemColors,
  deepEqual,
  deepMerge,
  flattenProperties,
  objectHexToRGBSpaceSeparated,
  toClassNames,
  toCSSVariables,
  toTailwindColorsWithAlpha,
} from "./utils";
import { argbFromHex, CorePalette } from "./material-color";
import type {
  RecursiveKeyValuePair,
  ResolvableTo,
} from "tailwindcss/types/config";

export type Material3Options = {
  systemColors?: Partial<BaseSystemColors>;

  seedReferencePalette?: { extended?: Record<string, string> } & Partial<
    Record<BaseColors, string>
  >;

  seedKeyColor?: string;
  emitReferenceClasses?: boolean;
};

const defaultOptions: Required<Material3Options> = {
  seedKeyColor: "#6750a4",
  systemColors: {},
  seedReferencePalette: {},
  emitReferenceClasses: false,
};

type Material3Theme = {
  ref: { palette: BaseReferencePalette };
  sys: { color: BaseSystemColors };
};

let _m3t: Material3Theme | undefined;
let _lastOpts: Material3Options | undefined;

function m3Theme(opts: Material3Options): Material3Theme {
  if (_m3t && deepEqual(_lastOpts, opts ?? {})) {
    return _m3t;
  }

  _lastOpts = opts;

  opts = deepMerge(defaultOptions, opts ?? {});
  const corePalette = CorePalette.of(argbFromHex(opts.seedKeyColor));

  _m3t = deepMerge(
    {
      ref: {
        palette: corePaletteToReferencePalette(corePalette),
      },
      sys: {
        color: createSystemColors(),
      },
    },
    { sys: { color: objectHexToRGBSpaceSeparated(opts.systemColors) } },
  ) as unknown as Material3Theme;

  return _m3t;
}

const tailwindPlugin = plugin.withOptions<Partial<Material3Options>>(
  (opts) => {
    return ({ addBase }) => {
      // add base CSS variables
      const m3 = m3Theme(opts);

      addBase({
        "*": toCSSVariables(
          flattenProperties({
            m3: m3,
          }),
        ),
      });
    };
  },
  (opts) => {
    const m3 = m3Theme(opts);

    let colors: ResolvableTo<RecursiveKeyValuePair<string, string>> = {
      ...toTailwindColorsWithAlpha(
        toClassNames(m3.sys.color, "sys"),
        "sys-color",
      ),
    };

    if (opts?.emitReferenceClasses) {
      colors = {
        ...colors,

        ...toTailwindColorsWithAlpha(
          toClassNames(m3.ref.palette, "ref"),
          "ref-palette",
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

export default tailwindPlugin;
