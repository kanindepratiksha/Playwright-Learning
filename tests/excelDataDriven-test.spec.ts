import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { config } from '../config/env';
import { TestDataFactory } from '../utils/TestDataFactory';
import { DataValidator } from '../utils/DataValidator';
const users = TestDataFactory.getExcelUsers();
const normalizedUsers = users.map((user: any) => ({
    username: user.Username,
    password: user.Password,
    expected: user.Expected
}));
DataValidator.validateUsers(normalizedUsers);
normalizedUsers.forEach((user) => {
    test(`Login with ${user.username}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await page.goto(config.sauceDemoUrl);
        await loginPage.login(
            user.username,
            user.password
        );
        if (user.expected === 'success') {
            await expect(page).toHaveURL(/inventory/);
        } else {
            await expect(
                page.locator('[data-test="error"]')
            ).toContainText(
                'Sorry, this user has been locked out.'
            );
        }
    });
});