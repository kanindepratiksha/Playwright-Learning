import { Page, Locator, expect } from '@playwright/test';
import { config } from '../config/env';
import { BasePage } from './BasePage';
import { BrowserContentPage } from './BrowserContentPage';
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
        await expect(this.newTabButton).toBeVisible();
    }
    // ==========================================
    // Open New Page
    // ==========================================
    private async openNewPage(button: Locator): Promise<Page> {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            button.click()
        ]);
        await newPage.waitForLoadState('load');
        await expect(
            newPage.locator('#sampleHeading')
        ).toBeVisible();
        return newPage;
    }
    // ==========================================
    // Verify New Tab
    // ==========================================
    async verifyNewTab() {
        const newPage = await this.openNewPage(
            this.newTabButton
        );
        const browserContentPage =
            new BrowserContentPage(newPage);
        await browserContentPage.verifyHeading();
        await newPage.close();
    }
    // ==========================================
    // Verify New Window
    // ==========================================
    async verifyNewWindow() {
        const newPage = await this.openNewPage(
            this.newWindowButton
        );
        const browserContentPage =
            new BrowserContentPage(newPage);
        await browserContentPage.verifyHeading();
        await newPage.close();
    }
}