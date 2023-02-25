const material3 = require("./dist/index.cjs");

module.exports = {
  content: ["./src/**/*.svelte"],
  theme: {
    extend: {},
  },
  plugins: [material3({})],
};
