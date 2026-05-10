import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:4173';
const includeCrossBrowserSmoke = process.env.CI === 'true' || process.env.PW_CROSS_BROWSER_SMOKE === '1';
const webServer =
  process.env.PLAYWRIGHT_SKIP_WEBSERVER === '1'
    ? null
    : {
        command: 'pnpm dev --host 127.0.0.1 --port 4173',
        url: 'http://127.0.0.1:4173',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      };

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  timeout: 60_000,
  expect: {
    timeout: 8_000,
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
      maxDiffPixelRatio: 0.02,
      threshold: 0.2,
    },
  },
  reporter: process.env.CI
    ? [
        ['github'],
        ['junit', { outputFile: 'playwright-report/results.xml' }],
        ['blob', { outputDir: 'playwright-report/blob' }],
      ]
    : [['html', { outputFolder: 'playwright-report/html', open: 'never' }], ['list']],
  use: {
    baseURL,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  outputDir: 'test-results',
  ...(webServer ? { webServer } : {}),
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    ...(includeCrossBrowserSmoke
      ? [
          {
            name: 'firefox-smoke',
            use: {
              ...devices['Desktop Firefox'],
            },
            testMatch: /tests\/smoke\/.*\.spec\.ts/,
          },
          {
            name: 'webkit-smoke',
            use: {
              ...devices['Desktop Safari'],
            },
            testMatch: /tests\/smoke\/.*\.spec\.ts/,
          },
        ]
      : []),
  ],
});
