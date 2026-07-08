import { Page, Locator, expect } from '@playwright/test';
export class BasePage {
    constructor(protected page: Page) {}
    async navigate(url: string) {
        await this.page.goto(url);
    }
    async click(locator: Locator) {
        await locator.click();
    }
    async fill(locator: Locator, value: string) {
        await locator.fill(value);
    }
    async verifyVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }
    async verifyText(locator: Locator, text: string) {
        await expect(locator).toHaveText(text);
    }
    async verifyUrl(url: string) {
        await expect(this.page).toHaveURL(url);
    }
}