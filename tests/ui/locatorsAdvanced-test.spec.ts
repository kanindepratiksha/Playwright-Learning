import { test, expect } from "@playwright/test";
import { AllureHelper } from "../../utils/AllureHelper";
import { config } from "../../config/env";
import { testData } from "../../utils/appConstants";
import users from "../../testdata/users.json";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";
import { Severity } from "allure-js-commons";
// ==========================================
// Default User
// ==========================================
const user = users[0];
test(
    "Locators Advanced Demo",
    async ({ page }) => {
        // ==========================================
        // Allure Metadata
        // ==========================================
        await AllureHelper.metadata({
            feature: "Advanced Locators",
            story: "Verify Advanced Playwright Locators",
            severity: Severity.CRITICAL
        });
        // ==========================================
        // Page Objects
        // ==========================================
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
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
        // Verify Products Page
        // ==========================================
        await expect(
            inventoryPage.title
        ).toHaveText("Products");
        await expect(
            inventoryPage.inventory
        ).toBeVisible();
        // ==========================================
        // Verify Products
        // ==========================================
        await expect(
            inventoryPage.firstItem
        ).toBeVisible();
        await expect(
            inventoryPage.products.last()
        ).toBeVisible();
        await expect(
            inventoryPage.products.nth(1)
        ).toBeVisible();
        // ==========================================
        // Add Product
        // ==========================================
        await inventoryPage.addProduct(
            testData.product1
        );
        // ==========================================
        // Verify Product Added
        // ==========================================
        await expect(
            inventoryPage.getRemoveButton(
                testData.product1
            )
        ).toBeVisible();
        await expect(
            inventoryPage.cartBadgeLocator
        ).toHaveText("1");
        // ==========================================
        // Open Cart
        // ==========================================
        await inventoryPage.openCart();
        // ==========================================
        // Verify Cart
        // ==========================================
        await expect(
            cartPage.title
        ).toHaveText("Your Cart");
        await expect(
            cartPage.title
        ).toBeVisible();
        await expect(
            cartPage.getProduct(
                testData.product1
            )
        ).toBeVisible();
        await expect(
            cartPage.items
        ).toHaveCount(1);
    }
);