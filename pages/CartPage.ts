import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
export class CartPage extends BasePage {
    // ==========================================
    // Locators
    // ==========================================
    private readonly cartLink: Locator;
    private readonly cartTitle: Locator;
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.cartLink = page.locator('.shopping_cart_link');
        this.cartTitle = page.locator('.title');
    }
    // ==========================================
    // Open Cart
    // ==========================================
    async openCart() {
        await this.click(this.cartLink);
    }
    // ==========================================
    // Verify Cart Page
    // ==========================================
    async verifyCartTitle() {
        await this.verifyVisible(this.cartTitle);
    }
    // ==========================================
    // Cart Product Locators
    // ==========================================
    private getCartProduct(productName: string): Locator {
        return this.page.getByText(productName);
    }
    // ==========================================
    // Verify Product in Cart
    // ==========================================
    async verifyProduct(productName: string) {
        await this.verifyVisible(
            this.getCartProduct(productName)
        );
    }
}