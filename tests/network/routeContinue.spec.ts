import { expect } from "@playwright/test";
import { test } from "../hooks/reporting/uiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { config } from "../../config/env";
import { NetworkInterceptor } from "../../utils/NetworkInterceptor";
test.describe("Route Continue", () => {
    // ==========================================
    // Continue Original Request
    // ==========================================
    test(
        "Continue Original Request",
        async ({ page }) => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Network Interception",
                story: "Continue Original Request",
                severity: "critical"
            });
            // ==========================================
            // Network Interceptor
            // ==========================================
            const interceptor = new NetworkInterceptor(page);
            // ==========================================
            // Continue Request
            // ==========================================
            await AllureHelper.step(
                "Continue Original Request",
                async () => {
                    await interceptor.continueRequest(
                        "**/posts/1"
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
            // Verify Response
            // ==========================================
            await AllureHelper.step(
                "Verify Original Response",
                async () => {
                    const response = await page.evaluate(
                        async (baseUrl) => {
                            const res = await fetch(
                                `${baseUrl}posts/1`
                            );
                            return await res.json();
                        },
                        config.jsonPlaceholderBaseUrl
                    );
                    expect(response.id).toBe(1);
                    expect(response.userId).toBe(1);
                    await AllureHelper.attachJson(
                        "Original Response",
                        response
                    );
                }
            );
        }
    );
    // ==========================================
    // Continue Request with Custom Headers
    // ==========================================
    test(
        "Continue Request with Custom Headers",
        async ({ page }) => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Network Interception",
                story: "Continue Request with Custom Headers",
                severity: "critical"
            });
            // ==========================================
            // Network Interceptor
            // ==========================================
            const interceptor = new NetworkInterceptor(page);
            // ==========================================
            // Continue Request with Headers
            // ==========================================
            await AllureHelper.step(
                "Continue Request with Custom Headers",
                async () => {
                    await interceptor.continueWithHeaders(
                        "**/posts/1",
                        {
                            Authorization: "Bearer Playwright",
                            Framework: "Automation"
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
            // Verify Response
            // ==========================================
            await AllureHelper.step(
                "Verify Continued Response",
                async () => {
                    const response = await page.evaluate(
                        async (baseUrl) => {
                            const res = await fetch(
                                `${baseUrl}posts/1`
                            );
                            return await res.json();
                        },
                        config.jsonPlaceholderBaseUrl
                    );
                    expect(response.id).toBe(1);
                    expect(response.userId).toBe(1);
                    await AllureHelper.attachJson(
                        "Response with Custom Headers",
                        response
                    );
                }
            );
        }
    );
});