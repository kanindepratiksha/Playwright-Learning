import { Page, Locator, expect } from "@playwright/test";
import { config } from "../config/env";
import { BasePage } from "./BasePage";
import { BrowserContentPage } from "./BrowserContentPage";
import { AllureHelper } from "../utils/AllureHelper";
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
        this.newTabButton = page.locator("#tabButton");
        this.newWindowButton = page.locator("#windowButton");
    }
    // ==========================================
    // Navigate
    // ==========================================
    async navigate() {
        await AllureHelper.step(
            "Navigate to Browser Windows Page",
            async () => {
                await super.navigate(config.browserWindowsUrl);
                await expect(this.newTabButton).toBeVisible({
                    timeout: 60_000
                });
            }
        );
    }
    // ==========================================
    // Open New Page
    // ==========================================
    private async openNewPage(
        button: Locator
    ): Promise<Page> {
        await expect(button).toBeVisible({
            timeout: 60_000
        });
        await expect(button).toBeEnabled();
        const context = this.page.context();
        const [newPage] = await Promise.all([
            context.waitForEvent("page"),
            button.click()
        ]);
        await expect(
            newPage.locator("#sampleHeading")
        ).toBeVisible({
            timeout: 60_000
        });
        return newPage;
    }
    // ==========================================
    // Verify New Tab
    // ==========================================
    async verifyNewTab() {
        await AllureHelper.step(
            "Verify New Tab",
            async () => {
                const newPage = await this.openNewPage(
                    this.newTabButton
                );
                const browserContentPage =
                    new BrowserContentPage(newPage);
                await browserContentPage.verifyHeading();
                await newPage.close();
            }
        );
    }
    // ==========================================
    // Verify New Window
    // ==========================================
    async verifyNewWindow() {
        await AllureHelper.step(
            "Verify New Window",
            async () => {
                const newPage = await this.openNewPage(
                    this.newWindowButton
                );
                const browserContentPage =
                    new BrowserContentPage(newPage);
                await browserContentPage.verifyHeading();
                await newPage.close();
            }
        );
    }
}