import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { config } from '../config/env';
import { TestDataFactory } from '../utils/TestDataFactory';
import { DataValidator } from '../utils/DataValidator';
import { ExcelUser, LoginUser } from '../utils/types';
const users = TestDataFactory.getExcelUsers();
const normalizedUsers: LoginUser[] = users.map(
    (user: ExcelUser) => ({
        username: user.Username,
        password: user.Password,
        expected: user.Expected
    })
);
DataValidator.validateUsers(normalizedUsers);
normalizedUsers.forEach((user: LoginUser) => {
    test(`Login with ${user.username}`, async ({ page }) => {
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
});