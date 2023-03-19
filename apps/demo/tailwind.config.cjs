/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{tsx,jsx,svelte,ts,js,vue,html}", "./index.html"],
  darkMode: ["[data-theme-mode='dark']"],
  theme: {},
  plugins: [
    // @ts-ignore
    require("@tailwind-md/plugin")({
      themeMode: "[data-theme-mode='<theme-mode>']",
      theme: {
        color: {
          seed: "#088F8F",
        },
      },
    }),
  ],
};
