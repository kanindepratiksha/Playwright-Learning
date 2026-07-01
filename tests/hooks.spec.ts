import { test } from '@playwright/test';
import { HooksPage } from '../pages/HooksPage';

let hooksPage: HooksPage;

test.beforeAll(async () => {

    console.log('Before All');

});

test.beforeEach(async ({ page }) => {

    hooksPage = new HooksPage(page);

    console.log('Before Each');

    await hooksPage.navigate();
    await hooksPage.login();

});

test.afterEach(async () => {

    console.log('After Each');

});

test.afterAll(async () => {

    console.log('After All');

});

test.describe('Hooks Demo', () => {

    test('Verify Login', async () => {

        await hooksPage.verifyLogin();

    });

    test('Verify Logout', async () => {

        await hooksPage.logout();
        await hooksPage.verifyLogout();

    });

});