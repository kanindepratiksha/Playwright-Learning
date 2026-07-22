import { Page } from '@playwright/test';
import { Logger } from './Logger';
export class ScreenshotManager {
    static async capture(
        page: Page,
        screenshotName: string
    ) {
        const timestamp = new Date()
            .toISOString()
            .replace(/[:.]/g, '-');
        const safeName = screenshotName.replace(/[^\w-]/g, '_');
        const path = `reports/screenshots/${safeName}-${timestamp}.png`;
        await page.screenshot({
            path,
            fullPage: true
        });
        Logger.info(`Screenshot captured: ${path}`);
    }
    static async captureFailure(
        page: Page,
        screenshotName: string
    ) {
        const timestamp = new Date()
            .toISOString()
            .replace(/[:.]/g, '-');
        const safeName = screenshotName.replace(/[^\w-]/g, '_');
        const path = `reports/screenshots/Failure-${safeName}-${timestamp}.png`;
        await page.screenshot({
            path,
            fullPage: true
        });
        Logger.error(`Failure Screenshot: ${path}`);
    }
}