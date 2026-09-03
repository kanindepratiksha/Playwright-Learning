import { test } from "../hooks/reporting/uiAllureHooks";
import { expect } from "@playwright/test";
import { AllureHelper } from "../../utils/AllureHelper";
import { config } from "../../config/env";
import users from "../../testdata/users.json";
import { testData } from "../../utils/appConstants";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";
import { Severity } from "allure-js-commons";
test(
    "Verify Assertions and Waits",
    async ({ page }) => {
        // ==========================================
        // Allure Metadata
        // ==========================================
        await AllureHelper.metadata({
            feature: "Assertions",
            story: "Verify Assertions and Waits",
            severity: Severity.CRITICAL
        });
        // ==========================================
        // Page Objects
        // ==========================================
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const user = users[0];
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
                await page.waitForLoadState(
                    "networkidle"
                );
            }
        );
        // ==========================================
        // Login
        // ==========================================
        await AllureHelper.step(
            "Login",
            async () => {
                await loginPage.login(
                    user.username,
                    user.password
                );
                // Verify Products page
                await expect(
                    inventoryPage.title
                ).toHaveText("Products");
                // Verify inventory list
                await expect(
                    inventoryPage.inventory
                ).toBeVisible();
            }
        );
        // ==========================================
        // Verify Products
        // ==========================================
        await AllureHelper.step(
            "Verify Products",
            async () => {
                await expect(
                    inventoryPage.getProductText(
                        testData.product1
                    )
                ).toBeVisible();
            }
        );
        // ==========================================
        // Add Products to Cart
        // ==========================================
        await AllureHelper.step(
            "Add Products to Cart",
            async () => {
                await inventoryPage.addProduct(
                    testData.product1
                );
                await inventoryPage.addProduct(
                    testData.product2
                );
                // Verify cart count
                await expect(
                    inventoryPage.cartBadgeLocator
                ).toHaveText("2");
            }
        );
        // ==========================================
        // Verify Shopping Cart
        // ==========================================
        await AllureHelper.step(
            "Verify Shopping Cart",
            async () => {
                await inventoryPage.openCart();
                // Verify Cart page
                await expect(
                    cartPage.title
                ).toHaveText("Your Cart");
                // Verify first product
                await expect(
                    cartPage.getProduct(
                        testData.product1
                    )
                ).toBeVisible();
                // Verify second product
                await expect(
                    cartPage.getProduct(
                        testData.product2
                    )
                ).toBeVisible();
            }
        );
        // ==========================================
        // Remove Product
        // ==========================================
        await AllureHelper.step(
            "Remove Product",
            async () => {
                await cartPage.removeProduct(
                    testData.product1
                );
                // Verify remaining cart count
                await expect(
                    cartPage.badge
                ).toHaveText("1");
            }
        );
    }
);