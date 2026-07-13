import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { config } from '../config/env';
import users from '../testdata/users.json';
type MyFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
};
export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        console.log('LoginPage Fixture Setup');
        await page.goto(config.sauceDemoUrl);
        const loginPage = new LoginPage(page);
        await use(loginPage);
        console.log('LoginPage Fixture Cleanup');
    },
    inventoryPage: async ({ page, loginPage }, use) => {
        console.log('Inventory Fixture Setup');
        await loginPage.login(users[0]);
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
        console.log('Inventory Fixture Cleanup');
    }
});
export { expect };