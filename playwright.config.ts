import { defineConfig } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: 'tests',

  testMatch: /.*\.spec\.ts/,

  fullyParallel: true,

  workers: process.env.CI ? 10 : 5,

  retries: 0,

  outputDir: 'artifacts/output',

  globalTimeout: 5 * 60 * 1000,

  timeout: 1 * 60 * 1000,

  expect: {
    timeout: 10_000
  },

  reporter: [
    [
      'html',
      { open: 'never', printSteps: true, outputFolder: path.join('artifacts/report'), includeProjectInTestName: false }
    ],
    ['list', { printSteps: false }]
  ],

  use: {
    navigationTimeout: 10_000,
    actionTimeout: 10_000,
    screenshot: { mode: 'only-on-failure', fullPage: true },
    trace: 'off',
    video: 'off',
    launchOptions: {
      args: ['--start-maximized']
    }
  },

  projects: [
    {
      name: 'testwright',
      use: {
        baseURL: 'https://www.saucedemo.com/',
        testIdAttribute: 'data-test',
        viewport: process.env.CI ? { width: 1520, height: 770 } : null,
        contextOptions: {
          ignoreHTTPSErrors: true
        }
      }
    }
  ]
});
