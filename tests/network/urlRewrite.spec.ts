import { expect } from "@playwright/test";
import { test } from "../hooks/reporting/uiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { config } from "../../config/env";
import { NetworkInterceptor } from "../../utils/NetworkInterceptor";
test(
    "Rewrite URL",
    async ({ page }) => {
        // ==========================================
        // Allure Metadata
        // ==========================================
        await AllureHelper.metadata({
            feature: "Network Interception",
            story: "Rewrite URL",
            severity: "critical"
        });
        // ==========================================
        // Network Interceptor
        // ==========================================
        const interceptor = new NetworkInterceptor(page);
        // ==========================================
        // Rewrite URL
        // ==========================================
        await AllureHelper.step(
            "Rewrite Request URL",
            async () => {
                await interceptor.rewriteUrl(
                    "**/posts/1",
                    `${config.jsonPlaceholderBaseUrl}posts/2`
                );
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
        // Verify Rewritten Response
        // ==========================================
        await AllureHelper.step(
            "Verify Rewritten API Response",
            async () => {
                const result = await page.evaluate(
                    async (baseUrl) => {
                        const response = await fetch(
                            `${baseUrl}posts/1`
                        );
                        return await response.json();
                    },
                    config.jsonPlaceholderBaseUrl
                );
                expect(result.id).toBe(2);
                await AllureHelper.attachJson(
                    "Rewritten API Response",
                    result
                );
            }
        );
    }
);