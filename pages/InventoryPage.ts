import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {

    // ==========================================
    // Page Object
    // ==========================================
    readonly page: Page;

    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {

        this.page = page;

    }

    // ==========================================
    // Add Product to Cart
    // ==========================================
    async addProduct(productName: string) {

        const product: Locator = this.page
            .locator('.inventory_item')
            .filter({ hasText: productName });

        await product
            .getByRole('button')
            .click();

    }

    // ==========================================
    // Verify Product is Visible
    // ==========================================
    async verifyProductVisible(productName: string) {

        await expect(
            this.page.getByText(productName)
        ).toBeVisible();

    }

}