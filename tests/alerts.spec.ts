import { test } from '@playwright/test';
import { AlertsPage } from '../pages/AlertsPage';

test('Verify JavaScript Alerts in Playwright', async ({ page }) => {

    // ==========================================
    // Create Alerts Page Object
    // ==========================================
    const alertsPage = new AlertsPage(page);

    // ==========================================
    // Navigate to Alerts Page
    // ==========================================
    await alertsPage.navigate();

    // ==========================================
    // Handle JavaScript Alert
    // ==========================================
    await alertsPage.handleSimpleAlert();

    // ==========================================
    // Handle Confirm Alert
    // ==========================================
    await alertsPage.handleConfirmAlert();

    // ==========================================
    // Verify Confirm Alert Result
    // ==========================================
    await alertsPage.verifyConfirmAlert();

    // ==========================================
    // Handle Prompt Alert
    // ==========================================
    await alertsPage.handlePromptAlert();

    // ==========================================
    // Verify Prompt Alert Result
    // ==========================================
    await alertsPage.verifyPromptAlert();

});