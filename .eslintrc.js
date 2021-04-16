module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },

  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2020,
  },
  rules: {
    // "max-len": ["error", { "code": 100 }],
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        semi: false,
        // tabWidth: 2,
        printWidth: 100,
      },
    ],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
