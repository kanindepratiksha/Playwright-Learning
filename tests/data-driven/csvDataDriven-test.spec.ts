import { expect } from "@playwright/test";
import { test } from "../hooks/reporting/uiAllureHooks";
import { LoginPage } from "../../pages/LoginPage";
import { config } from "../../config/env";
import { TestDataFactory } from "../../utils/TestDataFactory";
import { DataValidator } from "../../utils/DataValidator";
import { AllureHelper } from "../../utils/AllureHelper";
let normalizedUsers: any[] = [];
test.beforeAll(async () => {
    const users = await TestDataFactory.getCsvUsers();
    normalizedUsers = users.map((user: any) => ({
        username: user.Username,
        password: user.Password,
        expected: user.Expected
    }));
    DataValidator.validateUsers(normalizedUsers);
});
test(
    "Login Tests from CSV",
    async ({ page }) => {
        await AllureHelper.metadata({
            feature: "Authentication",
            story: "Login using CSV Test Data",
            severity: "critical"
        });
        const loginPage = new LoginPage(page);
        for (const user of normalizedUsers) {
            await AllureHelper.step(
                `Login with ${user.username}`,
                async () => {
                    await page.goto(
                        config.sauceDemoUrl,
                        {
                            waitUntil: "commit"
                        }
                    );
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
    }
);