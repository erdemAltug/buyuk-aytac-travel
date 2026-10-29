import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: ["**/*.mongodb.js"],
  },
  {
    // .eslintrc.json'daki kurallar düz yapılandırmada hiç uygulanmıyordu; burada birleştirildi.
    rules: {
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      // Türkçe metinlerdeki kesme işaretleri ("Türkiye'nin") JSX'te sorun değil
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
