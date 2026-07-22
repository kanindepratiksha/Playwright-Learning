import { test, expect } from '@playwright/test';
import { testData } from '../utils/appConstants';
import users from '../testdata/users.json';
import { config } from '../config/env';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
test('Verify Assertions and Waits in SauceDemo', async ({ page }) => {
    // ==========================================
    // Page Objects
    // ==========================================
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const user = users[0];
    // ==========================================
    // Navigate
    // ==========================================
    await page.goto(config.sauceDemoUrl);
    await page.waitForLoadState('networkidle');
    // ==========================================
    // Login
    // ==========================================
    await loginPage.login(
        user.username,
        user.password
    );
    // ==========================================
    // Verify Inventory Page
    // ==========================================
    await page.waitForURL('**/inventory.html');
    await expect(page).toHaveURL(/inventory/);
    await inventoryPage.verifyPageTitle();
    await inventoryPage.verifyInventoryList();
    await inventoryPage.verifyProductVisible(testData.product1);
    // ==========================================
    // Add Products
    // ==========================================
    await inventoryPage.addProduct(testData.product1);
    await inventoryPage.addProduct(testData.product2);
    // ==========================================
    // Verify Cart Badge
    // ==========================================
    await inventoryPage.verifyCartBadgeCount('2');
    // ==========================================
    // Open Cart
    // ==========================================
    await cartPage.openCart();
    await page.waitForURL('**/cart.html');
    await expect(page).toHaveURL(/cart/);
    // ==========================================
    // Verify Cart Products
    // ==========================================
    await cartPage.verifyProduct(testData.product1);
    await cartPage.verifyProduct(testData.product2);
    // ==========================================
    // Remove Product
    // ==========================================
    await cartPage.removeProduct(testData.product1);
    // ==========================================
    // Verify Cart Badge
    // ==========================================
    await cartPage.verifyCartBadgeCount('1');
});