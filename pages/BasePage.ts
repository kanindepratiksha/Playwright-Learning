import { Page, Locator, expect } from '@playwright/test';
export class BasePage {
    constructor(protected page: Page) {}
    // ==========================================
    // Navigation
    // ==========================================
    protected async navigate(url: string) {
        await this.page.goto(url, {
            waitUntil: 'load',
            timeout: 60000
        });
    }
    // ==========================================
    // Click
    // ==========================================
    protected async click(locator: Locator) {
        await locator.click();
    }
    protected async fill(locator: Locator, text: string) {
        await locator.fill(text);
    }
    // ==========================================
    // Get Text
    // ==========================================
    protected async getText(locator: Locator) {
        return await locator.textContent();
    }
    // ==========================================
    // Verify Visible
    // ==========================================
    protected async verifyVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }
    // ==========================================
    // Verify Hidden
    // ==========================================
    protected async verifyHidden(locator: Locator) {
        await expect(locator).toBeHidden();
    }
    // ==========================================
    // Verify Enabled
    // ==========================================
    protected async verifyEnabled(locator: Locator) {
        await expect(locator).toBeEnabled();
    }
    // ==========================================
    // Verify Text
    // ==========================================
    protected async verifyText(
        locator: Locator,
        text: string
    ) {
        await expect(locator).toHaveText(text);
    }
    protected async verifyUrl(url: string | RegExp) {
        await expect(this.page).toHaveURL(url);
    }
    // ==========================================
    // Verify Page Title
    // ==========================================
    protected async verifyTitle(
        title: string | RegExp
    ) {
        await expect(this.page).toHaveTitle(title);
    }
    // ==========================================
    // Verify Value
    // ==========================================
    protected async verifyValue(
        locator: Locator,
        value: string
    ) {
        await expect(locator).toHaveValue(value);
    }
    // ==========================================
    // Verify Count
    // ==========================================
    protected async verifyCount(
        locator: Locator,
        count: number
    ) {
        await expect(locator).toHaveCount(count);
    }
    // ==========================================
    // Wait for Locator
    // ==========================================
    protected async waitForVisible(locator: Locator) {
        await locator.waitFor({
            state: 'visible'
        });
    }
    // ==========================================
    // Screenshot
    // ==========================================
    protected async takeScreenshot(path: string) {
        await this.page.screenshot({
            path,
            fullPage: true
        });
    }
}