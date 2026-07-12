import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { FakerUtils } from '../utils/FakerUtils';
import { config } from '../config/env';
test('Checkout using Dynamic Test Data', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const user = FakerUtils.getUser();
    await page.goto(config.sauceDemoUrl);
    await loginPage.login(
        'standard_user',
        'secret_sauce'
    );
    await inventoryPage.addProduct('Sauce Labs Backpack');
    await cartPage.openCart();
    await cartPage.verifyProduct('Sauce Labs Backpack');
    await cartPage.clickCheckout();
    await cartPage.fillCheckoutDetails(
        user.firstName,
        user.lastName,
        user.postalCode
    );
    await cartPage.continueCheckout();
    await cartPage.finishCheckout();
    await cartPage.verifyOrderSuccess();
});