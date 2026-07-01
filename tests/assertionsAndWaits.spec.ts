import { test, expect } from '@playwright/test';
import { testData } from '../utils/testData';
import user from '../testdata/users.json';

test('Assertions and Waits Demo', async ({ page }) => {

    // Navigate
    await page.goto(testData.url);

    // Wait for page to load completely
    await page.waitForLoadState('networkidle');

    // Login
    await page.getByPlaceholder('Username')
        .fill(user.username);

    await page.getByPlaceholder('Password')
        .fill(user.password);

    // toBeEnabled()
    await expect(
        page.getByRole('button', { name: 'Login' })
    ).toBeEnabled();

    await page.getByRole('button', {
        name: 'Login'
    }).click();

    // waitForURL()
    await page.waitForURL('**/inventory.html');

    // toHaveURL()
    await expect(page)
        .toHaveURL(/inventory/);

    // waitForSelector()
    await page.waitForSelector('.title');

    // toHaveText()
    await expect(
        page.locator('.title')
    ).toHaveText(testData.productPageTitle);

    // toBeVisible()
    await expect(
        page.getByText(testData.product1)
    ).toBeVisible();

    // Add Product 1
    await page
        .locator('.inventory_item')
        .filter({ hasText: testData.product1 })
        .getByRole('button')
        .click();

    // Add Product 2
    await page
        .locator('.inventory_item')
        .filter({ hasText: testData.product2 })
        .getByRole('button')
        .click();

    // Cart Assertions
    await expect(
        page.locator('.shopping_cart_badge')
    ).toHaveText('2');

    // Open Cart
    await page.locator('.shopping_cart_link').click();

    // waitForURL()
    await page.waitForURL('**/cart.html');

    // toHaveURL()
    await expect(page)
        .toHaveURL(/cart/);

    // Cart Assertions
    await expect(
        page.getByText(testData.product1)
    ).toBeVisible();

    await expect(
        page.getByText(testData.product2)
    ).toBeVisible();

    // Remove Product
    await page.locator(
        '[data-test="remove-sauce-labs-backpack"]'
    ).click();

    // Cart Count Assertion
    await expect(
        page.locator('.shopping_cart_badge')
    ).toHaveText('1');
});