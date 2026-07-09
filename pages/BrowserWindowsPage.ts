import { Page, Locator, expect } from '@playwright/test';
import { config } from '../config/env';
import { testData } from '../utils/appConstants';
import { BasePage } from './BasePage';
export class BrowserWindowsPage extends BasePage {
    // ==========================================
    // Locators
    // ==========================================
    private readonly newTabButton: Locator;
    private readonly newWindowButton: Locator;
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.newTabButton = page.locator('#tabButton');
        this.newWindowButton = page.locator('#windowButton');
    }
    // ==========================================
    // Navigate
    // ==========================================
    async navigate() {
        await super.navigate(config.browserWindowsUrl);
        // Wait until page is ready
        await this.newTabButton.waitFor({
            state: 'visible'
        });
    }
    // ==========================================
    // Open New Page
    // ==========================================
    private async openNewPage(button: Locator) {
        await button.waitFor({
            state: 'visible'
        });
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            button.click()
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        return newPage;
    }
    // ==========================================
    // Verify Heading
    // ==========================================
    private async verifyHeading(newPage: Page) {
        await expect(
            newPage.locator('#sampleHeading')
        ).toHaveText(testData.newTabHeading);
    }
    // ==========================================
    // Verify New Tab
    // ==========================================
    async verifyNewTab() {
        const newPage = await this.openNewPage(this.newTabButton);
        await this.verifyHeading(newPage);
        await newPage.close();
    }
    // ==========================================
    // Verify New Window
    // ==========================================
    async verifyNewWindow() {
        const newPage = await this.openNewPage(this.newWindowButton);
        await this.verifyHeading(newPage);
        await newPage.close();
    }
}