import { test } from '@playwright/test';
import { HooksPage } from '../pages/HooksPage';
import { Logger } from '../utils/Logger';
import { ScreenshotManager } from '../utils/ScreenshotManager';
let hooksPage: HooksPage;
// ==========================================
// Before All
// ==========================================
test.beforeAll(async () => {
    console.log('========== BEFORE ALL ==========');
});
// ==========================================
// Before Each
// ==========================================
test.beforeEach(async ({ page }) => {
    console.log('========== BEFORE EACH ==========');
    hooksPage = new HooksPage(page);
    await hooksPage.navigate();
    await hooksPage.login();
});
// ==========================================
// After Each
// ==========================================
test.afterEach(async ({ page }, testInfo) => {
    console.log('========== AFTER EACH ==========');
    console.log(`Title : ${testInfo.title}`);
    console.log(`Status : ${testInfo.status}`);
    if (testInfo.status !== testInfo.expectedStatus) {
        await page.screenshot({
            path: `screenshots/${testInfo.title}.png`,
            fullPage: true
        });
    }
});
// ==========================================
// After All
// ==========================================
test.afterAll(async () => {
    console.log('========== AFTER ALL ==========');
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
    // ==========================================
    // Example Test
    // ==========================================
    test('Example Test', async () => {
        await hooksPage.verifyLogin();
    });
    // ==========================================
    // Skip Example
    // ==========================================
    test.skip('Checkout Test', async () => {
        // Future implementation
    });
});