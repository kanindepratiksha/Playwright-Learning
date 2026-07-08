import { test } from '@playwright/test';
import { Hooks2Page } from '../pages/hooks-advancedPage';
// ==========================================
// Page Object
// ==========================================
let hooks2Page: Hooks2Page;
// ==========================================
// test.use()
// Apply configuration for all tests in this file
// ==========================================
test.use({
    viewport: {
        width: 1366,
        height: 768
    }
});
// ==========================================
// Test Suite
// ==========================================
test.describe('Hooks 2 - Advanced Playwright Features', () => {
    // ==========================================
    // test.describe.configure()
    // Execute tests sequentially
    // ==========================================
    test.describe.configure({
        mode: 'serial'
    });
    // ==========================================
    // Before Each
    // ==========================================
    test.beforeEach(async ({ page }) => {
        hooks2Page = new Hooks2Page(page);
        await hooks2Page.navigate();
        await hooks2Page.login();
    });
    // ==========================================
    // test.step()
    // ==========================================
    test('@smoke Verify Login', async () => {
        await test.step('Verify User is Logged In', async () => {
            await hooks2Page.verifyLogin();
        });
    });
    // ==========================================
    // test.slow()
    // ==========================================
    test('@regression Verify Logout', async () => {
        // Increase timeout for this test
        test.slow();
        await test.step('Logout From Application', async () => {
            await hooks2Page.logout();
        });
        await test.step('Verify Logout Successful', async () => {
            await hooks2Page.verifyLogout();
        });
    });
    // ==========================================
    // test.fail()
    // ==========================================
    test.fail('Known Bug Example', async () => {
        throw new Error('Known Bug');
    });
    // ==========================================
    // test.fixme()
    // ==========================================
    test.fixme('Wishlist Feature', async () => {
        // Future implementation
    });
    // ==========================================
    // After Each
    // ==========================================
    test.afterEach(async ({ page }, testInfo) => {
        console.log('========== AFTER EACH ==========');
        console.log(`Title : ${testInfo.title}`);
        console.log(`Status : ${testInfo.status}`);
        console.log(`Duration : ${testInfo.duration} ms`);
        await page.screenshot({
            path: `screenshots/${testInfo.title}.png`,
            fullPage: true
        });
    });
});