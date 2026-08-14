import { Page, Locator, expect } from "@playwright/test";
import { testData } from "../utils/appConstants";
import { BasePage } from "./BasePage";
import { AllureHelper } from "../utils/AllureHelper";
export class LoginPage extends BasePage {
    // ==========================================
    // Locators
    // ==========================================
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.usernameInput = page.getByPlaceholder("Username");
        this.passwordInput = page.getByPlaceholder("Password");
        this.loginButton = page.getByRole("button", {
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
        await AllureHelper.step(
            "Login with Valid User",
            async () => {
                await this.fill(this.usernameInput, user);
                await this.fill(this.passwordInput, pass);
                await this.click(this.loginButton);
                if (shouldLogin) {
                    await expect(this.page).toHaveURL(/inventory/);
                }
            }
        );
    }
    // ==========================================
    // Verify Login Page
    // ==========================================
    async verifyLoginPage() {
        await AllureHelper.step(
            "Verify Login Page",
            async () => {
                await this.verifyVisible(this.usernameInput);
                await this.verifyVisible(this.passwordInput);
                await this.verifyVisible(this.loginButton);
            }
        );
    }
    // ==========================================
    // Verify Login Successful
    // ==========================================
    async verifyLoginSuccess() {
        await AllureHelper.step(
            "Verify Login Success",
            async () => {
                await this.verifyUrl(/inventory/);
            }
        );
    }
    // ==========================================
    // Verify Error Message
    // ==========================================
    async verifyErrorMessage(message: string) {
        await AllureHelper.step(
            "Verify Error Message",
            async () => {
                await expect(this.errorMessage).toContainText(message);
            }
        );
    }
}