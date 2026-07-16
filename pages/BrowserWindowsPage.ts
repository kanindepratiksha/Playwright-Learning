import { Page, Locator } from '@playwright/test';
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
        await this.newTabButton.waitFor({
            state: 'visible'
        });
    }
    // ==========================================
    // Open New Page
    // ==========================================
    private async openNewPage(button: Locator): Promise<Page> {
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