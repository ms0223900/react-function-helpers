module.exports = {
  "verbose": true,
  "setupFilesAfterEnv": ["<rootDir>setupTests.js"],
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "testEnvironment": "node",
  "moduleDirectories": [
    "node_modules",
    "src"
  ],
  "transform": {
    "^.+\\.(t|j)sx?$": "ts-jest"
  },
  "testRegex": "(/__tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"],
  "collectCoverageFrom": [
    "src/**/*.{ts,tsx}",
    "!**/__tests/**.{ts,tsx}",
    "!src/serviceWorker.ts",
    "!**/stories/**",
    "!**/node_modules/**"
  ]
};