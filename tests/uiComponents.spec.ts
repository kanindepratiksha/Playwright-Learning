import { test, expect } from '@playwright/test';
import { testData } from '../utils/appConstants';
import user from '../testdata/users.json';
import { config } from '../config/env';
test('Verify product sorting using dropdown options', async ({ page }) => {
    // ==========================================
    // Navigate to SauceDemo application
    // ==========================================
    await page.goto(config.sauceDemoUrl);
    // ==========================================
    // Login with valid credentials
    // ==========================================
    await page.getByPlaceholder('Username')
        .fill(user.username);
    await page.getByPlaceholder('Password')
        .fill(user.password);
    await page.getByRole('button', {
        name: testData.loginButton
    }).click();
    // ==========================================
    // Verify successful login
    // ==========================================
    await expect(
        page.locator('.title')
    ).toHaveText(testData.productPageTitle);
    // ==========================================
    // Define reusable locators
    // ==========================================
    const sortDropdown = page.locator(
        '[data-test="product-sort-container"]'
    );
    const firstProduct = page.locator(
        '.inventory_item_name'
    ).first();
    const firstPrice = page.locator(
        '.inventory_item_price'
    ).first();
    // ==========================================
    // Sort Products - Name (A to Z)
    // ==========================================
    await sortDropdown.selectOption('az');
    await expect(sortDropdown)
        .toHaveValue('az');
    await expect(firstProduct)
        .toHaveText(testData.productNameAZ);
    // ==========================================
    // Sort Products - Name (Z to A)
    // ==========================================
    await sortDropdown.selectOption('za');
    await expect(sortDropdown)
        .toHaveValue('za');
    await expect(firstProduct)
        .toHaveText(testData.productNameZA);
    // ==========================================
    // Sort Products - Price (Low to High)
    // ==========================================
    await sortDropdown.selectOption('lohi');
    await expect(sortDropdown)
        .toHaveValue('lohi');
    await expect(firstPrice)
        .toHaveText(testData.lowPrice);
    // ==========================================
    // Sort Products - Price (High to Low)
    // ==========================================
    await sortDropdown.selectOption('hilo');
    await expect(sortDropdown)
        .toHaveValue('hilo');
    await expect(firstProduct)
        .toHaveText(testData.highPriceProduct);
    await expect(firstPrice)
        .toHaveText(testData.highPrice);
});