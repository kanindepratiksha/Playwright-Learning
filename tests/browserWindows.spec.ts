import { test } from '@playwright/test';
import { BrowserWindowsPage } from '../pages/BrowserWindowsPage';

test('Verify Multiple Tabs and Popup Handling', async ({ page }) => {

    // ==========================================
    // Create Page Object
    // ==========================================
    const browserWindow = new BrowserWindowsPage(page);

    // ==========================================
    // Navigate
    // ==========================================
    await browserWindow.navigate();

    // ==========================================
    // Multiple Tabs
    // ==========================================
    await browserWindow.verifyNewTab();

    // ==========================================
    // Popup Window
    // ==========================================
    await browserWindow.verifyNewWindow();

});