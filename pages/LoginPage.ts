import { Page, Locator } from "@playwright/test";
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
        this.usernameInput =
            page.getByPlaceholder("Username");
        this.passwordInput =
            page.getByPlaceholder("Password");
        this.loginButton =
            page.getByRole("button", {
                name: testData.loginButton
            });
        this.errorMessage =
            page.getByTestId("error");
    }
    // ==========================================
    // Public Locators
    // ==========================================
    get usernameField(): Locator {
        return this.usernameInput;
    }
    get passwordField(): Locator {
        return this.passwordInput;
    }
    get loginBtn(): Locator {
        return this.loginButton;
    }
    get errorMsg(): Locator {
        return this.errorMessage;
    }
    // ==========================================
    // Actions
    // ==========================================
    async login(
        user: string,
        pass: string
    ): Promise<void> {
        await AllureHelper.step(
            "Login with User",
            async () => {
                await this.fill(
                    this.usernameInput,
                    user
                );
                await this.fill(
                    this.passwordInput,
                    pass
                );
                await this.click(
                    this.loginButton
                );
            }
        );
    }
}