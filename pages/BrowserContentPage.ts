import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { testData } from '../utils/appConstants';
export class BrowserContentPage extends BasePage {
    // ==========================================
    // Locators
    // ==========================================
    private readonly sampleHeading: Locator;
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.sampleHeading = page.locator('#sampleHeading');
    }
    // ==========================================
    // Verify Heading
    // ==========================================
    async verifyHeading() {
        await this.verifyText(
            this.sampleHeading,
            testData.newTabHeading
        );
    }
}