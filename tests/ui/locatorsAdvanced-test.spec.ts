import { test } from '@playwright/test';
import { config } from '../../config/env';
import { testData } from '../../utils/appConstants';
import users from '../../testdata/users.json';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
// ==========================================
// Default User
// ==========================================
const user = users[0];
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
        users[0].username,
        users[0].password
    );
    // ==========================================
    // Verify Products Page
    // ==========================================
    await inventoryPage.verifyPageTitle();
    await inventoryPage.verifyInventoryList();
    // ==========================================
    // Verify First Product
    // ==========================================
    await inventoryPage.verifyFirstInventoryItemVisible();
    // ==========================================
    // Verify Last Product
    // ==========================================
    await inventoryPage.verifyLastInventoryItemVisible();
    // ==========================================
    // Verify Second Product
    // ==========================================
    await inventoryPage.verifyInventoryItemVisible(1);
    // ==========================================
    // Add Product
    // ==========================================
    await inventoryPage.addProduct(
        testData.product1
    );
    // ==========================================
    // Open Cart
    // ==========================================
    await inventoryPage.openCart();
    // ==========================================
    // Verify Cart Page
    // ==========================================
    await cartPage.verifyCartPage();
    // ==========================================
    // Verify Product in Cart
    // ==========================================
    await cartPage.verifyCartTitle();
    await cartPage.verifyProduct(
        testData.product1
    );
});