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

    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {

        this.page = page;

        this.cartLink = page.locator('.shopping_cart_link');

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

}