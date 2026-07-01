import { test } from '@playwright/test';
import { AlertsPage } from '../pages/AlertsPage';

test('Verify JavaScript Alerts', async ({ page }) => {

    const alertsPage = new AlertsPage(page);

    // Navigate to Alerts page
    await alertsPage.navigate();

    // Handle Simple Alert
    await alertsPage.handleSimpleAlert();

    // Handle Confirm Alert
    await alertsPage.handleConfirmAlert();
    await alertsPage.verifyConfirmAlert();

    // Handle Prompt Alert
    await alertsPage.handlePromptAlert();
    await alertsPage.verifyPromptAlert();

});