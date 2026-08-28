import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { AllureHelper } from "../utils/AllureHelper";
export class CartPage extends BasePage {
    // ==========================================
    // Locators
    // ==========================================
    private readonly cartLink: Locator;
    private readonly cartTitle: Locator;
    private readonly cartBadge: Locator;
    private readonly cartItems: Locator;
    private readonly checkoutButton: Locator;
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
        this.cartLink =
            page.locator(".shopping_cart_link");
        this.cartTitle =
            page.locator(".title");
        this.cartBadge =
            page.locator(".shopping_cart_badge");
        this.cartItems =
            page.locator(".cart_item");
        this.checkoutButton =
            page.locator('[data-test="checkout"]');
        this.firstNameInput =
            page.locator('[data-test="firstName"]');
        this.lastNameInput =
            page.locator('[data-test="lastName"]');
        this.postalCodeInput =
            page.locator('[data-test="postalCode"]');
        this.continueButton =
            page.locator('[data-test="continue"]');
        this.finishButton =
            page.locator('[data-test="finish"]');
        this.completeHeader =
            page.locator('[data-test="complete-header"]');
    }
    // ==========================================
    // Dynamic Locators
    // ==========================================
    private getCartProduct(
        productName: string
    ): Locator {
        return this.page
            .locator(".cart_item")
            .filter({
                hasText: productName
            });
    }
    private getRemoveButton(
        productName: string
    ): Locator {
        return this.getCartProduct(productName)
            .getByRole("button");
    }
    // ==========================================
    // Actions
    // ==========================================
    async removeProduct(
        productName: string
    ) {
        await AllureHelper.step(
            `Remove Product: ${productName}`,
            async () => {
                await this.click(
                    this.getRemoveButton(productName)
                );
            }
        );
    }
    // ==========================================
    // Verifications
    // ==========================================
    async verifyCartPage() {
        await AllureHelper.step(
            "Verify Cart Page",
            async () => {
                await this.verifyUrl(/cart/);
                await expect(
                    this.cartTitle
                ).toHaveText("Your Cart");
            }
        );
    }
    async verifyCartTitle() {
        await this.verifyVisible(
            this.cartTitle
        );
    }
    async verifyProduct(
        productName: string
    ) {
        await AllureHelper.step(
            `Verify Product: ${productName}`,
            async () => {
                await this.verifyVisible(
                    this.getCartProduct(productName)
                );
            }
        );
    }
    async verifyProductQuantityAndDescription(
        productName: string
    ) {
        await AllureHelper.step(
            `Verify Cart Details: ${productName}`,
            async () => {
                const cartProduct =
                    this.getCartProduct(productName);
                await expect(
                    cartProduct.locator(
                        ".cart_quantity"
                    )
                ).toHaveText("1");
                await expect(
                    cartProduct.locator(
                        ".inventory_item_desc"
                    )
                ).not.toBeEmpty();
            }
        );
    }
    async verifyCartBadgeCount(
        count: string
    ) {
        await this.verifyText(
            this.cartBadge,
            count
        );
    }
    async verifyCartIsEmpty() {
        await AllureHelper.step(
            "Verify Cart Is Empty",
            async () => {
                await expect(
                    this.cartItems
                ).toHaveCount(0);
                await expect(
                    this.cartBadge
                ).toHaveCount(0);
            }
        );
    }
    // ==========================================
    // Scenario 2 - Cart Validation
    // ==========================================
    async continueShopping() {
        await AllureHelper.step(
            "Continue Shopping",
            async () => {
                await this.page
                    .locator(
                        '[data-test="continue-shopping"]'
                    )
                    .click();
            }
        );
    }
    async verifyCartItemCount(
        count: number
    ) {
        await AllureHelper.step(
            `Verify Cart Item Count: ${count}`,
            async () => {
                await expect(
                    this.cartItems
                ).toHaveCount(count);
            }
        );
    }
    // ==========================================
    // Checkout Methods
    // ==========================================
    async clickCheckout() {
        await this.click(
            this.checkoutButton
        );
    }
    async fillCheckoutDetails(
        firstName: string,
        lastName: string,
        postalCode: string
    ) {
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
    async continueCheckout() {
        await this.click(
            this.continueButton
        );
    }
    async finishCheckout() {
        await this.click(
            this.finishButton
        );
    }
    async checkout(user: {
        firstName: string;
        lastName: string;
        postalCode: string;
    }) {
        await AllureHelper.step(
            "Complete Checkout",
            async () => {
                await this.clickCheckout();
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