import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
export class CartPage extends BasePage {
    // ==========================================
    // Locators
    // ==========================================
    private readonly cartLink: Locator;
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.cartLink = page.locator('.shopping_cart_link');
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
}