import { expect } from "@playwright/test";
import { test } from "../../fixtures/fixture";
import { AllureHelper } from "../../utils/AllureHelper";
import { config } from "../../config/env";
import { testData } from "../../utils/appConstants";
import users from "../../testdata/users.json";
import { Severity } from "allure-js-commons";
test.describe("Playwright Fixture Demo", () => {
    test(
        "Built-in Page Fixture",
        async ({ page }) => {
            await AllureHelper.metadata({
                feature: "Playwright Fixture",
                story: "Built-in Page Fixture",
                severity: Severity.CRITICAL
            });
            await AllureHelper.step(
                "Navigate to SauceDemo",
                async () => {
                    await page.goto(
                        config.sauceDemoUrl,
                        {
                            waitUntil: "commit"
                        }
                    );
                    await page.waitForLoadState("networkidle");
                }
            );
            await AllureHelper.step(
                "Verify Home Page Title",
                async () => {
                    await expect(page).toHaveTitle(/Swag Labs/);
                }
            );
        }
    );
    test(
        "Custom Fixture",
        async ({ loginPage }) => {
            await AllureHelper.metadata({
                feature: "Playwright Fixture",
                story: "Custom Fixture",
                severity: Severity.CRITICAL
            });
            await AllureHelper.step(
                "Login using Custom Fixture",
                async () => {
                    await loginPage.login(
                        users[0].username,
                        users[0].password
                    );
                }
            );
        }
    );
    test(
        "test.extend Demo",
        async ({ loginPage }) => {
            await AllureHelper.metadata({
                feature: "Playwright Fixture",
                story: "test.extend Demo",
                severity: Severity.CRITICAL
            });
            await AllureHelper.step(
                "Login using Extended Fixture",
                async () => {
                    await loginPage.login(
                        users[0].username,
                        users[0].password
                    );
                }
            );
        }
    );
    test(
        "use() Demo",
        async ({ loginPage }) => {
            await AllureHelper.metadata({
                feature: "Playwright Fixture",
                story: "use() Demo",
                severity: Severity.CRITICAL
            });
            await AllureHelper.step(
                "Login using use() Fixture",
                async () => {
                    await loginPage.login(
                        users[0].username,
                        users[0].password
                    );
                }
            );
        }
    );
    test(
        "Fixture Dependency",
        async ({ inventoryPage }) => {
            await AllureHelper.metadata({
                feature: "Playwright Fixture",
                story: "Fixture Dependency",
                severity: Severity.CRITICAL
            });
            await AllureHelper.step(
                "Verify Product Visibility",
                async () => {
                    await expect(inventoryPage.getProductText(testData.product1)).toBeVisible();
                }
            );
        }
    );
});