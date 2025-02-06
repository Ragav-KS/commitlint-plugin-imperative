/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  bracketSameLine: true,
  singleAttributePerLine: true,
  singleQuote: true,
  plugins: ["prettier-plugin-packagejson"],
};

export default config;
