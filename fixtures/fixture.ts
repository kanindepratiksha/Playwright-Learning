import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { config } from '../config/env';
import users from '../testdata/users.json';
type MyFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
};
export const test = base.extend<MyFixtures>({
    loginPage: [
        async ({ page }, use) => {
            console.log('LoginPage Fixture Setup');
            await page.goto(config.sauceDemoUrl, {
                waitUntil: "domcontentloaded"
            });
            const loginPage = new LoginPage(page);
            await use(loginPage);
            console.log('LoginPage Fixture Cleanup');
        },
        { timeout: 90_000 }
    ],
    inventoryPage: async ({ page, loginPage }, use) => {
        console.log('Inventory Fixture Setup');
        await loginPage.login(
            users[0].username,
            users[0].password
        );
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
        console.log('Inventory Fixture Cleanup');
    },
    cartPage: async ({ page }, use) => {
        console.log('Cart Fixture Setup');
        const cartPage = new CartPage(page);
        await use(cartPage);
        console.log('Cart Fixture Cleanup');
    },
    checkoutPage: async ({ page }, use) => {
        console.log('Checkout Fixture Setup');
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
        console.log('Checkout Fixture Cleanup');
    }
});
export { expect };