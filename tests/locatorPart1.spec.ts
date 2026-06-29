import { test, expect } from '@playwright/test';
import { testData } from '../utils/appConstants';
import user from '../testdata/users.json';

test('Locators Part 1 Demo', async ({ page }) => {

    // Navigate to Application
    await page.goto(testData.sauceDemoUrl);

    // getByPlaceholder()
    await page.getByPlaceholder('Username')
        .fill(user.username);

    await page.getByPlaceholder('Password')
        .fill(user.password);

    // getByRole()
    await page.getByRole('button', {
        name: testData.loginButton
    }).click();

    // URL Validation
    await expect(page).toHaveURL(/inventory/);

    // getByText()
    await expect(
        page.getByText(testData.productPageTitle)
    ).toBeVisible();

    // Basic CSS Selector
    await expect(
        page.locator('.inventory_list')
    ).toBeVisible();

    // Product Validation
    await expect(
        page.getByText(testData.product1)
    ).toBeVisible();

    // Logout Flow
    await page.locator('#react-burger-menu-btn').click();

    await page.getByText(
        testData.logoutButton
    ).click();

    // Validate Logout
    await expect(page)
        .toHaveURL(testData.sauceDemoUrl);

    await expect(
        page.getByPlaceholder('Username')
    ).toBeVisible();
});