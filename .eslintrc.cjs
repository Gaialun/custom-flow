module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', "simple-import-sort"],
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react/display-name": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/consistent-type-imports": ["error",
      {
        "prefer": "type-imports",
        "disallowTypeAnnotations": false
      }
    ],
    "simple-import-sort/imports": [
      "error",
      {
        "groups": [
          ["^@?\\w.*\\u0000$", "^[^.].*\\u0000$", "^\\..*\\u0000$"],
          ["^react", "^@?\\w", "^\\u0000"],
          ["^"],
          ["^\\."]
        ]
      }
    ],
    "simple-import-sort/exports": "error",
    "newline-per-chained-call": ["error", { "ignoreChainWithDepth": 3 }],
    "function-call-argument-newline": ["error", "consistent"],
    "semi": ["error", "never"],
    "no-undef": "off"
  },
}
