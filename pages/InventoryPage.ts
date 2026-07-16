import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
export class InventoryPage extends BasePage {
    // ==========================================
    // Locators
    // ==========================================
    private readonly productsTitle: Locator;
    private readonly inventoryItems: Locator;
    private readonly cartBadge: Locator;
    private readonly cartLink: Locator;
    private readonly inventoryList: Locator;
    private readonly sortDropdown: Locator;
    private readonly firstProduct: Locator;
    private readonly firstPrice: Locator;
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.productsTitle = page.locator('.title');
        this.inventoryItems = page.locator('.inventory_item');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
        this.inventoryList = page.locator('.inventory_list');
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
    // Verify Products Page
    // ==========================================
    async verifyProductsPage() {
        await this.verifyVisible(this.productsTitle);
    }
    // ==========================================
    // Verify Inventory List
    // ==========================================
    async verifyInventoryList() {
        await this.verifyVisible(this.inventoryList);
    }
    // ==========================================
    // Verify First Product
    // ==========================================
    async verifyFirstProductVisible() {
        await this.verifyVisible(
            this.inventoryItems.first()
        );
    }
    // ==========================================
    // Verify Last Product
    // ==========================================
    async verifyLastProductVisible() {
        await this.verifyVisible(
            this.inventoryItems.last()
        );
    }
    // ==========================================
    // Verify Nth Product
    // ==========================================
    async verifyNthProductVisible(index: number) {
        await this.verifyVisible(
            this.inventoryItems.nth(index)
        );
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
    // ==========================================
    // Verify Cart Count
    // ==========================================
    async verifyCartCount(count: string) {
        await this.verifyText(
            this.cartBadge,
            count
        );
    }
    // ==========================================
    // Open Cart
    // ==========================================
    async openCart() {
        await this.click(this.cartLink);
    }
    // ==========================================
    // Sort Products
    // ==========================================
    async sortProducts(option: string) {
        await this.sortDropdown.selectOption(option);
    }
    // ==========================================
// Hover First Product
// ==========================================
async hoverFirstProduct() {
    await this.inventoryItems.first().hover();
}

// ==========================================
// Login Using Keyboard
// ==========================================
async loginWithKeyboard() {
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Enter');
}

// ==========================================
// Go Back
// ==========================================
async goBack() {
    await this.page.goBack();
}

// ==========================================
// Reload Page
// ==========================================
async reloadPage() {
    await this.page.reload();
}
    // ==========================================
    // Verify Selected Sort Option
    // ==========================================
    async verifySortOption(option: string) {
        await this.verifyValue(
            this.sortDropdown,
            option
        );
    }
    // ==========================================
    // Verify First Product Name
    // ==========================================
    async verifyFirstProduct(productName: string) {
        await this.verifyText(
            this.firstProduct,
            productName
        );
    }
    // ==========================================
    // Verify First Product Price
    // ==========================================
    async verifyFirstPrice(price: string) {
        await this.verifyText(
            this.firstPrice,
            price
        );
    }
}