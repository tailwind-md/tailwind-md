const material3 = require("./dist/index.cjs");

module.exports = {
  content: ["./src/**/*.svelte"],
  theme: {},
  plugins: [
    material3({
      theme: {
        color: {
          themeModeSwitchMethod: "data-attribute",
          seed: "#0070C9",
        },
      },
    }),
  ],
};
