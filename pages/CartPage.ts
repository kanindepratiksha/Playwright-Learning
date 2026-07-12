import { Page, Locator, expect } from '@playwright/test';
export class CartPage {
    // ==========================================
    // Page Object
    // ==========================================
    readonly page: Page;
    // ==========================================
    // Locators
    // ==========================================
    readonly cartLink: Locator;
    readonly checkoutButton: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly completeHeader: Locator;
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        this.page = page;
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
        await this.cartLink.click();
    }
    // ==========================================
    // Verify Product in Cart
    // ==========================================
    async verifyProduct(productName: string) {
        await expect(
            this.page.getByText(productName)
        ).toBeVisible();
    }
    // ==========================================
    // Click Checkout
    // ==========================================
    async clickCheckout() {
        await this.checkoutButton.click();
    }
    // ==========================================
    // Fill Checkout Details
    // ==========================================
    async fillCheckoutDetails(
        firstName: string,
        lastName: string,
        postalCode: string
    ) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    }
    // ==========================================
    // Continue Checkout
    // ==========================================
    async continueCheckout() {
        await this.continueButton.click();
    }
    // ==========================================
    // Finish Checkout
    // ==========================================
    async finishCheckout() {
        await this.finishButton.click();
    }
    // ==========================================
    // Verify Order Success
    // ==========================================
    async verifyOrderSuccess() {
        await expect(this.completeHeader)
            .toHaveText('Thank you for your order!');
    }
}