## Pre-requisites

1. Download & install the following:
   - [Node.js v222](https://nodejs.org/en/download)
   - [VS code](https://code.visualstudio.com/download)
2. Install the following extension within VS code:
   - ESLint
   - Prettier - Code formatter
3. Run the following commands from project root directory to install required packages.
   ```
   npx playwright install --with-deps chromium
   ```
   ```
   npm install
   ```

## Executing tests

1. Run the following npm script to execute the tests. See [package.json](package.json) for list of available scripts to run.

   ```
   npm run test
   ```

   For list of cli options, refer Playwright [docs](https://playwright.dev/docs/test-cli).

## Scribbles

https://restful-booker.herokuapp.com/apidoc/index.html
