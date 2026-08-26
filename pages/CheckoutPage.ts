import { Page, Locator } from "@playwright/test";
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
                await this.click(this.continueButton);
            }
        );
    }
    async finishCheckout() {
        await AllureHelper.step(
            "Finish Checkout",
            async () => {
                await this.click(this.finishButton);
            }
        );
    }
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
}