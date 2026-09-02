import { defineConfig } from "@playwright/test";
import { config } from "./config/env";
const isCI = Boolean(process.env.CI);
function getWorkers(): number | string | undefined {
    const configuredWorkers = process.env.PW_WORKERS;
    if (!configuredWorkers) {
        return isCI ? 2 : undefined;
    }
    if (/^\d+%$/.test(configuredWorkers)) {
        return configuredWorkers;
    }
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
    testDir: "./tests",
    timeout: 90_000,
    fullyParallel: true,
    forbidOnly: isCI,
    retries: isCI ? 2 : 0,
    workers,
    reporter: isCI
        ? [
            [
                "blob",
                {
                    outputDir:
                        process.env.PLAYWRIGHT_BLOB_OUTPUT_DIR ||
                        "blob-report"
                }
            ],
            [
                "allure-playwright",
                {
                    resultsDir:
                        process.env.ALLURE_RESULTS_DIR ||
                        "allure-results"
                }
            ]
        ]
        : [
            ["html"],
            ["allure-playwright"]
        ],
    use: {
        baseURL: config.sauceDemoUrl,
        testIdAttribute: "data-test",
        ignoreHTTPSErrors: true,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        trace: "retain-on-failure"
    },
    projects: [
        {
            name: "Chromium",
            use: {
                browserName: "chromium"
            }
        },
        {
            name: "Firefox",
            use: {
                browserName: "firefox"
            }
        },
        {
            name: "WebKit",
            use: {
                browserName: "webkit"
            }
        }
    ]
});