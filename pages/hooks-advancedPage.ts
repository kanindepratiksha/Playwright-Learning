import { Page, Locator } from '@playwright/test';
import { config } from '../config/env';
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
        this.logoutButton = page.locator('#logout_sidebar_link');
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
    async login(username: string, password: string) {
        await this.fill(this.username, username);
        await this.fill(this.password, password);
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
        await this.verifyVisible(this.logoutButton);
        await this.click(this.logoutButton);
    }
    // ==========================================
    // Verify Logout
    // ==========================================
    async verifyLogout() {
        await this.verifyUrl(config.sauceDemoUrl);
    }
}