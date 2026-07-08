import { Page, Locator } from '@playwright/test';
import { testData } from '../utils/appConstants';
import { BasePage } from './BasePage';
export class LoginPage extends BasePage {
    // ==========================================
    // Locators
    // ==========================================
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', {
            name: testData.loginButton
        });
    }
    // ==========================================
    // Login to Application
    // ==========================================
    async login(user: string, pass: string) {
        await this.fill(this.username, user);
        await this.fill(this.password, pass);
        await this.click(this.loginButton);
    }
}