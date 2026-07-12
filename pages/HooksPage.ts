import { Page, Locator, expect } from '@playwright/test';
import { config } from '../config/env';
import users from '../testdata/users.json';

export class HooksPage {

    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly menuButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutButton = page.getByText('Logout');
    }

    async navigate() {

        await this.page.goto(config.sauceDemoUrl);

    }

    async login() {
        const user = users[0];

        await this.username.fill(user.username);
        await this.password.fill(user.password);
        await this.loginButton.click();

    }

    async verifyLogin() {

        await expect(this.page.locator('.title'))
            .toHaveText('Products');

    }

    async logout() {

        await this.menuButton.click();
        await this.logoutButton.click();

    }

    async verifyLogout() {

        await expect(this.page)
            .toHaveURL(config.sauceDemoUrl);

    }
}