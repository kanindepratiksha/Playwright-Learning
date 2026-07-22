import { test } from '@playwright/test';
import { testData } from '../utils/appConstants';
import users from '../testdata/users.json';
import { config } from '../config/env';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
test('Verify product sorting using dropdown options', async ({ page }) => {
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
    // Verify Inventory Page
    // ==========================================
    await inventoryPage.verifyPageTitle();
    // ==========================================
    // Sort Products - Name (A to Z)
    // ==========================================
    await inventoryPage.sortProducts('az');
    await inventoryPage.verifySelectedSortOption('az');
    await inventoryPage.verifyFirstProduct(
        testData.productNameAZ
    );
    // ==========================================
    // Sort Products - Name (Z to A)
    // ==========================================
    await inventoryPage.sortProducts('za');
    await inventoryPage.verifySelectedSortOption('za');
    await inventoryPage.verifyFirstProduct(
        testData.productNameZA
    );
    // ==========================================
    // Sort Products - Price (Low to High)
    // ==========================================
    await inventoryPage.sortProducts('lohi');
    await inventoryPage.verifySelectedSortOption('lohi');
    await inventoryPage.verifyFirstPrice(
        testData.lowPrice
    );
    // ==========================================
    // Sort Products - Price (High to Low)
    // ==========================================
    await inventoryPage.sortProducts('hilo');
    await inventoryPage.verifySelectedSortOption('hilo');
    await inventoryPage.verifyFirstProduct(
        testData.highPriceProduct
    );
    await inventoryPage.verifyFirstPrice(
        testData.highPrice
    );
});