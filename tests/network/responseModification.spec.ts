import { expect } from "@playwright/test";
import { test } from "../hooks/reporting/uiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { config } from "../../config/env";
import { NetworkInterceptor } from "../../utils/NetworkInterceptor";
import modifiedPost from "../../testdata/modifiedPost.json";
test.describe("Response Modification", () => {
    // ==========================================
    // Modify Complete API Response
    // ==========================================
    test(
        "Modify API Response using route.fetch()",
        async ({ page }) => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Network Interception",
                story: "Modify API Response using route.fetch()",
                severity: "critical"
            });
            // ==========================================
            // Network Interceptor
            // ==========================================
            const interceptor = new NetworkInterceptor(page);
            // ==========================================
            // Modify Response
            // ==========================================
            await AllureHelper.step(
                "Modify API Response",
                async () => {
                    await interceptor.modifyResponse(
                        "**/posts/1",
                        (body) => {
                            body.title = modifiedPost.title;
                            body.body = modifiedPost.body;
                            body.modified = true;
                            body.framework = "Playwright";
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
            // Verify Modified Response
            // ==========================================
            await AllureHelper.step(
                "Verify Modified API Response",
                async () => {
                    const endpoint =
                        `${config.jsonPlaceholderBaseUrl}posts/1`;
                    const result = await page.evaluate(
                        async (url) => {
                            const response = await fetch(url);
                            return await response.json();
                        },
                        endpoint
                    );
                    expect(result.modified).toBe(true);
                    expect(result.framework).toBe("Playwright");
                    expect(result.title).toBe(modifiedPost.title);
                    expect(result.body).toBe(modifiedPost.body);
                    await AllureHelper.attachJson(
                        "Modified API Response",
                        result
                    );
                }
            );
        }
    );
    // ==========================================
    // Add New Properties to Response
    // ==========================================
    test(
        "Modify Response by Adding New Property",
        async ({ page }) => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Network Interception",
                story: "Modify Response by Adding New Property",
                severity: "critical"
            });
            // ==========================================
            // Network Interceptor
            // ==========================================
            const interceptor = new NetworkInterceptor(page);
            // ==========================================
            // Modify Response
            // ==========================================
            await AllureHelper.step(
                "Add New Properties to Response",
                async () => {
                    await interceptor.modifyResponse(
                        "**/posts/2",
                        (body) => {
                            body.executedBy = "Playwright Framework";
                            body.executionType = "Response Modification";
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
            // Verify Modified Response
            // ==========================================
            await AllureHelper.step(
                "Verify Added Response Properties",
                async () => {
                    const endpoint =
                        `${config.jsonPlaceholderBaseUrl}posts/2`;
                    const result = await page.evaluate(
                        async (url) => {
                            const response = await fetch(url);
                            return await response.json();
                        },
                        endpoint
                    );
                    expect(result.executedBy)
                        .toBe("Playwright Framework");
                    expect(result.executionType)
                        .toBe("Response Modification");
                    await AllureHelper.attachJson(
                        "Modified Response",
                        result
                    );
                }
            );
        }
    );
});