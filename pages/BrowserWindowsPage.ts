import { Page, Locator, expect } from '@playwright/test';
import { config } from '../config/env';
import { testData } from '../utils/appConstants';
import { BasePage } from './BasePage';
export class BrowserWindowsPage extends BasePage {
    private readonly newTabButton: Locator;
    private readonly newWindowButton: Locator;
    constructor(page: Page) {
        super(page);
        this.newTabButton = page.locator('#tabButton');
        this.newWindowButton = page.locator('#windowButton');
    }
    async navigate() {
        await super.navigate(config.browserWindowsUrl);
    }
    private async openNewPage(button: Locator) {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            button.click()
        ]);
        await newPage.waitForLoadState();
        return newPage;
    }
    async verifyNewTab() {
        const page = await this.openNewPage(this.newTabButton);
        await expect(
            page.locator('#sampleHeading')
        ).toHaveText(testData.newTabHeading);
        await page.close();
    }
    async verifyNewWindow() {
        const page = await this.openNewPage(this.newWindowButton);
        await expect(
            page.locator('#sampleHeading')
        ).toHaveText(testData.newTabHeading);
        await page.close();
    }
}