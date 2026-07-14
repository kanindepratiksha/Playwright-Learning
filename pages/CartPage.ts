import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
export class CartPage extends BasePage {
    // ==========================================
    // Locators
    // ==========================================
    private readonly cartLink: Locator;
    private readonly checkoutButton: Locator;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly postalCode: Locator;
    private readonly continueButton: Locator;
    private readonly finishButton: Locator;
    private readonly completeHeader: Locator;
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.cartLink = page.locator('.shopping_cart_link');
        this.checkoutButton = page.locator('#checkout');
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.postalCode = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.finishButton = page.locator('#finish');
        this.completeHeader = page.locator('.complete-header');
    }
    // ==========================================
    // Open Cart
    // ==========================================
    async openCart() {
        await this.click(this.cartLink);
    }
    // ==========================================
    // Verify Product in Cart
    // ==========================================
    async verifyProduct(productName: string) {
        await this.verifyVisible(
            this.page.getByText(productName)
        );
    }
    // ==========================================
    // Click Checkout
    // ==========================================
    async clickCheckout() {
        await this.click(this.checkoutButton);
    }
    // ==========================================
    // Fill Checkout Details
    // ==========================================
    async fillCheckoutDetails(
        firstName: string,
        lastName: string,
        postalCode: string
    ) {
        await this.fill(this.firstName, firstName);
        await this.fill(this.lastName, lastName);
        await this.fill(this.postalCode, postalCode);
    }
    // ==========================================
    // Continue Checkout
    // ==========================================
    async continueCheckout() {
        await this.click(this.continueButton);
    }
    // ==========================================
    // Finish Checkout
    // ==========================================
    async finishCheckout() {
        await this.click(this.finishButton);
    }
    // ==========================================
    // Verify Order Success
    // ==========================================
    async verifyOrderSuccess() {
        await expect(this.completeHeader)
            .toHaveText('Thank you for your order!');
    }
}