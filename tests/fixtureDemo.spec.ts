import { test, expect } from '../fixtures/fixture';
import { config } from '../config/env';
import users from '../testdata/users.json';
test.describe('Playwright Fixture Demo', () => {
    // ==========================================
    // Feature 1 - Built-in Fixture
    // ==========================================
    test('Built-in Page Fixture', async ({ page }) => {
        await page.goto(config.sauceDemoUrl);
        await expect(page).toHaveTitle(/Swag Labs/);
    });
    // ==========================================
    // Feature 2 - Custom Fixture
    // ==========================================
    test('Custom Fixture', async ({ loginPage }) => {
        await loginPage.login(users[0]);
    });
    // ==========================================
    // Feature 3 - test.extend()
    // ==========================================
    test('test.extend Demo', async ({ loginPage }) => {
        await loginPage.login(users[0]);
    });
    // ==========================================
    // Feature 4 - use()
    // ==========================================
    test('use() Demo', async ({ loginPage }) => {
        await loginPage.login(users[0]);
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