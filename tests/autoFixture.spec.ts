import { test, expect } from '../fixtures/autoFixture';
import { config } from '../config/env';

test.describe('Auto Fixture Demo', () => {

    test('Verify Auto Fixture', async ({ page }) => {

        await page.goto(config.sauceDemoUrl);

        await expect(page).toHaveTitle(/Swag Labs/);

    });

});