import { Page, Locator, expect } from '@playwright/test';
export class BasePage {
    constructor(protected page: Page) {}
    protected async navigate(url: string) {
        await this.page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });
    }
    protected async click(locator: Locator) {
        await locator.click();
    }
    protected async fill(locator: Locator, text: string) {
        await locator.fill(text);
    }
    protected async verifyVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }
    protected async verifyText(locator: Locator, text: string) {
        await expect(locator).toHaveText(text);
    }
    protected async verifyUrl(url: string | RegExp) {
        await expect(this.page).toHaveURL(url);
    }
}