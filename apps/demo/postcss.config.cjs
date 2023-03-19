module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  plugins: [
    // @ts-ignore
    require("postcss-import"),
    // @ts-ignore
    require("tailwindcss/nesting")(require("postcss-nesting")),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
