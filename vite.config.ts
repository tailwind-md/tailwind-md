import { defineConfig, PluginOption } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import viteTSConfigPaths from "vite-tsconfig-paths";
import vitePluginDTS from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins: PluginOption[] = [viteTSConfigPaths(), vitePluginDTS()];

  if (mode === "development") {
    plugins.push(svelte());
  }

  return {
    build: {
      lib: {
        entry: "./src/index.ts",
        formats: ["es", "cjs"],
        name: "TailwindMaterial3",
        fileName: "index",
      },
      rollupOptions: {},
    },
    plugins,
  };
});
