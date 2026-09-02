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
    private readonly cancelButton: Locator;
    private readonly pageTitle: Locator;
    private readonly backHomeButton: Locator;
    private readonly errorMessage: Locator;
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.firstNameInput =
            page.getByTestId("firstName");
        this.lastNameInput =
            page.getByTestId("lastName");
        this.postalCodeInput =
            page.getByTestId("postalCode");
        this.continueButton =
            page.getByTestId("continue");
        this.finishButton =
            page.getByTestId("finish");
        this.completeHeader =
            page.getByTestId("complete-header");
        this.cancelButton =
            page.getByTestId("cancel");
        this.pageTitle =
            page.locator(".title");
        this.backHomeButton =
            page.getByTestId("back-to-products");
        this.errorMessage =
            page.getByTestId("error");
    }
    // ==========================================
    // Public Locators
    // ==========================================
    get firstNameField(): Locator {
        return this.firstNameInput;
    }
    get lastNameField(): Locator {
        return this.lastNameInput;
    }
    get postalCodeField(): Locator {
        return this.postalCodeInput;
    }
    get continueBtn(): Locator {
        return this.continueButton;
    }
    get finishBtn(): Locator {
        return this.finishButton;
    }
    get cancelBtn(): Locator {
        return this.cancelButton;
    }
    get checkoutTitle(): Locator {
        return this.pageTitle;
    }
    get orderCompleteHeader(): Locator {
        return this.completeHeader;
    }
    get backHomeBtn(): Locator {
        return this.backHomeButton;
    }
    get errorMsg(): Locator {
        return this.errorMessage;
    }
    // ==========================================
    // Actions
    // ==========================================
    async fillCheckoutDetails(
        firstName: string,
        lastName: string,
        postalCode: string
    ): Promise<void> {
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
    async continueCheckout(): Promise<void> {
        await AllureHelper.step(
            "Continue Checkout",
            async () => {
                await this.click(
                    this.continueButton
                );
            }
        );
    }
    async finishCheckout(): Promise<void> {
        await AllureHelper.step(
            "Finish Checkout",
            async () => {
                await this.click(
                    this.finishButton
                );
            }
        );
    }
    async cancelCheckout(): Promise<void> {
        await AllureHelper.step(
            "Cancel Checkout",
            async () => {
                await this.click(
                    this.cancelButton
                );
            }
        );
    }
    async backHome(): Promise<void> {
        await AllureHelper.step(
            "Back Home",
            async () => {
                await this.click(
                    this.backHomeButton
                );
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
    }): Promise<void> {
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
}