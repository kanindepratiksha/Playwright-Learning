import { test, expect } from '@playwright/test';
import { config } from '../config/env';
import { testData } from '../utils/appConstants';
import user from '../testdata/users.json';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
test('Locators Advanced Demo', async ({ page }) => {
    // ==========================================
    // Page Objects
    // ==========================================
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    // ==========================================
    // Navigate
    // ==========================================
    await page.goto(config.sauceDemoUrl);
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
    await inventoryPage.verifyPageTitle();
    await inventoryPage.verifyInventoryList();
    // ==========================================
    // locator() + first()
    // ==========================================
    await expect(
        page.locator('.inventory_item').first()
    ).toBeVisible();
    // ==========================================
    // locator() + last()
    // ==========================================
    await expect(
        page.locator('.inventory_item').last()
    ).toBeVisible();
    // ==========================================
    // locator() + nth()
    // ==========================================
    await expect(
        page.locator('.inventory_item').nth(1)
    ).toBeVisible();
    // ==========================================
    // Add Product
    // ==========================================
    await inventoryPage.addProduct(
        testData.product1
    );
    // ==========================================
    // Open Cart
    // ==========================================
    await cartPage.openCart();
    // ==========================================
    // Verify Cart
    // ==========================================
    await cartPage.verifyCartTitle();
    await cartPage.verifyProduct(
        testData.product1
    );
});