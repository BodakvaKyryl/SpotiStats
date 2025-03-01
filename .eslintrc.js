const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use a library
 * that utilizes React.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
    require.resolve("@vercel/style-guide/eslint/react"),
  ],
  globals: {
    JSX: true,
  },
  parserOptions: {
    project,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ["node_modules/", ".react-router/", ".eslintrc.js", "**/*.css"],
  rules: {
    "import/no-default-export": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "react/no-array-index-key": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/no-shadow": "off",
    "eslint-comments/require-description": "off",
    "react/function-component-definition": "off",
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        controlComponents: ["BaseInput"],
        depth: 3,
      },
    ],
  },
};
