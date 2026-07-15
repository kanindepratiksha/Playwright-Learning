import { Page, Locator } from '@playwright/test';
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
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', {
            name: testData.loginButton
        });
    }
    // ==========================================
    // Actions
    // ==========================================
    async enterUsername(username: string) {
        await this.fill(this.usernameInput, username);
    }
    async enterPassword(password: string) {
        await this.fill(this.passwordInput, password);
    }
    async clickLogin() {
    await RetryUtil.execute(async () => {
        await this.click(this.loginButton);
    });
}
    async login(username: string, password: string) {
    Logger.info('Entering Username');
    await this.enterUsername(username);
    Logger.info('Entering Password');
    await this.enterPassword(password);
    Logger.info('Clicking Login');
    await RetryUtil.execute(async () => {
        await this.clickLogin();
    });
    await WaitUtil.waitForPageLoad(this.page);
    await ScreenshotManager.capture(
        this.page,
        'LoginSuccess'
    );
    Logger.info('Login Successful');
}
    // ==========================================
    // Validations
    // ==========================================
    async verifyLoginPageDisplayed() {
        await AssertUtil.visible(this.loginButton);
    }
}