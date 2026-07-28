import { test } from '../../fixtures/autoFixture';
import { config } from '../../config/env';
import { HomePage } from '../../pages/HomePage';
test.describe('Auto Fixture Demo', () => {
    test('Verify Auto Fixture', async ({ page }) => {
        // ==========================================
        // Page Object
        // ==========================================
        const homePage = new HomePage(page);
        // ==========================================
        // Navigate
        // ==========================================
        await page.goto(config.sauceDemoUrl);
        // ==========================================
        // Verify Title
        // ==========================================
        await homePage.verifyHomePageTitle();
    });
});