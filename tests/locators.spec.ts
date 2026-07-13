import { test, expect } from '@playwright/test';
import { config } from '../config/env';
import { testData } from '../utils/appConstants';
import users from '../testdata/users.json';
import { LoginPage } from '../pages/LoginPage';
import { HooksAdvancedPage } from '../pages/hooks-advancedPage';
test('Locators Demo', async ({ page }) => {
    // ==========================================
    // Page Objects
    // ==========================================
    const loginPage = new LoginPage(page);
    const hooksAdvancedPage = new HooksAdvancedPage(page);
    // ==========================================
    // Navigate
    // ==========================================
    await page.goto(config.sauceDemoUrl);
    // ==========================================
    // Login
    // ==========================================
    await loginPage.login(
        users.username,
        users.password
    );
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
    // Logout
    // ==========================================
    await hooksAdvancedPage.logout();
    // ==========================================
    // Validate Logout
    // ==========================================
    await hooksAdvancedPage.verifyLogout();
    await expect(
        page.getByPlaceholder('Username')
    ).toBeVisible();
});