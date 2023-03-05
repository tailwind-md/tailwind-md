const materialDesign = require("./dist/index.cjs");

/** @type {import("./dist/index.cjs")} */
const opts = {};

module.exports = {
  content: ["./src/**/*.svelte"],
  theme: {},
  plugins: [
    materialDesign({
      theme: {
        color: {
          themeModeSwitchMethod: "data-attribute",
          seed: "#0070C9",
        },
      },
    }),
  ],
};
