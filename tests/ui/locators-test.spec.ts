import { expect } from "@playwright/test";
import { test } from "../hooks/reporting/uiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { config } from "../../config/env";
import { testData } from "../../utils/appConstants";
import users from "../../testdata/users.json";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { HooksAdvancedPage } from "../../pages/hooks-advancedPage";
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
            severity: "critical"
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
        await inventoryPage.verifyPageTitle();
        await inventoryPage.verifyInventoryList();
        await inventoryPage.verifyProductVisible(
            testData.product1
        );
        // ==========================================
        // Logout
        // ==========================================
        await hooksAdvancedPage.logout();
        // ==========================================
        // Validate Logout
        // ==========================================
        await hooksAdvancedPage.verifyLogout();
        await loginPage.verifyLoginPage();
    }
);