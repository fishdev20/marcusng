import { FlatCompat } from "@eslint/eslintrc";
import prettierPlugin from "eslint-plugin-prettier";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    name: "prettier",
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // ✅ Tell Prettier to allow CRLF
      "prettier/prettier": [
        "error",
        {
          endOfLine: "crlf",
          semi: true,
          singleQuote: false,
          trailingComma: "all",
          printWidth: 100,
          tabWidth: 2,
          arrowParens: "always",
        },
      ],
    },
  },
];

export default eslintConfig;
