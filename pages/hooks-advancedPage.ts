import { Page, Locator } from '@playwright/test';
import { config } from '../config/env';
import user from '../testdata/users.json';
import { BasePage } from './BasePage';
export class HooksAdvancedPage extends BasePage {
    // ==========================================
    // Locators
    // ==========================================
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;
    private readonly menuButton: Locator;
    private readonly logoutButton: Locator;
    private readonly productTitle: Locator;
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutButton = page.getByText('Logout');
        this.productTitle = page.locator('.title');
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
            this.productTitle,
            'Products'
        );
    }
    // ==========================================
    // Logout
    // ==========================================
    async logout() {
        await this.click(this.menuButton);
        await this.click(this.logoutButton);
    }
    // ==========================================
    // Verify Logout
    // ==========================================
    async verifyLogout() {
        await this.verifyUrl(config.sauceDemoUrl);
    }
}