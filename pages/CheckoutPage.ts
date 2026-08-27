import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { AllureHelper } from "../utils/AllureHelper";
export class CheckoutPage extends BasePage {
    // ==========================================
    // Locators
    // ==========================================
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly postalCodeInput: Locator;
    private readonly continueButton: Locator;
    private readonly finishButton: Locator;
    private readonly completeHeader: Locator;
    private readonly cancelButton: Locator;
    private readonly pageTitle: Locator;
    private readonly backHomeButton: Locator;
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.locator(
            '[data-test="firstName"]'
        );
        this.lastNameInput = page.locator(
            '[data-test="lastName"]'
        );
        this.postalCodeInput = page.locator(
            '[data-test="postalCode"]'
        );
        this.continueButton = page.locator(
            '[data-test="continue"]'
        );
        this.finishButton = page.locator(
            '[data-test="finish"]'
        );
        this.completeHeader = page.locator(
            '[data-test="complete-header"]'
        );
        this.cancelButton = page.locator(
            '[data-test="cancel"]'
        );
        this.pageTitle = page.locator(
            ".title"
        );
        this.backHomeButton = page.locator(
            '[data-test="back-to-products"]'
        );
    }
    // ==========================================
    // Actions
    // ==========================================
    async fillCheckoutDetails(
        firstName: string,
        lastName: string,
        postalCode: string
    ) {
        await AllureHelper.step(
            "Fill Checkout Details",
            async () => {
                await this.fill(
                    this.firstNameInput,
                    firstName
                );
                await this.fill(
                    this.lastNameInput,
                    lastName
                );
                await this.fill(
                    this.postalCodeInput,
                    postalCode
                );
            }
        );
    }
    async continueCheckout() {
        await AllureHelper.step(
            "Continue Checkout",
            async () => {
                await this.click(
                    this.continueButton
                );
            }
        );
    }
    async finishCheckout() {
        await AllureHelper.step(
            "Finish Checkout",
            async () => {
                await this.click(
                    this.finishButton
                );
            }
        );
    }
    async cancelCheckout() {
        await AllureHelper.step(
            "Cancel Checkout",
            async () => {
                await this.click(
                    this.cancelButton
                );
            }
        );
    }
    async backHome() {
        await AllureHelper.step(
            "Back Home",
            async () => {
                await this.click(
                    this.backHomeButton
                );
                await expect(
                    this.page
                ).toHaveURL(/inventory/);
            }
        );
    }
    // ==========================================
    // Complete Checkout
    // ==========================================
    async completeCheckout(user: {
        firstName: string;
        lastName: string;
        postalCode: string;
    }) {
        await AllureHelper.step(
            "Complete Checkout",
            async () => {
                await this.fillCheckoutDetails(
                    user.firstName,
                    user.lastName,
                    user.postalCode
                );
                await this.continueCheckout();
                await this.finishCheckout();
            }
        );
    }
    // ==========================================
    // Verifications
    // ==========================================
    async verifyOrderSuccess() {
        await AllureHelper.step(
            "Verify Order Success",
            async () => {
                await this.verifyVisible(
                    this.completeHeader
                );
            }
        );
    }
    // ==========================================
    // Scenario 2
    // Checkout Information Page
    // ==========================================
    async verifyCheckoutInformationPage() {
        await AllureHelper.step(
            "Verify Checkout Information Page",
            async () => {
                await expect(
                    this.page
                ).toHaveURL(
                    /checkout-step-one/
                );
                await expect(
                    this.pageTitle
                ).toHaveText(
                    "Checkout: Your Information"
                );
                await expect(
                    this.firstNameInput
                ).toBeVisible();
                await expect(
                    this.lastNameInput
                ).toBeVisible();
                await expect(
                    this.postalCodeInput
                ).toBeVisible();
                await expect(
                    this.continueButton
                ).toBeVisible();
                await expect(
                    this.cancelButton
                ).toBeVisible();
            }
        );
    }
    // ==========================================
    // Scenario 2
    // Checkout Overview Page
    // ==========================================
    async verifyCheckoutOverviewPage() {
        await AllureHelper.step(
            "Verify Checkout Overview Page",
            async () => {
                await expect(
                    this.page
                ).toHaveURL(
                    /checkout-step-two/
                );
                await expect(
                    this.pageTitle
                ).toHaveText(
                    "Checkout: Overview"
                );
                await expect(
                    this.finishButton
                ).toBeVisible();
                await expect(
                    this.cancelButton
                ).toBeVisible();
            }
        );
    }
    // ==========================================
    // Scenario 2
    // Error Message Validation
    // ==========================================
    async verifyErrorMessage(
        message: string
    ) {
        await AllureHelper.step(
            `Verify Error Message: ${message}`,
            async () => {
                const errorMessage =
                    this.page.locator(
                        '[data-test="error"]'
                    );
                await expect(
                    errorMessage
                ).toBeVisible();
                await expect(
                    errorMessage
                ).toContainText(
                    message
                );
            }
        );
    }
    // ==========================================
    // Scenario 2
    // Checkout Complete Page
    // ==========================================
    async verifyCheckoutCompletePage() {
    await AllureHelper.step(
        "Verify Checkout Complete Page",
        async () => {

            await expect(
                this.page
            ).toHaveURL(
                /checkout-complete/
            );

            await expect(
                this.pageTitle
            ).toHaveText(
                "Checkout: Complete!"
            );

            await expect(
                this.completeHeader
            ).toHaveText(
                "Thank you for your order!"
            );

            await expect(
                this.completeHeader
            ).toBeVisible();

            await expect(
                this.backHomeButton
            ).toBeVisible();
        }
    );
}
    // ==========================================
    // Scenario 2
    // Verify Login Navigation After Logout
    // ==========================================
    async verifyLoginPage() {
        await AllureHelper.step(
            "Verify Login Page",
            async () => {
                await expect(
                    this.page
                ).toHaveURL(/\/$/);
                await expect(
                    this.page
                ).toHaveTitle(
                    "Swag Labs"
                );
            }
        );
    }
}