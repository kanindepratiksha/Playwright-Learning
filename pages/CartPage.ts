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
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.cartLink = page.locator('.shopping_cart_link');
        this.cartTitle = page.locator('.title');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartItems = page.locator('.cart_item');
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
    async openCart() {
        await this.click(this.cartLink);
    }
    async removeProduct(productName: string) {
        await this.click(
            this.getRemoveButton(productName)
        );
    }
    // ==========================================
    // Verifications
    // ==========================================
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
}