import { expect } from "@playwright/test";
import { test } from "../hooks/reporting/uiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { config } from "../../config/env";
import { testData } from "../../utils/appConstants";
import users from "../../testdata/users.json";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { HooksAdvancedPage } from "../../pages/hooks-advancedPage";
import { Severity } from "allure-js-commons";
const user = users[0];
test(
    "Locators Demo",
    async ({ page }) => {
        // ==========================================
        // Allure Metadata
        // ==========================================
        await AllureHelper.metadata({
            feature: "Locators",
            story: "Verify Playwright Locators",
            severity: Severity.CRITICAL
        });
        // ==========================================
        // Page Objects
        // ==========================================
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const hooksAdvancedPage = new HooksAdvancedPage(page);
        // ==========================================
        // Navigate
        // ==========================================
        await page.goto(config.sauceDemoUrl, {
            waitUntil: "commit"
        });
        await page.waitForLoadState("networkidle");
        // ==========================================
        // Login
        // ==========================================
        await loginPage.login(
            user.username,
            user.password
        );
        // ==========================================
        // Validate Login
        // ==========================================
        await expect(page).toHaveURL(/inventory/);
        await expect(
            inventoryPage.title
        ).toHaveText("Products");
        await expect(
            inventoryPage.inventory
        ).toBeVisible();
        await expect(
            inventoryPage.getProductText(testData.product1)
        ).toBeVisible();
        // ==========================================
        // Logout
        // ==========================================
        await hooksAdvancedPage.logout();
        // ==========================================
        // Validate Logout
        // ==========================================
        await hooksAdvancedPage.verifyLogout();
        await expect(
            loginPage.usernameField
        ).toBeVisible();
        await expect(
            loginPage.passwordField
        ).toBeVisible();
        await expect(
            loginPage.loginBtn
        ).toBeVisible();
    }
);