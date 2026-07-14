import { Page, Locator, expect } from '@playwright/test';
import { config } from '../config/env';
import users from '../testdata/users.json';
import { BasePage } from './BasePage';
const user = users[0];
export class HooksAdvancedPage extends BasePage {
    // ==========================================
    // Locators
    // ==========================================
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;
    private readonly menuButton: Locator;
    private readonly logoutButton: Locator;
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutButton = page.locator('#logout_sidebar_link');
    }
    // ==========================================
    // Dynamic Locator
    // ==========================================
    private getProductTitle(): Locator {
        return this.page.locator('.title');
    }
    // ==========================================
    // Navigate
    // ==========================================
    async navigate() {
        await super.navigate(config.sauceDemoUrl);
    }
    // ==========================================
    // Login
    // ==========================================
    async login() {
        await this.fill(this.username, user.username);
        await this.fill(this.password, user.password);
        await this.click(this.loginButton);
    }
    // ==========================================
    // Verify Login
    // ==========================================
    async verifyLogin() {
        await this.verifyText(
            this.getProductTitle(),
            'Products'
        );
    }
    // ==========================================
    // Logout
    // ==========================================
    async logout() {
    // Click menu
    await this.menuButton.click();
    // Wait until Logout button becomes visible
    await this.logoutButton.waitFor({
        state: 'visible',
        timeout: 10000
    });
    // Click Logout
    await this.logoutButton.click();
}
    // ==========================================
    // Verify Logout
    // ==========================================
    async verifyLogout() {
        await this.verifyUrl(config.sauceDemoUrl);
    }
}