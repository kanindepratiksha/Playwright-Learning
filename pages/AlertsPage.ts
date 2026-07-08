import { Page, Locator } from '@playwright/test';
import { config } from '../config/env';
import { testData } from '../utils/appConstants';
import { BasePage } from './BasePage';
export class AlertsPage extends BasePage {
    private readonly alertButton: Locator;
    private readonly confirmButton: Locator;
    private readonly promptButton: Locator;
    private readonly confirmResult: Locator;
    private readonly promptResult: Locator;
    constructor(page: Page) {
        super(page);
        this.alertButton = page.locator('#alertButton');
        this.confirmButton = page.locator('#confirmButton');
        this.promptButton = page.locator('#promtButton');
        this.confirmResult = page.locator('#confirmResult');
        this.promptResult = page.locator('#promptResult');
    }
    async navigate() {
        await super.navigate(config.alertsUrl);
    }
    private async acceptDialog(text?: string) {
        this.page.once('dialog', async dialog => {
            await dialog.accept(text);
        });
    }
    async handleSimpleAlert() {
        await this.acceptDialog();
        await this.click(this.alertButton);
    }
    async handleConfirmAlert() {
        await this.acceptDialog();
        await this.click(this.confirmButton);
    }
    async verifyConfirmAlert() {
        await this.verifyText(
            this.confirmResult,
            testData.confirmResult
        );
    }
    async handlePromptAlert() {
        await this.acceptDialog(testData.promptText);
        await this.click(this.promptButton);
    }
    async verifyPromptAlert() {
        await this.verifyText(
            this.promptResult,
            testData.promptResult
        );
    }
}