import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { FakerUtils } from '../utils/FakerUtils';
import { config } from '../config/env';
import { testData } from '../utils/appConstants';
import users from '../testdata/users.json';
test('Checkout using Dynamic Test Data', async ({ page }) => {
    // ==========================================
    // Page Objects
    // ==========================================
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    // ==========================================
    // Test Data
    // ==========================================
    const user = FakerUtils.getUser();
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
    // Verify Product
    // ==========================================
    await cartPage.verifyProduct(
        testData.product1
    );
    // ==========================================
    // Checkout
    // ==========================================
    await cartPage.clickCheckout();
    await cartPage.fillCheckoutDetails(
        user.firstName,
        user.lastName,
        user.postalCode
    );
    await cartPage.continueCheckout();
    await cartPage.finishCheckout();
    // ==========================================
    // Verify Order
    // ==========================================
    await cartPage.verifyOrderSuccess();
});