import { Page, Locator, expect } from '@playwright/test';
import { testData } from '../utils/appConstants';

export class AlertsPage {

    // ==========================================
    // Page Object
    // ==========================================
    readonly page: Page;

    // ==========================================
    // Locators
    // ==========================================
    readonly alertButton: Locator;
    readonly confirmButton: Locator;
    readonly promptButton: Locator;
    readonly confirmResult: Locator;
    readonly promptResult: Locator;

    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {

        this.page = page;

        this.alertButton = page.locator('#alertButton');
        this.confirmButton = page.locator('#confirmButton');
        this.promptButton = page.locator('#promtButton');

        this.confirmResult = page.locator('#confirmResult');
        this.promptResult = page.locator('#promptResult');
    }

    // ==========================================
    // Navigate to Alerts Page
    // ==========================================
    async navigate() {

        await this.page.goto(testData.alertsUrl);

    }

    // ==========================================
    // Handle JavaScript Alert
    // ==========================================
    async handleSimpleAlert() {

        this.page.once('dialog', async dialog => {

            await dialog.accept();

        });

        await this.alertButton.click();

    }

    // ==========================================
    // Handle Confirm Alert
    // ==========================================
    async handleConfirmAlert() {

        this.page.once('dialog', async dialog => {

            await dialog.accept();

        });

        await this.confirmButton.click();

    }

    // ==========================================
    // Verify Confirm Alert Result
    // ==========================================
    async verifyConfirmAlert() {

        await expect(
            this.confirmResult
        ).toHaveText(testData.confirmResult);

    }

    // ==========================================
    // Handle Prompt Alert
    // ==========================================
    async handlePromptAlert() {

        this.page.once('dialog', async dialog => {

            await dialog.accept(testData.promptText1);

        });

        await this.promptButton.click();

    }

    // ==========================================
    // Verify Prompt Result
    // ==========================================
    async verifyPromptAlert() {

        await expect(
            this.promptResult
        ).toHaveText(testData.promptResult);

    }

}