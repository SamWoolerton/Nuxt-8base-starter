module.exports = {
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/$1",
    "^@/(.*)$": "<rootDir>/$1",
    "^vue$": "vue/dist/vue.common.js"
  },
  moduleFileExtensions: ["js", "vue", "json"],
  testPathIgnorePatterns: ["test/integration"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    ".*\\.(vue)$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub"
  },
  snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"],
  transformIgnorePatterns: [
    "node_modules/(?!vue-router|@babel|vuetify|lodash-es)"
  ],
  collectCoverage: false,
  setupFiles: [
    "<rootDir>/test/unit/setup",
    "<rootDir>/.jest/register-context.js"
  ]
}
