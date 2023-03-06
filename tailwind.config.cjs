const materialDesign = require("./dist/index.cjs");

/** @type {import("./dist/index.cjs")} */
const opts = {};

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.svelte"],
  darkMode: ["[data-theme-mode='dark']"],
  theme: {},
  plugins: [
    materialDesign({
      themeMode: "[data-theme-mode='<theme-mode>']",
      theme: {
        color: {
          seed: "#088F8F",
        },
      },
    }),
  ],
};
