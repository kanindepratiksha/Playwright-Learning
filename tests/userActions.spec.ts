import { test, expect } from '@playwright/test';
import { testData } from '../utils/appConstants';
import users from '../testdata/users.json';
import { config } from '../config/env';
const user = users[0];
test('UI Actions Demo', async ({ page }) => {
    await page.goto(config.sauceDemoUrl);
    // ==========================================
    // Login
    // ==========================================
    await page.getByPlaceholder('Username')
        .fill(user.username);
    await page.getByPlaceholder('Password')
        .fill(user.password);
    // keyboard.press()
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    // ==========================================
    // Verify Login
    // ==========================================
    await expect(
        page.locator('.title')
    ).toHaveText(testData.productPageTitle);
    // hover()
    await page.locator('.inventory_item')
        .first()
        .hover();
    // ==========================================
    // Add to Cart
    // ==========================================
    await page
        .locator('.inventory_item')
        .filter({ hasText: testData.product1 })
        .getByRole('button', { name: 'Add to cart' })
        .click();
    // ==========================================
    // Cart Validation
    // ==========================================
    await expect(
        page.locator('.shopping_cart_badge')
    ).toHaveText('1');
    // ==========================================
    // Navigate to Cart
    // ==========================================
    await page.locator('.shopping_cart_link').click();
    await expect(page)
        .toHaveURL(/cart/);
    // ==========================================
    // Verify Product
    // ==========================================
    await expect(
        page.getByText(testData.product1)
    ).toBeVisible();
    // ==========================================
    // Remove Product
    // ==========================================
    await page.getByRole('button', {
        name: 'Remove'
    }).click();
    // ==========================================
    // Verify Empty Cart
    // ==========================================
    await expect(
        page.locator('.cart_item')
    ).toHaveCount(0);
    // ==========================================
    // Browser Navigation
    // ==========================================
    await page.goBack();
    await expect(
        page.locator('.title')
    ).toHaveText(testData.productPageTitle);
    await page.reload();
    await expect(
        page.locator('.title')
    ).toHaveText(testData.productPageTitle);
});