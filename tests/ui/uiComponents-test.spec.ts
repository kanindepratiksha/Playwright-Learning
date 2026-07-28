import { test } from '@playwright/test';
import { config } from '../../config/env';
import { testData } from '../../utils/appConstants';
import users from '../../testdata/users.json';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
test('Verify Product Sorting Using Dropdown Options', async ({ page }) => {
    // ==========================================
    // Page Objects
    // ==========================================
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    // ==========================================
    // Select the first user
    // ==========================================
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
    // ==========================================
    // Verify Login
    // ==========================================
    await loginPage.verifyLoginSuccess();
    await inventoryPage.verifyProductsPage();
    // ==========================================
    // Sort A-Z
    // ==========================================
    await inventoryPage.sortProducts('az');
    await inventoryPage.verifySortOption('az');
    await inventoryPage.verifyFirstProduct(testData.productNameAZ);
    // ==========================================
    // Sort Z-A
    // ==========================================
    await inventoryPage.sortProducts('za');
    await inventoryPage.verifySortOption('za');
    await inventoryPage.verifyFirstProduct(testData.productNameZA);
    // ==========================================
    // Sort Low to High
    // ==========================================
    await inventoryPage.sortProducts('lohi');
    await inventoryPage.verifySortOption('lohi');
    await inventoryPage.verifyFirstPrice(testData.lowPrice);
    // ==========================================
    // Sort High to Low
    // ==========================================
    await inventoryPage.sortProducts('hilo');
    await inventoryPage.verifySortOption('hilo');
    await inventoryPage.verifyFirstProduct(testData.highPriceProduct);
    await inventoryPage.verifyFirstPrice(testData.highPrice);
});