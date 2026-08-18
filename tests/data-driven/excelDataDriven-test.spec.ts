import { expect } from "@playwright/test";
import { test } from "../hooks/reporting/uiAllureHooks";
import { LoginPage } from "../../pages/LoginPage";
import { config } from "../../config/env";
import { TestDataFactory } from "../../utils/TestDataFactory";
import { DataValidator } from "../../utils/DataValidator";
import { ExcelUser, LoginUser } from "../../utils/types";
import { AllureHelper } from "../../utils/AllureHelper";
import { Severity } from "allure-js-commons";
const users = TestDataFactory.getExcelUsers();
const normalizedUsers: LoginUser[] = users.map(
    (user: ExcelUser) => ({
        username: user.Username,
        password: user.Password,
        expected: user.Expected
    })
);
DataValidator.validateUsers(normalizedUsers);
normalizedUsers.forEach((user: LoginUser) => {
    test(
        `Login with ${user.username}`,
        async ({ page }) => {
            await AllureHelper.metadata({
                feature: "Authentication",
                story: "Login using Excel Test Data",
                severity: Severity.CRITICAL
            });
            const loginPage = new LoginPage(page);
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
                `Login with ${user.username}`,
                async () => {
                    if (user.expected.toLowerCase() === "success") {
                        await loginPage.login(
                            user.username,
                            user.password
                        );
                        await expect(page).toHaveURL(/inventory/);
                    } else {
                        await loginPage.login(
                            user.username,
                            user.password,
                            false
                        );
                        await loginPage.verifyErrorMessage(
                            "Epic sadface: Sorry, this user has been locked out."
                        );
                    }
                }
            );
        }
    );
});