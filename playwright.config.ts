import { defineConfig } from '@playwright/test';
const isCI = !!process.env.CI;
function getWorkers(): number | string | undefined {
  const configuredWorkers = process.env.PW_WORKERS;
  // Default configuration
  if (!configuredWorkers) {
    return isCI ? 2 : undefined;
  }
  // Allow percentage values such as "50%"
  if (/^\d+%$/.test(configuredWorkers)) {
    return configuredWorkers;
  }
  // Allow numeric values such as "1", "2", "4"
  const workers = Number(configuredWorkers);
  if (!Number.isInteger(workers) || workers < 1) {
    throw new Error(
      `Invalid PW_WORKERS value: ${configuredWorkers}. ` +
        `Use a positive number such as 1, 2, or 4.`
    );
  }
  return workers;
}
const workers = getWorkers();
export default defineConfig({
  testDir: './tests',
  timeout: 90_000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: isCI ? 2 : 0,
  /* Configurable workers */
  workers,
  /* Reporters */
  reporter: isCI
    ? [
        [
          'blob',
          {
            outputDir:
              process.env.PLAYWRIGHT_BLOB_OUTPUT_DIR || 'blob-report',
          },
        ],
        [
          'allure-playwright',
          {
            resultsDir:
              process.env.ALLURE_RESULTS_DIR || 'allure-results',
          },
        ],
      ]
    : [
        ['html'],
        ['allure-playwright'],
      ],
  /* Shared settings for all browser projects */
  use: {
    ignoreHTTPSErrors: true,
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
    /* Video on failure */
    video: 'retain-on-failure',
    /* Trace on failure/retry */
    trace: 'retain-on-failure',
  },
  /*
   * Cross-browser Playwright projects
   *
   * Environment is controlled independently using TEST_ENV.
   *
   * Examples:
   * TEST_ENV=qa + Chromium
   * TEST_ENV=qa + Firefox
   * TEST_ENV=qa + WebKit
   */
  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
      },
    },
    {
      name: 'Firefox',
      use: {
        browserName: 'firefox',
      },
    },
    {
      name: 'WebKit',
      use: {
        browserName: 'webkit',
      },
    },
  ],
  /* Run local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});