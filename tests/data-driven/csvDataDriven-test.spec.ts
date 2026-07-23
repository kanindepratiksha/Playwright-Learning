import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { config } from '../../config/env';
import { TestDataFactory } from '../../utils/TestDataFactory';
import { DataValidator } from '../../utils/DataValidator';
let normalizedUsers: any[] = [];
test.beforeAll(async () => {
    const users = await TestDataFactory.getCsvUsers();
    normalizedUsers = users.map((user: any) => ({
        username: user.Username,
        password: user.Password,
        expected: user.Expected
    }));
    DataValidator.validateUsers(normalizedUsers);
});
test.describe('CSV Data Driven Testing', () => {
    test('Login Tests from CSV', async ({ page }) => {
        for (const user of normalizedUsers) {
            await test.step(`Login with ${user.username}`, async () => {
                const loginPage = new LoginPage(page);
                await page.goto(config.sauceDemoUrl);
                if (user.expected.toLowerCase() === 'success') {
                    await loginPage.login(
                        user.username,
                        user.password
                    );
                    await expect(page).toHaveURL(/inventory/);
                } else {
                    await loginPage.login(
                        user.username,
                        user.password,
                        false
                    );
                    await loginPage.verifyErrorMessage(
                        'Epic sadface: Sorry, this user has been locked out.'
                    );
                }
            });
        }
    });
});