import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/Logger';
import { WaitUtil } from '../utils/WaitUtil';
import { RetryUtil } from '../utils/RetryUtil';
import { ScreenshotManager } from '../utils/ScreenshotManager';
import { AssertUtil } from '../utils/AssertUtil';
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
    Logger.info(`Adding ${productName}`);
    const button = this.getProduct(productName)
        .getByRole('button');
    await WaitUtil.waitForVisible(button);
    await RetryUtil.execute(async () => {
        await this.click(button);
    });
    await ScreenshotManager.capture(
        this.page,
        `${productName}-Added`
    );
    Logger.info(`${productName} Added Successfully`);
}
    // ==========================================
    // Verify Product is Visible
    // ==========================================
    async verifyProductVisible(productName: string) {
        Logger.info(`Verifying product: ${productName}`);
        const product = this.getProductText(productName);
        // Wait until product is visible
        await WaitUtil.waitForVisible(product);
        // Verify product
        await AssertUtil.visible(product);
        Logger.info(`${productName} is visible`);
    }
}