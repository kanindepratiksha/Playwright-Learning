import { test } from '@playwright/test';
import { AlertsPage } from '../../pages/AlertsPage';
test('Alerts', async ({ page }) => {
    // ==========================================
    // Page Object
    // ==========================================
    const alertsPage = new AlertsPage(page);
    // ==========================================
    // Navigate
    // ==========================================
    await alertsPage.navigate();
    // ==========================================
    // Simple Alert
    // ==========================================
    await alertsPage.handleSimpleAlert();
    // ==========================================
    // Confirm Alert
    // ==========================================
    await alertsPage.handleConfirmAlert();
    await alertsPage.verifyConfirmAlert();
    // ==========================================
    // Prompt Alert
    // ==========================================
    await alertsPage.handlePromptAlert();
    await alertsPage.verifyPromptAlert();
});