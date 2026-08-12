import { expect, Page } from "@playwright/test";
import { test as base } from "../tests/hooks/reporting/uiAllureHooks";
import { LoginPage } from "../pages/LoginPage";
import { config } from "../config/env";
import users from "../testdata/users.json";
type AuthFixture = {
    authenticatedPage: Page;
};
// ==========================================
// Default User
// ==========================================
const user = users[0];
export const test = base.extend<AuthFixture>({
    authenticatedPage: async ({ page }, use) => {
        await page.goto(config.sauceDemoUrl, {
            waitUntil: "commit"
        });
        const loginPage = new LoginPage(page);
        await loginPage.login(
            user.username,
            user.password
        );
        await use(page);
    }
});
export { expect };