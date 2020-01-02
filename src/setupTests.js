module.exports = {
  "transform": {
    "^.+\\.(t|j)sx?$": "ts-jest"
  },
  "testRegex": "(/__tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!**/__tests/**.{ts,tsx}",
    "!src/serviceWorker.ts",
    "!**/stories/**",
    "!**/node_modules/**"
  ],
};