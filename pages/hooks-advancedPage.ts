import { Page, Locator, expect } from '@playwright/test';
import { config } from '../config/env';
import user from '../testdata/users.json';
export class HooksAdvancedPage  {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly menuButton: Locator;
    readonly logoutButton: Locator;
    readonly productTitle: Locator;
    constructor(page: Page) {
        this.page = page;
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', {
            name: 'Login'
        });
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutButton = page.getByText('Logout');
        this.productTitle = page.locator('.title');
    }
    // ==========================================
    // Navigate
    // ==========================================
    async navigate() {
        await this.page.goto(config.sauceDemoUrl);
    }
    // ==========================================
    // Login
    // ==========================================
    async login() {
        await this.username.fill(user.username);
        await this.password.fill(user.password);
        await this.loginButton.click();
    }
    // ==========================================
    // Verify Login
    // ==========================================
    async verifyLogin() {
        await expect(this.productTitle)
            .toHaveText('Products');
    }
    // ==========================================
    // Logout
    // ==========================================
    async logout() {
        await this.menuButton.click();
        await this.logoutButton.click();
    }
    // ==========================================
    // Verify Logout
    // ==========================================
    async verifyLogout() {
        await expect(this.page)
            .toHaveURL(config.sauceDemoUrl);
    }
}