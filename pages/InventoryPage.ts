import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
export class InventoryPage extends BasePage {
    // ==========================================
    // Locators
    // ==========================================
    private readonly pageTitle: Locator;
    private readonly inventoryList: Locator;
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.pageTitle = page.locator('.title');
        this.inventoryList = page.locator('.inventory_list');
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
    // Verify Page Elements
    // ==========================================
    async verifyPageTitle() {
        await this.verifyVisible(this.pageTitle);
    }
    async verifyInventoryList() {
        await this.verifyVisible(this.inventoryList);
    }
    async verifyProductVisible(productName: string) {
        await this.verifyVisible(
            this.getProductText(productName)
        );
    }
}