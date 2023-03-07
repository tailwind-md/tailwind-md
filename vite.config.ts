import { defineConfig, PluginOption } from "vite";
import tsConfigPathsPlugin from "vite-tsconfig-paths";
import dtsPlugin from "vite-plugin-dts";
import solidPlugin from "vite-plugin-solid";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins: PluginOption[] = [
    tsConfigPathsPlugin(),
    solidPlugin(),
    dtsPlugin(),
  ];

  return {
    server: {
      port: 3000,
    },
    build: {
      lib: {
        entry: { plugin: "./src/plugin/index.ts" },
        formats: ["es", "cjs"],
        name: "TailwindMaterialDesign",
        fileName: "index",
      },
      rollupOptions: {},
    },
    plugins,
  };
});
