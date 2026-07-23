import { test } from '@playwright/test';
import { config } from '../../config/env';
import { testData } from '../../utils/appConstants';
import users from '../../testdata/users.json';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
test('UI Actions Demo', async ({ page }) => {
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
    // ==========================================
    // Login
    // ==========================================
    await loginPage.login(
        user.username,
        user.password
    );
    await inventoryPage.loginWithKeyboard();
    // ==========================================
    // Verify Login
    // ==========================================
    await loginPage.verifyLoginSuccess();
    await inventoryPage.verifyProductsPage();
    // ==========================================
    // Hover Product
    // ==========================================
    await inventoryPage.hoverFirstProduct();
    // ==========================================
    // Add Product
    // ==========================================
    await inventoryPage.addProduct(
        testData.product1
    );
    // ==========================================
    // Verify Cart Count
    // ==========================================
    await inventoryPage.verifyCartCount('1');
    // ==========================================
    // Open Cart
    // ==========================================
    await inventoryPage.openCart();
    // ==========================================
    // Verify Cart
    // ==========================================
    await cartPage.verifyCartPage();
    await cartPage.verifyProduct(
        testData.product1
    );
    // ==========================================
    // Remove Product
    // ==========================================
    await cartPage.removeProduct(
        testData.product1
    );
    // ==========================================
    // Verify Cart Empty
    // ==========================================
    await cartPage.verifyCartIsEmpty();
    // ==========================================
    // Go Back
    // ==========================================
    await inventoryPage.goBack();
    await inventoryPage.verifyProductsPage();
    // ==========================================
    // Reload
    // ==========================================
    await inventoryPage.reloadPage();
    await inventoryPage.verifyProductsPage();
});