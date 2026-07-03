import { test, expect } from '../fixtures/fixture';
test.describe('Playwright Fixture Demo', () => {
    // ==========================================
    // Feature 1 - Built-in Fixture
    // ==========================================
    test('Built-in Page Fixture', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveTitle(/Swag Labs/);
    });
    // ==========================================
    // Feature 2 - Custom Fixture
    // ==========================================
    test('Custom Fixture', async ({ loginPage }) => {
        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );
    });
    // ==========================================
    // Feature 3 - test.extend()
    // ==========================================
    test('test.extend Demo', async ({ loginPage }) => {
        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );
    });
    // ==========================================
    // Feature 4 - use()
    // ==========================================
    test('use() Demo', async ({ loginPage }) => {
        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );
    });
    // ==========================================
    // Feature 5 - Fixture Dependency
    // ==========================================
    test('Fixture Dependency', async ({ inventoryPage }) => {
        await inventoryPage.verifyProductVisible(
            'Sauce Labs Backpack'
        );
    });
});