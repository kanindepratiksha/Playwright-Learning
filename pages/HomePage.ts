import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
export class HomePage extends BasePage {
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
    }
    // ==========================================
    // Verify Home Page Title
    // ==========================================
    async verifyHomePageTitle() {
        await this.verifyTitle(/Swag Labs/);
    }
}