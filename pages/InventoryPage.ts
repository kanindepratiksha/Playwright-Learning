import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
export class InventoryPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    private getProduct(productName: string): Locator {
        return this.page
            .locator('.inventory_item')
            .filter({ hasText: productName });
    }
    async addProduct(productName: string) {
        await this.getProduct(productName)
            .getByRole('button')
            .click();
    }
    async verifyProductVisible(productName: string) {
        await this.verifyVisible(
            this.page.getByText(productName)
        );
    }
}