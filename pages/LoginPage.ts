import { Page, Locator, expect } from '@playwright/test';
import { testData } from '../utils/appConstants';
import { BasePage } from './BasePage';
import { Logger } from '../utils/Logger';
import { WaitUtil } from '../utils/WaitUtil';
import { RetryUtil } from '../utils/RetryUtil';
import { ScreenshotManager } from '../utils/ScreenshotManager';
import { AssertUtil } from '../utils/AssertUtil';
export class LoginPage extends BasePage {
    // ==========================================
    // Locators
    // ==========================================
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;
    constructor(page: Page) {
        super(page);
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', {
            name: testData.loginButton
        });
        this.errorMessage = page.locator('[data-test="error"]');
    }
    // ==========================================
    // Login
    // ==========================================
    async login(
        user: string,
        pass: string,
        shouldLogin: boolean = true
    ) {
        await this.fill(this.usernameInput, user);
        await this.fill(this.passwordInput, pass);
        await this.click(this.loginButton);
        if (shouldLogin) {
            await expect(this.page).toHaveURL(/inventory/);
        }
    }
    
    // ==========================================
    // Verify Login Page
    // ==========================================
    async verifyLoginPage() {
        await this.verifyVisible(this.usernameInput);
        await this.verifyVisible(this.passwordInput);
        await this.verifyVisible(this.loginButton);
    }
    // ==========================================
    // Verify Login Successful
    // ==========================================
    async verifyLoginSuccess() {
        await this.verifyUrl(/inventory/);
    }
    // ==========================================
    // Verify Error Message
    // ==========================================
    async verifyErrorMessage(message: string) {
        await expect(this.errorMessage).toContainText(message);
    }
}