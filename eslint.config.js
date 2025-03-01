import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {ignores:[".react-router/*"]},
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "import/no-default-export": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "react/no-array-index-key": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-shadow": "off",
      "eslint-comments/require-description": "off",
      "react/function-component-definition": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
];
