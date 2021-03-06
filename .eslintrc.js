module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "no-restricted-properties": "off",
    "guard-for-in": "warn",
    "no-labels": "warn",
    "@typescript-eslint/member-ordering": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "warn",
    "no-caller": "warn",
    "no-bitwise": "warn",
    "no-console": ["warn", { allow: ["log", "error", "info", "time", "timeEnd", "trace"] }],
    "no-multiple-empty-lines": "warn",
    "no-new-wrappers": "warn",
    "no-debugger": "warn",
    "no-redeclare": "warn",
    "no-empty": "warn",
    "no-eval": "warn",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "warn",
    "dot-notation": "off",
    "no-fallthrough": "warn",
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": "warn",
    "no-use-before-define": "off",
    radix: "off",
    "default-case": "warn",
    "comma-dangle": ["warn", "always-multiline"],
    eqeqeq: ["warn", "smart"],
    "@typescript-eslint/typedef": [
      "warn",
      {
        parameter: true,
        propertyDeclaration: true,
        arrayDestructuring: false,
        arrowParameter: false,
        memberVariableDeclaration: false,
        objectDestructuring: false,
        variableDeclaration: false,
      },
    ],
    "react/prop-types": "off",
  },
};
