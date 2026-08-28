import { expect } from "@playwright/test";
import { Severity } from "allure-js-commons";
import { test } from "../hooks/reporting/uiAllureHooks";
import { AlertsPage } from "../../pages/AlertsPage";
import { AllureHelper } from "../../utils/AllureHelper";
test(
    "Alerts",
    async ({ page }) => {
        // ==========================================
        // Allure Metadata
        // ==========================================
        await AllureHelper.metadata({
            feature: "Alerts",
            story: "Handle JavaScript Alerts",
            severity: Severity.CRITICAL
        });
        // ==========================================
        // Page Object
        // ==========================================
        const alertsPage = new AlertsPage(page);
        // ==========================================
        // Execute Alert Flow
        // ==========================================
        await alertsPage.navigate();
        await alertsPage.handleSimpleAlert();
        await alertsPage.handleConfirmAlert();
        await alertsPage.verifyConfirmAlert();
        await alertsPage.handlePromptAlert();
        await alertsPage.verifyPromptAlert();
        // ==========================================
        // Intentional Failure
        // ==========================================
        //expect(true).toBe(false);
        // ==========================================
        // Use the actual valid assertion
        // ===============================
         expect(true).toBeTruthy();
    }
);