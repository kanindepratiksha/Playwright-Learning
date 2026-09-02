import { test } from "../hooks/reporting/uiAllureHooks";
import { expect } from "@playwright/test";
import { AllureHelper } from "../../utils/AllureHelper";
import { config } from "../../config/env";
import { testData } from "../../utils/appConstants";
import users from "../../testdata/users.json";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { Severity } from "allure-js-commons";
test(
    "Verify Product Sorting Using Dropdown Options",
    async ({ page }) => {
        // ==========================================
        // Allure Metadata
        // ==========================================
        await AllureHelper.metadata({
            feature: "Dropdown",
            story: "Verify Product Sorting Using Dropdown Options",
            severity: Severity.CRITICAL
        });
        // ==========================================
        // Page Objects
        // ==========================================
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        // ==========================================
        // Test Data
        // ==========================================
        const user = users[0];
        // ==========================================
        // Navigate
        // ==========================================
        await page.goto(
            config.sauceDemoUrl,
            {
                waitUntil: "commit"
            }
        );
        await page.waitForLoadState("networkidle");
        // ==========================================
        // Login
        // ==========================================
        await loginPage.login(
            user.username,
            user.password
        );
        // ==========================================
        // Verify Login
        // ==========================================
        await expect(
            page
        ).toHaveURL(/inventory/);
        await expect(
            inventoryPage.title
        ).toHaveText("Products");
        await expect(
            inventoryPage.inventory
        ).toBeVisible();
        // ==========================================
        // Sort A-Z
        // ==========================================
        await inventoryPage.sortProducts("az");
        await expect(
            inventoryPage.sortDropdownLocator
        ).toHaveValue("az");
        await expect(
            inventoryPage.firstProductLocator
        ).toHaveText(
            testData.productNameAZ
        );
        // ==========================================
        // Sort Z-A
        // ==========================================
        await inventoryPage.sortProducts("za");
        await expect(
            inventoryPage.sortDropdownLocator
        ).toHaveValue("za");
        await expect(
            inventoryPage.firstProductLocator
        ).toHaveText(
            testData.productNameZA
        );
        // ==========================================
        // Sort Price Low to High
        // ==========================================
        await inventoryPage.sortProducts("lohi");
        await expect(
            inventoryPage.sortDropdownLocator
        ).toHaveValue("lohi");
        await expect(
            inventoryPage.firstPriceLocator
        ).toHaveText(
            testData.lowPrice
        );
        // ==========================================
        // Sort Price High to Low
        // ==========================================
        await inventoryPage.sortProducts("hilo");
        await expect(
            inventoryPage.sortDropdownLocator
        ).toHaveValue("hilo");
        await expect(
            inventoryPage.firstProductLocator
        ).toHaveText(
            testData.highPriceProduct
        );
        await expect(
            inventoryPage.firstPriceLocator
        ).toHaveText(
            testData.highPrice
        );
    }
);