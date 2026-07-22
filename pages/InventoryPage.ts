import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
export class InventoryPage extends BasePage {
    // ==========================================
    // Locators
    // ==========================================
    private readonly pageTitle: Locator;
    private readonly inventoryList: Locator;
    private readonly inventoryItems: Locator;
    private readonly firstInventoryItem: Locator;
    private readonly cartBadge: Locator;
    private readonly sortDropdown: Locator;
    private readonly firstProduct: Locator;
    private readonly firstPrice: Locator;
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.pageTitle = page.locator('.title');
        this.inventoryList = page.locator('.inventory_list');
        this.inventoryItems = page.locator('.inventory_item');
        this.firstInventoryItem = this.inventoryItems.first();
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sortDropdown = page.locator(
            '[data-test="product-sort-container"]'
        );
        this.firstProduct = page
            .locator('.inventory_item_name')
            .first();
        this.firstPrice = page
            .locator('.inventory_item_price')
            .first();
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
    // Actions
    // ==========================================
    async addProduct(productName: string) {
        await this.click(
            this.getProduct(productName)
                .getByRole('button')
        );
    }
    async hoverFirstProduct() {
        await this.firstInventoryItem.hover();
    }
    async sortProducts(option: string) {
        await this.sortDropdown.selectOption(option);
    }
    // ==========================================
    // Verifications
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
    async verifyFirstInventoryItemVisible() {
        await this.verifyVisible(
            this.firstInventoryItem
        );
    }
    async verifyLastInventoryItemVisible() {
        await this.verifyVisible(
            this.inventoryItems.last()
        );
    }
    async verifyInventoryItemVisible(index: number) {
        await this.verifyVisible(
            this.inventoryItems.nth(index)
        );
    }
    async verifyCartBadgeCount(count: string) {
        await this.verifyText(
            this.cartBadge,
            count
        );
    }
    async verifySelectedSortOption(option: string) {
        await expect(this.sortDropdown)
            .toHaveValue(option);
    }
    async verifyFirstProduct(productName: string) {
        await this.verifyText(
            this.firstProduct,
            productName
        );
    }
    async verifyFirstPrice(price: string) {
        await this.verifyText(
            this.firstPrice,
            price
        );
    }
}