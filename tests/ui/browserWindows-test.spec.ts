import { test } from '@playwright/test';
import { BrowserWindowsPage } from '../../pages/BrowserWindowsPage';

test.setTimeout(90_000);

test('Verify Browser Windows', async ({ page }) => {
    // ==========================================
    // Page Object
    // ==========================================
    const browserWindowsPage = new BrowserWindowsPage(page);
    // ==========================================
    // Navigate
    // ==========================================
    await browserWindowsPage.navigate();
    // ==========================================
    // Verify New Tab
    // ==========================================
    await browserWindowsPage.verifyNewTab();
    // ==========================================
    // Verify New Window
    // ==========================================
    await browserWindowsPage.verifyNewWindow();
});
