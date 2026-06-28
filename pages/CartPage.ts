import { Page, expect } from '@playwright/test';

export class CartPage {

    constructor(private page: Page) {}

    cartLink = this.page.locator('.shopping_cart_link');

    async openCart() {
        await this.cartLink.click();
    }

    async verifyProduct(productName: string) {
        await expect(
            this.page.getByText(productName)
        ).toBeVisible();
    }
}