import { test, expect } from '@playwright/test';
import { testData } from '../utils/appConstants';
import user from '../testdata/users.json';
import { config } from '../config/env';
test('Locators Part 1 Demo', async ({ page }) => {
    // ==========================================
    // Navigate to Application
    // ==========================================
    await page.goto(config.sauceDemoUrl);
    // ==========================================
    // Login
    // ==========================================
    await page.getByPlaceholder('Username')
        .fill(user.username);
    await page.getByPlaceholder('Password')
        .fill(user.password);
    await page.getByRole('button', {
        name: testData.loginButton
    }).click();
    // ==========================================
    // Validate Login
    // ==========================================
    await expect(page).toHaveURL(/inventory/);
    await expect(
        page.getByText(testData.productPageTitle)
    ).toBeVisible();
    await expect(
        page.locator('.inventory_list')
    ).toBeVisible();
    await expect(
        page.getByText(testData.product1)
    ).toBeVisible();
    // ==========================================
    // Logout Flow
    // ==========================================
    const menuButton = page.locator('#react-burger-menu-btn');
    const logoutButton = page.locator('#logout_sidebar_link');
    await menuButton.click();
    await expect(logoutButton).toBeVisible();
    await logoutButton.click();
    // ==========================================
    // Validate Logout
    // ==========================================
    await expect(page)
        .toHaveURL(config.sauceDemoUrl);
    await expect(
        page.getByPlaceholder('Username')
    ).toBeVisible();
});