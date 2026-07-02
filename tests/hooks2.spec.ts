import { test } from '@playwright/test';
import { Hooks2Page } from '../pages/Hooks2Page';

// ==========================================
// Page Object
// ==========================================
let hooks2Page: Hooks2Page;

// ==========================================
// Test Configuration
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
    // Run Tests in Serial Mode
    // ==========================================
    test.describe.configure({

        mode: 'serial'

    });

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

        hooks2Page = new Hooks2Page(page);

        await hooks2Page.navigate();

        await hooks2Page.login();

    });

    // ==========================================
    // Smoke Test
    // ==========================================
    test('@smoke Verify Login', async () => {

        await test.step('Verify Products Page', async () => {

            await hooks2Page.verifyLogin();

        });

    });

    // ==========================================
    // Regression Test
    // ==========================================
    test('@regression Verify Logout', async () => {

        test.slow();

        await test.step('Logout From Application', async () => {

            await hooks2Page.logout();

        });

        await test.step('Verify Logout', async () => {

            await hooks2Page.verifyLogout();

        });

    });

    // ==========================================
    // Skip Example
    // ==========================================
    test.skip('Checkout Test', async () => {

        console.log('Checkout skipped');

    });

    // ==========================================
    // Expected Failure
    // ==========================================
    test.fail('Known Bug Example', async () => {

        throw new Error('Known Bug');

    });

    // ==========================================
    // Feature Under Development
    // ==========================================
    test.fixme('Wishlist Feature', async () => {

    });

    // ==========================================
    // After Each
    // ==========================================
    test.afterEach(async ({ page }, testInfo) => {

        console.log('========== AFTER EACH ==========');

        console.log(`Test : ${testInfo.title}`);

        console.log(`Status : ${testInfo.status}`);

        await page.screenshot({

            path: `screenshots/${testInfo.title}.png`,
            fullPage: true

        });

    });

    // ==========================================
    // After All
    // ==========================================
    test.afterAll(async () => {

        console.log('========== AFTER ALL ==========');

    });

});