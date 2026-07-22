import { Page, Locator, Dialog } from '@playwright/test';
import { config } from '../config/env';
import { testData } from '../utils/appConstants';
import { BasePage } from './BasePage';
export class AlertsPage extends BasePage {
    // ==========================================
    // Locators
    // ==========================================
    private readonly alertButton: Locator;
    private readonly confirmButton: Locator;
    private readonly promptButton: Locator;
    private readonly confirmResult: Locator;
    private readonly promptResult: Locator;
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.alertButton = page.locator('#alertButton');
        this.confirmButton = page.locator('#confirmButton');
        this.promptButton = page.locator('#promtButton');
        this.confirmResult = page.locator('#confirmResult');
        this.promptResult = page.locator('#promptResult');
    }
    // ==========================================
    // Navigate
    // ==========================================
    async navigate() {
        await super.navigate(config.alertsUrl);
        await this.waitForVisible(this.alertButton);
    }
    // ==========================================
    // Handle Dialog
    // ==========================================
    private handleDialog(action: 'accept' | 'dismiss', text?: string) {
        this.page.once('dialog', async (dialog: Dialog) => {
            if (action === 'accept') {
                await dialog.accept(text);
            } else {
                await dialog.dismiss();
            }
        });
    }
    // ==========================================
    // Handle Simple Alert
    // ==========================================
    async handleSimpleAlert() {
        this.handleDialog('accept');
        await this.click(this.alertButton);
    }
    // ==========================================
    // Handle Confirm Alert
    // ==========================================
    async handleConfirmAlert() {
        this.handleDialog('accept');
        await this.click(this.confirmButton);
    }
    // ==========================================
    // Verify Confirm Result
    // ==========================================
    async verifyConfirmAlert() {
        await this.verifyText(
            this.confirmResult,
            testData.confirmResult
        );
    }
    // ==========================================
    // Handle Prompt Alert
    // ==========================================
    async handlePromptAlert() {
        this.handleDialog(
            'accept',
            testData.promptText
        );
        await this.click(this.promptButton);
    }
    // ==========================================
    // Verify Prompt Result
    // ==========================================
    async verifyPromptAlert() {
        await this.verifyText(
            this.promptResult,
            testData.promptResult
        );
    }
}