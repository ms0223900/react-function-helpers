module.exports = {
    parser: '@typescript-eslint/parser',
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "modules": true
        },
        // "project": "./tsconfig.json"
    },
    plugins: ['import', '@typescript-eslint'],
    "settings": {
        "import/resolver": {
          "node": {
            "path": ["src"]
            // "moduleDirectory": ["node_modules", "src/"]
          }
        }
      },
    "rules": {
        "@typescript-eslint/indent": [
            "warn",
            2
          ],
          "semi": [
            "warn",
            "always"
          ],
    }
};