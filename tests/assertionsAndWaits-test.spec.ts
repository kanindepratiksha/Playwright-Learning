import { test } from '@playwright/test';
import { config } from '../config/env';
import users from '../testdata/users.json';
import { testData } from '../utils/appConstants';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
test('Verify Assertions and Waits', async ({ page }) => {
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
    // Verify Login
    // ==========================================
    await inventoryPage.verifyProductsPage();
    // ==========================================
    // Verify Products
    // ==========================================
    await inventoryPage.verifyProductVisible(
        testData.product1
    );
    // ==========================================
    // Add Products
    // ==========================================
    await inventoryPage.addProduct(testData.product1);
    await inventoryPage.addProduct(testData.product2);
    // ==========================================
    // Verify Cart Count
    // ==========================================
    await inventoryPage.verifyCartCount('2');
    // ==========================================
    // Open Cart
    // ==========================================
    await inventoryPage.openCart();
    // ==========================================
    // Verify Cart
    // ==========================================
    await cartPage.verifyCartPage();
    await cartPage.verifyProduct(testData.product1);
    await cartPage.verifyProduct(testData.product2);
    // ==========================================
    // Remove Product
    // ==========================================
    await cartPage.removeProduct(testData.product1);
    // ==========================================
    // Verify Cart Count
    // ==========================================
    await cartPage.verifyCartBadgeCount('1');
});