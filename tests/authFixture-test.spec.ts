import { test, expect } from '../fixtures/authFixture';
import { testData } from '../utils/appConstants';
test.describe('Authentication Fixture', () => {
    test('Verify Successful Login', async ({ authenticatedPage }) => {
        await expect(
            authenticatedPage.locator('.title')
        ).toHaveText(testData.productPageTitle);
    });
});