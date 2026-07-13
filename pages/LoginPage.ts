import { Page, Locator } from '@playwright/test';
import { testData } from '../utils/appConstants';
export class LoginPage {
    // ==========================================
    // Page Object
    // ==========================================
    readonly page: Page;
    // ==========================================
    // Locators
    // ==========================================
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        this.page = page;
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', {
            name: testData.loginButton
        });
    }
    // ==========================================
    // Login to Application
    // ==========================================
    async login(user: any) {
    await this.username.fill(user.username);
    await this.password.fill(user.password);
    await this.loginButton.click();
}
}