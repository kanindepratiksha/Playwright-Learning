import { test, expect } from '@playwright/test';
import { testData } from '../utils/appConstants';
import { config } from '../config/env';
import { DataReader } from '../utils/DataReader';
const users = DataReader.readJson('users.json');
users.forEach((user: any) => {
    test(`Locators Part 1 Demo - ${user.username}`, async ({ page }) => {
        // Navigate to Application
        await page.goto(config.sauceDemoUrl);
        // Login
        await page.getByPlaceholder('Username')
            .fill(user.username);
        await page.getByPlaceholder('Password')
            .fill(user.password);
        await page.getByRole('button', {
            name: testData.loginButton
        }).click();
        if (user.expected === 'success') {
            // URL Validation
            await expect(page).toHaveURL(/inventory/);
            // Products page title
            await expect(
                page.getByText(testData.productPageTitle)
            ).toBeVisible();
            // Inventory List
            await expect(
                page.locator('.inventory_list')
            ).toBeVisible();
            // Product Validation
            await expect(
                page.getByText(testData.product1)
            ).toBeVisible();
            // Logout
            await page.locator('#react-burger-menu-btn').click();
            await page.getByText(
                testData.logoutButton
            ).click();
            // Verify Logout
            await expect(page)
                .toHaveURL(config.sauceDemoUrl);
            await expect(
                page.getByPlaceholder('Username')
            ).toBeVisible();
        } else {
            // Locked User Validation
            await expect(
                page.locator('[data-test="error"]')
            ).toContainText(
                'Sorry, this user has been locked out.'
            );
        }
    });
});