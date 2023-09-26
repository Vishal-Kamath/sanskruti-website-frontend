module.exports = {
  plugins: [
    require("postcss-color-rgba-fallback"),
    require("postcss-opacity"),
    require("postcss-pseudoelements"),
    require("postcss-import"),
    require("flex-gap-polyfill"),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
