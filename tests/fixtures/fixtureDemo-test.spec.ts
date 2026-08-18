import { expect } from "@playwright/test";
import { test } from "../../fixtures/fixture";
import { AllureHelper } from "../../utils/AllureHelper";
import { config } from "../../config/env";
import { testData } from "../../utils/appConstants";
import users from "../../testdata/users.json";
import { Severity } from "allure-js-commons";
test.describe("Playwright Fixture Demo", () => {
    // ==========================================
    // Feature 1 - Built-in Fixture
    // ==========================================
    test(
        "Built-in Page Fixture",
        async ({ page }) => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Playwright Fixture",
                story: "Built-in Page Fixture",
                severity: Severity.CRITICAL
            });
            // ==========================================
            // Navigate
            // ==========================================
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
            // ==========================================
            // Verify Page Title
            // ==========================================
            await AllureHelper.step(
                "Verify Home Page Title",
                async () => {
                    await expect(page).toHaveTitle(/Swag Labs/);
                }
            );
        }
    );
    // ==========================================
    // Feature 2 - Custom Fixture
    // ==========================================
    test(
        "Custom Fixture",
        async ({ loginPage }) => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Playwright Fixture",
                story: "Custom Fixture",
                severity: Severity.CRITICAL
            });
            // ==========================================
            // Login
            // ==========================================
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
    // ==========================================
    // Feature 3 - test.extend()
    // ==========================================
    test(
        "test.extend Demo",
        async ({ loginPage }) => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Playwright Fixture",
                story: "test.extend Demo",
                severity: Severity.CRITICAL
            });
            // ==========================================
            // Login
            // ==========================================
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
    // ==========================================
    // Feature 4 - use()
    // ==========================================
    test(
        "use() Demo",
        async ({ loginPage }) => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Playwright Fixture",
                story: "use() Demo",
                severity: Severity.CRITICAL
            });
            // ==========================================
            // Login
            // ==========================================
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
    // ==========================================
    // Feature 5 - Fixture Dependency
    // ==========================================
    test(
        "Fixture Dependency",
        async ({ inventoryPage }) => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Playwright Fixture",
                story: "Fixture Dependency",
                severity: Severity.CRITICAL
            });
            // ==========================================
            // Verify Product
            // ==========================================
            await AllureHelper.step(
                "Verify Product Visibility",
                async () => {
                    await inventoryPage.verifyProductVisible(
                        testData.product1
                    );
                }
            );
        }
    );
});