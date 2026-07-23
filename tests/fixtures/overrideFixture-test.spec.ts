import { test } from '../../fixtures/overrideFixture';
import { HomePage } from '../../pages/HomePage';
test.describe('Fixture Override Demo', () => {
    test('Override Built-in Page Fixture', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.verifyHomePageTitle();
    });
});