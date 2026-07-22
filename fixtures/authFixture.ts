import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { config } from '../config/env';
import users from '../testdata/users.json';
type AuthFixture = {
    authenticatedPage: Page;
};
// ==========================================
// Default User
// ==========================================
const user = users[0];
export const test = base.extend<AuthFixture>({
    authenticatedPage: async ({ page }, use) => {
        await page.goto(config.sauceDemoUrl);
        const loginPage = new LoginPage(page);
        await loginPage.login(
    users[0].username,
    users[0].password
);
        await use(page);
    }
});
export { expect };