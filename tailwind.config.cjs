const material3 = require("./dist/index.cjs");

module.exports = {
  content: ["./src/**/*.svelte"],
  theme: {
    extend: {},
  },
  plugins: [
    material3({
      color: {
        seed: "3E5BA9",
        seedReferencePalette: { primary: "#FFC0CB" },
        custom: { red: "#FF0000" },
      },
    }),
  ],
};
