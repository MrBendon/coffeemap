module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "prettier",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.ts", "tailwind.config.js", "postcss.config.js"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "import/no-extraneous-dependencies": "off",
    "import/no-named-as-default": "off",
    "no-param-reassign": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
};
