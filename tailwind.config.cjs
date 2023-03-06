const materialDesign = require("./dist/index.cjs");

/** @type {import("./dist/index.cjs")} */
const opts = {};

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.svelte"],
  theme: {},
  plugins: [
    materialDesign({
      theme: {
        color: {
          themeModeSwitchMethod: "data-attribute",
          seed: "#088F8F",
        },
      },
    }),
  ],
};
