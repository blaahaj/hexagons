import js from "@eslint/js";
import tsEslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import nodePlugin from "eslint-plugin-n";
import globals from "globals";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import unusedImports from "eslint-plugin-unused-imports";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default tsEslint.config(
  {
    ignores: [
      "dist/*",
      "eslint.config.mjs",
      "public/js/main.js",
      "public/windfall.js",
    ],
  },
  js.configs.recommended,

  // Rules enabled by this config in addition to recommended: https://typescript-eslint.io/rules/?=xrecommended-strict
  // Replace this with ...tsEslint.configs.recommendedTypeChecked, if you want to include recommended rules only
  ...tsEslint.configs.strictTypeChecked,

  // Rules enabled by this config: https://typescript-eslint.io/rules/?=stylistic
  // Remove this if you don't want to include stylistic rules
  ...tsEslint.configs.stylisticTypeChecked,

  prettier,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.nodeBuiltin,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
  nodePlugin.configs["flat/recommended"],
  {
    rules: {
      "n/no-missing-import": "off",
      "n/prefer-node-protocol": "error",
      "@typescript-eslint/no-non-null-assertion": "off", // forbid foo!.bar
      "@typescript-eslint/restrict-template-expressions": "off", // forbid `${a_number}`
    },
  },
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
    },
  },
  {
    files: ["**/*.mjs", "**/*.cjs", "**/*.js"],
    ...tsEslint.configs.disableTypeChecked,
  }
);
