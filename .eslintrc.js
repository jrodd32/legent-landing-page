module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2017,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      experimentalDecorators: true
    },
  },
  env: {
    browser: true,
    es6: true
  },
  settings: {
    ecmascript: 6
  },
  extends: [
    "plugin:vue/recommended",
    "airbnb-base"
  ],
  plugins: [
    "vue-a11y"
  ],
  rules: {
    semi: 2,
    indent: 0,
    "comma-dangle": ["error", "never"],
    "max-len": 0,
    "no-console": ["error", { allow: ["error"]}],
    "no-plusplus": 0,
    "no-minusminus": 0,
    "no-param-reassign": 0,
    "no-restricted-globals": 0,
    "no-shadow": 0,
    "no-underscore-dangle": 0,
    "vue/html-self-closing": ["error", {
      "html": {
        "normal": "any",
        "void": "always"
      },
    }]
  }
};
