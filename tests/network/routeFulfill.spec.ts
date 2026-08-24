import { expect } from "@playwright/test";
import { Severity } from "allure-js-commons";
import { test } from "../hooks/reporting/uiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { config } from "../../config/env";
import { NetworkInterceptor } from "../../utils/NetworkInterceptor";
import mockedUsers from "../../testdata/mockedUsers.json";
test.describe("Route Fulfill", () => {
    // ==========================================
    // Mock API Response using route.fulfill()
    // ==========================================
    test(
        "Mock API Response using route.fulfill()",
        async ({ page }) => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Network Interception",
                story: "Mock API Response using route.fulfill()",
                severity: Severity.CRITICAL
            });
            // ==========================================
            // Network Interceptor
            // ==========================================
            const interceptor = new NetworkInterceptor(page);
            // ==========================================
            // Mock API Response
            // ==========================================
            await AllureHelper.step(
                "Mock API Response",
                async () => {
                    await interceptor.mockResponse(
                        "**/posts/1",
                        mockedUsers,
                        200,
                        {
                            "Access-Control-Allow-Origin": "*"
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
            // Verify Mocked Response
            // ==========================================
            await AllureHelper.step(
                "Verify Mocked API Response",
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
                    expect(response.page).toBe(1);
                    expect(response.total).toBe(2);
                    expect(response.data).toHaveLength(2);
                    expect(response.data[0].first_name)
                        .toBe("Pratiksha");
                    await AllureHelper.attachJson(
                        "Mocked API Response",
                        response
                    );
                }
            );
        }
    );
    // ==========================================
    // Mock API with Custom Status
    // ==========================================
    test(
        "Mock API with Custom Status",
        async ({ page }) => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Network Interception",
                story: "Mock API with Custom Status",
                severity: Severity.CRITICAL
            });
            // ==========================================
            // Network Interceptor
            // ==========================================
            const interceptor = new NetworkInterceptor(page);
            // ==========================================
            // Mock 404 Response
            // ==========================================
            await AllureHelper.step(
                "Mock 404 Response",
                async () => {
                    await interceptor.mockResponse(
                        "**/posts/404",
                        {
                            success: false,
                            message: "Record Not Found"
                        },
                        404
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
            // Verify Error Response
            // ==========================================
            await AllureHelper.step(
                "Verify Mocked Error Response",
                async () => {
                    const response = await page.evaluate(
                        async (baseUrl) => {
                            const res = await fetch(
                                `${baseUrl}posts/404`
                            );
                            return {
                                status: res.status,
                                body: await res.json()
                            };
                        },
                        config.jsonPlaceholderBaseUrl
                    );
                    expect(response.status).toBe(404);
                    expect(response.body.success).toBe(false);
                    expect(response.body.message)
                        .toBe("Record Not Found");
                    await AllureHelper.attachJson(
                        "404 Error Response",
                        response
                    );
                }
            );
        }
    );
});