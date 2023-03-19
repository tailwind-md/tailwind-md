import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    server: {
      port: 3000,
    },
    plugins: [tsConfigPaths(), solid()],
  };
});
