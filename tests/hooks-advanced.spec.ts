import { test } from '@playwright/test';
import { HooksAdvancedPage } from '../pages/hooks-advancedPage';
import users from '../testdata/users.json';
// ==========================================
// Page Object
// ==========================================
let hooksAdvancedPage: HooksAdvancedPage;
// ==========================================
// test.use()
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
test.describe('Hooks Advanced - Playwright Features', () => {
    // ==========================================
    // Execute tests sequentially
    // ==========================================
    test.describe.configure({
        mode: 'serial'
    });
    // ==========================================
    // Before Each
    // ==========================================
    test.beforeEach(async ({ page }) => {
        hooksAdvancedPage = new HooksAdvancedPage(page);
        await hooksAdvancedPage.navigate();
        await hooksAdvancedPage.login(
            users[0].username,
            users[0].password
        );
    });
    // ==========================================
    // Verify Login
    // ==========================================
    test('@smoke Verify Login', async () => {
        await test.step('Verify User is Logged In', async () => {
            await hooksAdvancedPage.verifyLogin();
        });
    });
    // ==========================================
    // Verify Logout
    // ==========================================
    test('@regression Verify Logout', async () => {
        test.slow();
        await test.step('Logout From Application', async () => {
            await hooksAdvancedPage.logout();
        });
        await test.step('Verify Logout Successful', async () => {
            await hooksAdvancedPage.verifyLogout();
        });
    });
    // ==========================================
    // Known Bug Example
    // ==========================================
    test('Known Bug Example', async () => {
        await test.step('Demonstrate Known Bug Placeholder', async () => {
            console.log('Known bug placeholder test');
        });
    });
    // ==========================================
    // Future Feature
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