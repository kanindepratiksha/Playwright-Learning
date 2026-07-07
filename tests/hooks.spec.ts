import { test } from '@playwright/test';
import { HooksPage } from '../pages/HooksPage';
let hooksPage: HooksPage;
// ==========================================
// Before All
// ==========================================
test.beforeAll(async () => {
    console.log('BEFORE ALL');
});
// ==========================================
// Before Each
// ==========================================
test.beforeEach(async ({ page }) => {
    console.log('BEFORE EACH');
    hooksPage = new HooksPage(page);
    await hooksPage.navigate();
    await hooksPage.login();
});
// ==========================================
// After Each
// ==========================================
test.afterEach(async () => {
    console.log('AFTER EACH');
});
// ==========================================
// After All
// ==========================================
test.afterAll(async () => {
    console.log('AFTER ALL');
});
// ==========================================
// Test Suite
// ==========================================
test.describe('Hooks Demo', () => {
    // ==========================================
    // Smoke Test
    // ==========================================
    test('@smoke Verify Login', async () => {
        await hooksPage.verifyLogin();
    });
    // ==========================================
    // Regression Test
    // ==========================================
    test('@regression Verify Logout', async () => {
        await hooksPage.logout();
        await hooksPage.verifyLogout();
    });
    test('Only Example', async () => {
        console.log('This is test.only example');
    });
    // ==========================================
    // Skip Example
    // ==========================================
    test.skip('Checkout Test', async () => {
        console.log('Checkout test skipped');
    });
});