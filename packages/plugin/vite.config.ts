import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: { plugin: "./src/index.ts" },
        formats: ["es", "cjs"],
        name: "TailwindMaterialDesign",
        fileName: "index",
      },
      rollupOptions: {},
    },
    plugins: [dts(), tsConfigPaths()],
  };
});
