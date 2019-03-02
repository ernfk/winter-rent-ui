module.exports = {
  "extends": ["airbnb", "react-app"],
  "plugins": [
      "react",
      "jsx-a11y",
      "import"
  ],
  "rules": {
      "jsx-a11y/click-events-have-key-events": 0,
      "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}],
      "import/no-named-as-default": 0,
      "linebreak-style": 0,
      "no-multiple-empty-lines": ["error", {"max": 1, "maxEOF": 0}],
      "no-nested-ternary": 0,
  }
};