import { defineConfig, devices } from '@playwright/test';
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
  retries: process.env.CI ? 2 : 0,
  /* Configurable workers */
  workers,
  /* Reporter to use */
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
  /* Shared settings for all the projects below */
  use: {
    ignoreHTTPSErrors: true,
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
    /* Video on failure */
    video: 'retain-on-failure',
    /* Trace on failure/retry */
    trace: 'retain-on-failure',
  },
  /* Configure projects for DEV / QA / UAT */
  projects: [
    {
      name: 'DEV',
      use: {
        browserName: 'chromium',
      },
    },
    {
      name: 'QA',
      use: {
        browserName: 'chromium',
      },
    },
    {
      name: 'UAT',
      use: {
        browserName: 'chromium',
      },
    },
  ],
  /* Mobile projects can be added later */
  // {
  //   name: 'Mobile Chrome',
  //   use: { ...devices['Pixel 5'] },
  // },
  // {
  //   name: 'Mobile Safari',
  //   use: { ...devices['iPhone 12'] },
  // },
  /* Branded browsers can be added later */
  // {
  //   name: 'Microsoft Edge',
  //   use: {
  //     ...devices['Desktop Edge'],
  //     channel: 'msedge',
  //   },
  // },
  // {
  //   name: 'Google Chrome',
  //   use: {
  //     ...devices['Desktop Chrome'],
  //     channel: 'chrome',
  //   },
  // },
  /* Run local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});