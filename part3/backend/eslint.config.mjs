import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    ignores: ["node_modules", "dist", "mongo.js"],
    languageOptions: { sourceType: "commonjs" },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
];
