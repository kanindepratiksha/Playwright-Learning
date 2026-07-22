import { Page, Locator } from '@playwright/test';
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
        // Hide DemoQA advertisement and footer
        await this.page.evaluate(() => {
            const fixedBan = document.getElementById('fixedban');
            if (fixedBan) {
                (fixedBan as HTMLElement).style.display = 'none';
            }
            const footer = document.querySelector('footer');
            if (footer) {
                (footer as HTMLElement).style.display = 'none';
            }
        });
        await this.alertButton.waitFor({
            state: 'visible'
        });
    }
    // ==========================================
    // Handle Simple Alert
    // ==========================================
    async handleSimpleAlert() {
        this.page.once('dialog', dialog => {
            dialog.accept();
        });
        await this.alertButton.click();
    }
    // ==========================================
    // Handle Confirm Alert
    // ==========================================
    async handleConfirmAlert() {
        this.page.once('dialog', dialog => {
            dialog.accept();
        });
        await this.confirmButton.click();
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
        this.page.once('dialog', dialog => {
            dialog.accept(testData.promptText);
        });
        await this.promptButton.click();
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