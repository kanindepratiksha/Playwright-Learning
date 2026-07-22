import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
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
        this.cartLink = page.locator('.shopping_cart_link');
        this.cartTitle = page.locator('.title');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.completeHeader = page.locator('[data-test="complete-header"]');
    }
    // ==========================================
    // Dynamic Locators
    // ==========================================
    private getCartProduct(productName: string): Locator {
        return this.page
            .locator('.cart_item')
            .filter({ hasText: productName });
    }
    private getRemoveButton(productName: string): Locator {
        return this.getCartProduct(productName)
            .getByRole('button');
    }
    // ==========================================
    // Actions
    // ==========================================
    async removeProduct(productName: string) {
        await this.click(
            this.getRemoveButton(productName)
        );
    }
    // ==========================================
    // Verifications
    // ==========================================
    async verifyCartPage() {
        await this.verifyUrl(/cart/);
    }
    async verifyCartTitle() {
        await this.verifyVisible(this.cartTitle);
    }
    async verifyProduct(productName: string) {
        await this.verifyVisible(
            this.getCartProduct(productName)
        );
    }
    async verifyCartBadgeCount(count: string) {
        await this.verifyText(
            this.cartBadge,
            count
        );
    }
    async verifyCartIsEmpty() {
        await expect(this.cartItems).toHaveCount(0);
    }
    // ==========================================
    // Checkout Methods
    // ==========================================
    async clickCheckout() {
        await this.click(this.checkoutButton);
    }
    async fillCheckoutDetails(
        firstName: string,
        lastName: string,
        postalCode: string
    ) {
        await this.fill(this.firstNameInput, firstName);
        await this.fill(this.lastNameInput, lastName);
        await this.fill(this.postalCodeInput, postalCode);
    }
    async continueCheckout() {
        await this.click(this.continueButton);
    }
    async finishCheckout() {
        await this.click(this.finishButton);
    }
    async verifyOrderSuccess() {
        await this.verifyVisible(this.completeHeader);
    }
}