import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
export class InventoryPage extends BasePage {
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
    }
    // ==========================================
    // Dynamic Locators
    // ==========================================
    private getProduct(productName: string): Locator {
        return this.page
            .locator('.inventory_item')
            .filter({ hasText: productName });
    }
    private getProductText(productName: string): Locator {
        return this.page.getByText(productName);
    }
    // ==========================================
    // Add Product to Cart
    // ==========================================
    async addProduct(productName: string) {
        await this.click(
            this.getProduct(productName)
                .getByRole('button')
        );
    }
    // ==========================================
    // Verify Product is Visible
    // ==========================================
    async verifyProductVisible(productName: string) {
        await this.verifyVisible(
            this.getProductText(productName)
        );
    }
}