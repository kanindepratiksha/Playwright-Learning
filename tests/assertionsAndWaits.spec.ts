import { test, expect } from '@playwright/test';
import { testData } from '../utils/appConstants';
import user from '../testdata/users.json';
import { config } from '../config/env';

test('Verify Assertions and Waits in SauceDemo', async ({ page }) => {

    // ==========================================
    // Navigate to SauceDemo application
    // ==========================================
    await page.goto(config.sauceDemoUrl);

    // Wait until all network requests are completed
    await page.waitForLoadState('networkidle');

    // ==========================================
    // Login with valid credentials
    // ==========================================
    await page.getByPlaceholder('Username')
        .fill(user.username);

    await page.getByPlaceholder('Password')
        .fill(user.password);

    // Verify Login button is enabled
    await expect(
        page.getByRole('button', {
            name: testData.loginButton
        })
    ).toBeEnabled();

    // Click Login button
    await page.getByRole('button', {
        name: testData.loginButton
    }).click();

    // ==========================================
    // Verify successful login
    // ==========================================
    await page.waitForURL('**/inventory.html');

    await expect(page)
        .toHaveURL(/inventory/);

    await page.waitForSelector('.title');

    await expect(
        page.locator('.title')
    ).toHaveText(testData.productPageTitle);

    // ==========================================
    // Verify product is visible
    // ==========================================
    await expect(
        page.getByText(testData.product1)
    ).toBeVisible();

    // ==========================================
    // Add Product 1 to cart
    // ==========================================
    await page
        .locator('.inventory_item')
        .filter({ hasText: testData.product1 })
        .getByRole('button')
        .click();

    // ==========================================
    // Add Product 2 to cart
    // ==========================================
    await page
        .locator('.inventory_item')
        .filter({ hasText: testData.product2 })
        .getByRole('button')
        .click();

    // ==========================================
    // Verify cart badge count
    // ==========================================
    await expect(
        page.locator('.shopping_cart_badge')
    ).toHaveText('2');

    // ==========================================
    // Navigate to Cart page
    // ==========================================
    await page.locator('.shopping_cart_link').click();

    await page.waitForURL('**/cart.html');

    await expect(page)
        .toHaveURL(/cart/);

    // ==========================================
    // Verify added products are displayed
    // ==========================================
    await expect(
        page.getByText(testData.product1)
    ).toBeVisible();

    await expect(
        page.getByText(testData.product2)
    ).toBeVisible();

    // ==========================================
    // Remove Product 1 from cart
    // ==========================================
    await page.locator(
        '[data-test="remove-sauce-labs-backpack"]'
    ).click();

    // ==========================================
    // Verify cart badge count after removal
    // ==========================================
    await expect(
        page.locator('.shopping_cart_badge')
    ).toHaveText('1');

});