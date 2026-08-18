import { expect } from "@playwright/test";
import { Severity } from "allure-js-commons";
import { test } from "../hooks/reporting/uiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { config } from "../../config/env";
import { NetworkInterceptor } from "../../utils/NetworkInterceptor";
test(
    "Modify Request Body",
    async ({ page }) => {
        // ==========================================
        // Allure Metadata
        // ==========================================
        await AllureHelper.metadata({
            feature: "Network Interception",
            story: "Modify Request Body",
            severity: Severity.CRITICAL
        });
        // ==========================================
        // Network Interceptor
        // ==========================================
        const interceptor = new NetworkInterceptor(page);
        // ==========================================
        // Modify Request Body
        // ==========================================
        await AllureHelper.step(
            "Modify POST Request Body",
            async () => {
                await interceptor.modifyRequestBody(
                    "**/posts",
                    body => {
                        body.title = "Modified By Playwright";
                        body.userId = 999;
                    }
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
        // Send POST Request
        // ==========================================
        let result: any;
        await AllureHelper.step(
            "Send POST Request",
            async () => {
                result = await page.evaluate(
                    async (baseUrl) => {
                        const response = await fetch(
                            `${baseUrl}posts`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    title: "Original",
                                    body: "Body",
                                    userId: 1
                                })
                            }
                        );
                        return response.json();
                    },
                    config.jsonPlaceholderBaseUrl
                );
            }
        );
        // ==========================================
        // Verify Modified Request
        // ==========================================
        await AllureHelper.step(
            "Verify Modified Request Body",
            async () => {
                expect(result.title).toBe(
                    "Modified By Playwright"
                );
                expect(result.userId).toBe(999);
                await AllureHelper.attachJson(
                    "Modified Request Response",
                    result
                );
            }
        );
    }
);