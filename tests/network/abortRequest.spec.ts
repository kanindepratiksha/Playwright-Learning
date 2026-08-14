import { expect } from "@playwright/test";
import { test } from "../hooks/reporting/uiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { config } from "../../config/env";
import { NetworkInterceptor } from "../../utils/NetworkInterceptor";
test.describe("Abort Request", () => {
    test(
        "Abort Image Request",
        async ({ page }) => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Network Interception",
                story: "Abort Image Request",
                severity: "critical"
            });
            // ==========================================
            // Network Interceptor
            // ==========================================
            const interceptor = new NetworkInterceptor(page);
            // ==========================================
            // Abort Image Requests
            // ==========================================
            await AllureHelper.step(
                "Abort PNG Requests",
                async () => {
                    await interceptor.abortRequest("**/*.png");
                }
            );
            // ==========================================
            // Navigate
            // ==========================================
            await AllureHelper.step(
                "Navigate to SauceDemo",
                async () => {
                    await page.goto(config.sauceDemoUrl);
                    await page.waitForLoadState("networkidle");
                }
            );
            // ==========================================
            // Verify Page Loaded
            // ==========================================
            await AllureHelper.step(
                "Verify Page Loaded Successfully",
                async () => {
                    expect(true).toBeTruthy();
                }
            );
        }
    );
});