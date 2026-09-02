import { expect } from "@playwright/test";
import { test } from "../hooks/reporting/uiAllureHooks";
import { LoginPage } from "../../pages/LoginPage";
import { config } from "../../config/env";
import { TestDataFactory } from "../../utils/TestDataFactory";
import { DataValidator } from "../../utils/DataValidator";
import { ExcelUser, LoginUser } from "../../utils/types";
import { AllureHelper } from "../../utils/AllureHelper";
import { Severity } from "allure-js-commons";
// ==========================================
// Test Data
// ==========================================
const users = TestDataFactory.getExcelUsers();
const normalizedUsers: LoginUser[] = users.map(
    (user: ExcelUser): LoginUser => ({
        username: user.Username,
        password: user.Password,
        expected: user.Expected
    })
);
// ==========================================
// Validate Test Data
// ==========================================
DataValidator.validateUsers(normalizedUsers);
// ==========================================
// Data-Driven Login Tests
// ==========================================
normalizedUsers.forEach((user: LoginUser) => {
    test(
        `Login with ${user.username}`,
        async ({ page }) => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Authentication",
                story: "Login using Excel Test Data",
                severity: Severity.CRITICAL
            });
            const loginPage = new LoginPage(page);
            // ==========================================
            // Navigate to SauceDemo
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
                }
            );
            // ==========================================
            // Login
            // ==========================================
            await AllureHelper.step(
                `Login with ${user.username}`,
                async () => {
                    await loginPage.login(
                        user.username,
                        user.password
                    );
                    // ==========================================
                    // Verify Login Result
                    // ==========================================
                    if (
                        user.expected.toLowerCase() === "success"
                    ) {
                        await expect(page).toHaveURL(
                            /inventory/
                        );
                    } else {
                        await expect(
                            loginPage.errorMsg
                        ).toContainText(
                            "Epic sadface: Sorry, this user has been locked out."
                        );
                    }
                }
            );
        }
    );
});