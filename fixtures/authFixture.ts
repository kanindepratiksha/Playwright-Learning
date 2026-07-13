import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { config } from '../config/env';
import users from '../testdata/users.json';
type AuthFixture = {
    authenticatedPage: Page;
};
export const test = base.extend<AuthFixture>({
    authenticatedPage: async ({ page }, use) => {
        await page.goto(config.sauceDemoUrl);
        const loginPage = new LoginPage(page);
        await loginPage.login(
            users.username,
            users.password
        );
        await use(page);
    }
});
export { expect };