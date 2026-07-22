import { expect, Locator, Page } from '@playwright/test';
export class WaitUtil {
    static async waitForVisible(locator: Locator) {
        await locator.waitFor({ state: 'visible' });
    }
    static async waitForHidden(locator: Locator) {
        await locator.waitFor({ state: 'hidden' });
    }
    static async waitForEnabled(locator: Locator) {
        await expect(locator).toBeEnabled();
    }
    static async waitForDisabled(locator: Locator) {
        await expect(locator).toBeDisabled();
    }
    static async waitForPageLoad(page: Page) {
        await page.waitForLoadState('networkidle');
    }
    static async waitForURL(page: Page, url: string) {
        await expect(page).toHaveURL(url);
    }
    static async waitForTitle(page: Page, title: string) {
        await expect(page).toHaveTitle(title);
    }
}