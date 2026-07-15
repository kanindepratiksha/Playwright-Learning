import { test } from '@playwright/test';
import { HooksPage } from '../pages/HooksPage';
import { Logger } from '../utils/Logger';
import { ScreenshotManager } from '../utils/ScreenshotManager';
let hooksPage: HooksPage;
// ==========================================
// Before All
// ==========================================
test.beforeAll(async () => {
    Logger.info('========== Test Execution Started ==========');
});
// ==========================================
// Before Each
// ==========================================
test.beforeEach(async ({ page }, testInfo) => {
    Logger.info(`Starting Test : ${testInfo.title}`);
    hooksPage = new HooksPage(page);
    await hooksPage.navigate();
    await hooksPage.login();
});
// ==========================================
// After Each
// ==========================================
test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        Logger.error(`Test Failed : ${testInfo.title}`);
        await ScreenshotManager.captureFailure(
            page,
            testInfo.title.replace(/\s+/g, '_')
        );
    } else {
        Logger.info(`Test Passed : ${testInfo.title}`);
    }
});
// ==========================================
// After All
// ==========================================
test.afterAll(async () => {
    Logger.info('========== Test Execution Completed ==========');
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
    // Only Example
    // ==========================================
    test('Only Example', async () => {
        Logger.info('Executing Only Example Test');
    });
    // ==========================================
    // Skip Example
    // ==========================================
    test.skip('Checkout Test', async () => {
        Logger.info('Checkout Test Skipped');
    });
});