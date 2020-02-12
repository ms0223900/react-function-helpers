module.exports = {
  "testEnvironment": "jsdom",
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
  ],
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss)$": "identity-obj-proxy"
  }
};