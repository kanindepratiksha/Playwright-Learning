import { test, expect } from '@playwright/test';
import { EnvironmentReader } from '../utils/EnvironmentReader';
import { DataValidator } from '../utils/DataValidator';
import { LoginPage } from '../pages/LoginPage';
import { config } from '../config/env';
const users = EnvironmentReader.getUsers();
// Validate environment data
DataValidator.validateUsers(users);
users.forEach((user: any) => {
    test(`Login using ${process.env.TEST_ENV || 'qa'} - ${user.username}`, async ({ page }) => {
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