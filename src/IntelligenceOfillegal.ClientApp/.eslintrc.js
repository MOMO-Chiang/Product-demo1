module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // set to 3, 5 (default), 6, 7 (2016), 8 (2017), 9 (2018), 10 (2019), 11 (2020), or 12 (2021) to specify the version of ECMAScript syntax you want to use.
    ecmaVersion: 2019,
    // set to "script" (default) or "module" if your code is in ECMAScript modules.
    sourceType: "module",
    // an object indicating which additional language features you'd like to use.
    ecmaFeatures: {
      jsx: true, // enable JSX
    },
  },
  settings: {
    react: {
      pragma: "React", // Pragma to use, default to "React"
      version: "detect", // React version. "detect" automatically picks the version you have installed.
    },
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    // eslint
    "newline-per-array-elements": 0,
    "array-element-newline": 0,

    // react
    "react/react-in-jsx-scope": 0,

    // typescript-eslint
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/no-empty-function": "warn",

    // prettier
    "prettier/prettier": ["warn", { printWidth: 110 }],
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ["*.ts", "*.tsx"],
      rules: {
        "react/default-props-match-prop-types": 0,
        "react/prop-types": 0, // 關閉 prop-types 檢查，直接用 typescript 取代
        "@typescript-eslint/explicit-module-boundary-types": "warn",
      },
    },
  ],
};
