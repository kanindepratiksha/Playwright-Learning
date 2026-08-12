import { test as base } from "@playwright/test";
import * as allure from "allure-js-commons";
export const test = base;
test.beforeEach(async () => {
    await allure.owner("Pratiksha");
    await allure.epic("Playwright Automation Framework");
});
test.afterEach(async ({ page, browserName }, testInfo) => {
    await allure.attachment(
        "Browser",
        browserName,
        "text/plain"
    );
    await allure.attachment(
        "Current URL",
        page.url(),
        "text/plain"
    );
    await allure.attachment(
        "Execution Status",
        testInfo.status ?? "Unknown",
        "text/plain"
    );
    await allure.attachment(
        "Execution Time",
        `${testInfo.duration} ms`,
        "text/plain"
    );
    if (testInfo.status !== testInfo.expectedStatus) {
        const screenshot = await page.screenshot({
            fullPage: true
        });
        await allure.attachment(
            "Failure Screenshot",
            screenshot,
            "image/png"
        );
    }
});