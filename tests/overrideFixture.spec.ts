import { test, expect } from '../fixtures/overrideFixture';

test.describe('Fixture Override Demo', () => {

    test('Override Built-in Page Fixture', async ({ page }) => {

        await expect(page).toHaveTitle(/Swag Labs/);

    });

});