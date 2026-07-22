import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/Logger';
import { WaitUtil } from '../utils/WaitUtil';
import { RetryUtil } from '../utils/RetryUtil';
import { ScreenshotManager } from '../utils/ScreenshotManager';
import { AssertUtil } from '../utils/AssertUtil';
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
    private readonly cartLink: Locator;
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
        this.firstProduct = page.locator('.inventory_item_name').first();
        this.firstPrice = page.locator('.inventory_item_price').first();
        this.cartLink = page.locator('.shopping_cart_link');
    }
    // ==========================================
    // Dynamic Locator - Product
    // ==========================================
    private getProduct(productName: string): Locator {
        return this.inventoryItems.filter({
            hasText: productName
        });
    }
    // ==========================================
    // Dynamic Locator - Product Text
    // ==========================================
    private getProductText(productName: string): Locator {
        return this.page.getByText(productName);
    }
    // ==========================================
    // Actions
    // ==========================================
    async addProduct(productName: string) {
        await this.click(
            this.getProduct(productName).getByRole('button')
        );
    }
    async openCart() {
        await this.click(this.cartLink);
    }
    async hoverFirstProduct() {
        await this.firstInventoryItem.hover();
    }
    async sortProducts(option: string) {
        await this.sortDropdown.selectOption(option);
    }
    // ==========================================
    // Compatibility Methods
    // ==========================================
    async verifyProductsPage() {
        await this.verifyPageTitle();
        await this.verifyInventoryList();
    }
    async verifySortOption(option: string) {
        await this.verifySelectedSortOption(option);
    }
    async verifyCartCount(count: string) {
        await this.verifyCartBadgeCount(count);
    }
    async loginWithKeyboard() {
        // Login is already handled by LoginPage.login()
        // Keeping this method for backward compatibility.
    }
    async goBack() {
        await this.page.goBack();
    }
    async reloadPage() {
        await this.page.reload();
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
        Logger.info(`Verifying product: ${productName}`);
        const product = this.getProductText(productName);
        // Wait until product is visible
        await WaitUtil.waitForVisible(product);
        // Verify product
        await AssertUtil.visible(product);
        Logger.info(`${productName} is visible`);
    }
    async verifyFirstInventoryItemVisible() {
        await this.verifyVisible(this.firstInventoryItem);
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
        await expect(this.sortDropdown).toHaveValue(option);
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