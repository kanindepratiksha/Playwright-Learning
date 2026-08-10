import { test as base } from "@playwright/test";
import * as allure from "allure-js-commons";
export const test = base;
test.beforeEach(async () => {
    await allure.owner("Pratiksha");
    await allure.epic("Playwright Automation Framework");
    await allure.severity("normal");
});
test.afterEach(async ({}, testInfo) => {
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
});