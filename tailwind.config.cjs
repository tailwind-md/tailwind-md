const material3 = require("./dist/index.cjs");

module.exports = {
  content: ["./src/**/*.svelte"],
  theme: {
    extend: {},
  },
  plugins: [
    material3({
      theme: {
        color: {
          seed: "#0070C9",
        },
      },
    }),
  ],
};
