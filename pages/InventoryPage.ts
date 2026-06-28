import { Page, expect } from '@playwright/test';

export class InventoryPage {

    constructor(private page: Page) {}

    async addProduct(productName: string) {

        const product = this.page
            .locator('.inventory_item')
            .filter({ hasText: productName });

        await product.getByRole('button').click();
    }

    async verifyProductVisible(productName: string) {
        await expect(
            this.page.getByText(productName)
        ).toBeVisible();
    }
}