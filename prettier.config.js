const prettierConfig = {
  trailingComma: 'none',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 120,
  useTabs: false
};

const ignorePatterns = [
  '*.md',
  'artifacts',
  'playwright.config.ts',
  'eslint.config.ts',
  'prettier.config.ts'
];

module.exports = {
  ...prettierConfig,
  ignorePatterns
};
