import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
export class CartPage extends BasePage {
    // ==========================================
    // Locators
    // ==========================================
    private readonly cartTitle: Locator;
    private readonly cartBadge: Locator;
    private readonly checkoutButton: Locator;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly postalCode: Locator;
    private readonly continueButton: Locator;
    private readonly finishButton: Locator;
    private readonly completeHeader: Locator;
    private readonly cartItems: Locator;
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.cartTitle = page.locator('.title');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.checkoutButton = page.locator('#checkout');
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.postalCode = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.finishButton = page.locator('#finish');
        this.completeHeader = page.locator('.complete-header');
        this.cartItems = page.locator('.cart_item');
    }
    // ==========================================
    // Dynamic Locator - Product
    // ==========================================
    private getProduct(productName: string): Locator {
        return this.page.getByText(productName);
    }
    // ==========================================
    // Dynamic Locator - Remove Button
    // ==========================================
    private getRemoveButton(productName: string): Locator {
        return this.page
            .locator('.cart_item')
            .filter({ hasText: productName })
            .getByRole('button', { name: 'Remove' });
    }
    // ==========================================
    // Verify Cart Page
    // ==========================================
    async verifyCartPage() {
        await this.verifyVisible(this.cartTitle);
    }
    // ==========================================
    // Verify Product
    // ==========================================
    async verifyProduct(productName: string) {
        await this.verifyVisible(
            this.getProduct(productName)
        );
    }
    // ==========================================
    // Remove Product
    // ==========================================
    async removeProduct(productName: string) {
        await this.click(
            this.getRemoveButton(productName)
        );
    }
    // ==========================================
    // Verify Cart Empty
    // ==========================================
    async verifyCartEmpty() {
        await this.verifyCount(
            this.cartItems,
            0
        );
    }
    // ==========================================
    // Verify Cart Badge Count
    // ==========================================
    async verifyCartCount(count: string) {
        await this.verifyText(
            this.cartBadge,
            count
        );
    }
    // ==========================================
    // Checkout
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
        await this.verifyText(
            this.completeHeader,
            'Thank you for your order!'
        );
    }
}