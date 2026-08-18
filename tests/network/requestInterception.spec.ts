import { expect, Request } from "@playwright/test";
import { Severity } from "allure-js-commons";
import { test } from "../hooks/reporting/uiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { config } from "../../config/env";
import { NetworkInterceptor } from "../../utils/NetworkInterceptor";
test.describe("Request Interception", () => {
    // ==========================================
    // Capture GET Request Details
    // ==========================================
    test(
        "Capture GET Request Details",
        async ({ page }) => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Network Interception",
                story: "Capture GET Request Details",
                severity: Severity.CRITICAL
            });
            // ==========================================
            // Network Interceptor
            // ==========================================
            const interceptor = new NetworkInterceptor(page);
            // ==========================================
            // Intercept GET Request
            // ==========================================
            await AllureHelper.step(
                "Intercept GET Request",
                async () => {
                    await interceptor.interceptRequest("**/posts/1");
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
                "Verify GET Response",
                async () => {
                    const response = await page.evaluate(
                        async (baseUrl) => {
                            const res = await fetch(`${baseUrl}posts/1`);
                            return await res.json();
                        },
                        config.jsonPlaceholderBaseUrl
                    );
                    expect(response.id).toBe(1);
                    expect(response.userId).toBe(1);
                    expect(response.title).toBeTruthy();
                    await AllureHelper.attachJson(
                        "GET Response",
                        response
                    );
                }
            );
        }
    );
    // ==========================================
    // Intercept POST Request
    // ==========================================
    test(
        "Intercept POST Request",
        async ({ page }) => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Network Interception",
                story: "Intercept POST Request",
                severity: Severity.CRITICAL
            });
            // ==========================================
            // Network Interceptor
            // ==========================================
            const interceptor = new NetworkInterceptor(page);
            let method = "";
            let postData = "";
            // ==========================================
            // Intercept POST Request
            // ==========================================
            await AllureHelper.step(
                "Capture POST Request",
                async () => {
                    await interceptor.interceptRequest(
                        "**/posts",
                        (request: Request) => {
                            method = request.method();
                            postData = request.postData() || "";
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
            let response: any;
            await AllureHelper.step(
                "Send POST Request",
                async () => {
                    response = await page.evaluate(
                        async (baseUrl) => {
                            const res = await fetch(`${baseUrl}posts`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    title: "Playwright",
                                    body: "Network Interception",
                                    userId: 1
                                })
                            });
                            return await res.json();
                        },
                        config.jsonPlaceholderBaseUrl
                    );
                }
            );
            // ==========================================
            // Verify POST Request
            // ==========================================
            await AllureHelper.step(
                "Verify Intercepted POST Request",
                async () => {
                    expect(method).toBe("POST");
                    expect(postData).toContain("Playwright");
                    expect(response.title).toBe("Playwright");
                    await AllureHelper.attachText(
                        "HTTP Method",
                        method
                    );
                    await AllureHelper.attachText(
                        "POST Data",
                        postData
                    );
                    await AllureHelper.attachJson(
                        "POST Response",
                        response
                    );
                }
            );
        }
    );
});