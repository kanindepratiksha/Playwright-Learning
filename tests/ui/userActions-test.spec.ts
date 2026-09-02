import { test } from "../hooks/reporting/uiAllureHooks";
import { expect } from "@playwright/test";
import { AllureHelper } from "../../utils/AllureHelper";
import { config } from "../../config/env";
import { testData } from "../../utils/appConstants";
import users from "../../testdata/users.json";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";
import { Severity } from "allure-js-commons";
test(
    "UI Actions Demo",
    async ({ page }) => {
        // ==========================================
        // Allure Metadata
        // ==========================================
        await AllureHelper.metadata({
            feature: "UI Actions",
            story: "Verify UI Actions",
            severity: Severity.CRITICAL
        });
        // ==========================================
        // Page Objects
        // ==========================================
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
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
        // Product Actions
        // ==========================================
        await inventoryPage.hoverFirstProduct();
        await inventoryPage.addProduct(
            testData.product1
        );
        // ==========================================
        // Verify Cart Count
        // ==========================================
        await expect(
            inventoryPage.cartBadgeLocator
        ).toHaveText("1");
        // ==========================================
        // Open Cart
        // ==========================================
        await inventoryPage.openCart();
        // ==========================================
        // Cart Actions
        // ==========================================
        // Verify Cart page
        await expect(
            cartPage.title
        ).toHaveText("Your Cart");
        await expect(
            cartPage.title
        ).toBeVisible();
        // Verify product is present
        await expect(
            cartPage.getProduct(
                testData.product1
            )
        ).toBeVisible();
        // Verify exactly one cart item
        await expect(
            cartPage.items
        ).toHaveCount(1);
        // Remove product
        await cartPage.removeProduct(
            testData.product1
        );
        // ==========================================
        // Verify Cart Is Empty
        // ==========================================
        await expect(
            cartPage.items
        ).toHaveCount(0);
        // Cart badge should disappear
        await expect(
            cartPage.badge
        ).not.toBeVisible();
        // ==========================================
        // Browser Navigation
        // ==========================================
        await inventoryPage.goBack();
        // Verify Products page after Back
        await expect(
            inventoryPage.title
        ).toHaveText("Products");
        await expect(
            inventoryPage.inventory
        ).toBeVisible();
        // ==========================================
        // Reload Page
        // ==========================================
        await inventoryPage.reloadPage();
        // Verify Products page after Reload
        await expect(
            inventoryPage.title
        ).toHaveText("Products");
        await expect(
            inventoryPage.inventory
        ).toBeVisible();
    }
);