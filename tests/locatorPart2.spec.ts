import { test, expect } from '@playwright/test';
import { testData } from '../utils/testData';

test('Locators Part 2 Demo', async ({ page }) => {

    // Navigate to application
    await page.goto(testData.url);

    // Login
    await page.getByPlaceholder('Username')
        .fill('standard_user');

    await page.getByPlaceholder('Password')
        .fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' })
        .click();

    // Verify Products page using XPath
    await expect(
        page.locator("//span[text()='Products']")
    ).toBeVisible();

    // locator() + first()
    await expect(
        page.locator('.inventory_item').first()
    ).toBeVisible();

    // locator() + last()
    await expect(
        page.locator('.inventory_item').last()
    ).toBeVisible();

    // locator() + nth()
    await expect(
        page.locator('.inventory_item').nth(1)
    ).toBeVisible();

    // Chained locator + filter() + Product Selection
    await page
        .locator('.inventory_item')
        .filter({ hasText: testData.product1 })
        .getByRole('button', { name: 'Add to cart' })
        .click();

    // Cart Navigation
    await page.locator('.shopping_cart_link').click();

    // Cart Validation
    await expect(
        page.getByText(testData.cartPageTitle)
    ).toBeVisible();

    await expect(
        page.getByText(testData.product1)
    ).toBeVisible();
});