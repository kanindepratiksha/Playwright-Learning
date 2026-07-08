import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
type MyFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
};
export const test = base.extend<MyFixtures>({
    // -----------------------------
    // Feature 2 - Custom Fixture
    // -----------------------------
    loginPage: async ({ page }, use) => {
        console.log('LoginPage Fixture Setup');
        await page.goto('https://www.saucedemo.com/');
        const loginPage = new LoginPage(page);
        await use(loginPage);
        console.log('LoginPage Fixture Cleanup');
    },
    // -----------------------------
    // Feature 5 - Fixture Dependency
    // inventoryPage depends on loginPage
    // -----------------------------
    inventoryPage: async ({ page, loginPage }, use) => {
        console.log('Inventory Fixture Setup');
        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
        console.log('Inventory Fixture Cleanup');
    }
});
export { expect };