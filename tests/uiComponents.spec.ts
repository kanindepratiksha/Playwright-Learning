import { test, expect } from '@playwright/test';
import { testData } from '../utils/testData';
import user from '../testdata/users.json';

test('Dropdown Handling and Product Sorting', async ({ page }) => {

    // Navigate to SauceDemo
    await page.goto(testData.url);

    // Login
    await page.getByPlaceholder('Username')
        .fill(user.username);

    await page.getByPlaceholder('Password')
        .fill(user.password);

    await page.getByRole('button', {
        name: 'Login'
    }).click();

    // Verify Products Page
    await expect(
        page.locator('.title')
    ).toHaveText(testData.productPageTitle);

    // Dropdown Locator
    const sortDropdown = page.locator(
        '[data-test="product-sort-container"]'
    );

    // ==========================================
    // Sort by Name (A to Z)
    // ==========================================
    await sortDropdown.selectOption('az');

    await expect(
        page.locator('.inventory_item_name').first()
    ).toHaveText('Sauce Labs Backpack');

    // ==========================================
    // Sort by Name (Z to A)
    // ==========================================
    await sortDropdown.selectOption('za');

    await expect(
        page.locator('.inventory_item_name').first()
    ).toHaveText('Test.allTheThings() T-Shirt (Red)');

    // ==========================================
    // Sort by Price (Low to High)
    // ==========================================
    await sortDropdown.selectOption('lohi');

    await expect(
        page.locator('.inventory_item_price').first()
    ).toHaveText('$7.99');

    // ==========================================
    // Sort by Price (High to Low)
    // ==========================================
    await sortDropdown.selectOption('hilo');

    await expect(
        page.locator('.inventory_item_name').first()
    ).toHaveText('Sauce Labs Fleece Jacket');

    // Additional Validation
    await expect(
        page.locator('.inventory_item_price').first()
    ).toHaveText('$49.99');
});