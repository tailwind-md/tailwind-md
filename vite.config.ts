import { defineConfig, PluginOption } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import viteTSConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins: PluginOption[] = [viteTSConfigPaths()];

  if (mode === "development") {
    plugins.push(svelte());
  }

  return {
    build: {
      lib: {
        entry: "./src/plugin/index.ts",
        formats: ["es", "cjs"],
        name: "TailwindMaterial3",
        fileName: "index",
      },
      rollupOptions: {},
    },
    plugins,
  };
});
