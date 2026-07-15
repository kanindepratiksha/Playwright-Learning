import { expect, Locator, Page } from '@playwright/test';
import { Logger } from './Logger';
export class AssertUtil {
    static async visible(locator: Locator) {
        Logger.info('Verifying element is visible');
        await expect(locator).toBeVisible();
    }
    static async hidden(locator: Locator) {
        Logger.info('Verifying element is hidden');
        await expect(locator).toBeHidden();
    }
    static async text(locator: Locator, expectedText: string) {
        Logger.info(`Verifying text: ${expectedText}`);
        await expect(locator).toHaveText(expectedText);
    }
    static async containsText(locator: Locator, expectedText: string) {
        Logger.info(`Verifying text contains: ${expectedText}`);
        await expect(locator).toContainText(expectedText);
    }
    static async title(page: Page, expectedTitle: string) {
        Logger.info(`Verifying page title: ${expectedTitle}`);
        await expect(page).toHaveTitle(expectedTitle);
    }
    static async url(page: Page, expectedUrl: string) {
        Logger.info(`Verifying URL: ${expectedUrl}`);
        await expect(page).toHaveURL(expectedUrl);
    }
    static async enabled(locator: Locator) {
        Logger.info('Verifying element is enabled');
        await expect(locator).toBeEnabled();
    }
    static async disabled(locator: Locator) {
        Logger.info('Verifying element is disabled');
        await expect(locator).toBeDisabled();
    }
}