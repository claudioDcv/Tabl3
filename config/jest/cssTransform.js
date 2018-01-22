"jest": {
  "collectCoverageFrom": [
    "src/**/*.{js,jsx}"
  ],
  "setupFiles": [
    "<rootDir>/config/polyfills.js",
    "jest-localstorage-mock"
  ],
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.js?(x)",
    "<rootDir>/src/**/?(*.)(spec|test).js?(x)"
  ],
  "testEnvironment": "jsdom",
  "testURL": "http://localhost",
  "transform": {
    "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"
  ],
  "moduleNameMapper": {
    "^react-native$": "react-native-web"
  }
},
"babel": {
  "presets": [
    "react-app"
  ]
},
"eslintConfig": {
  "extends": "react-app"
}
