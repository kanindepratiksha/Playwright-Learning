import { expect } from "@playwright/test";
import { test } from "../hooks/reporting/uiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { config } from "../../config/env";
import { NetworkInterceptor } from "../../utils/NetworkInterceptor";
import mockedUsers from "../../testdata/mockedUsers.json";
import apiMockUser from "../../testdata/apiMockUser.json";
test.describe("API Mocking", () => {
    // ==========================================
    // Mock Complete API Response
    // ==========================================
    test(
        "Mock Complete API Response",
        async ({ page }) => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Network Interception",
                story: "Mock Complete API Response",
                severity: "critical"
            });
            // ==========================================
            // Network Interceptor
            // ==========================================
            const interceptor = new NetworkInterceptor(page);
            // ==========================================
            // Mock API Response
            // ==========================================
            await AllureHelper.step(
                "Mock Posts API Response",
                async () => {
                    await interceptor.mockResponse(
                        "**/posts/1",
                        mockedUsers
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
                        "Mocked Response",
                        response
                    );
                }
            );
        }
    );
    // ==========================================
    // Mock Single User API
    // ==========================================
    test(
        "Mock Single User API",
        async ({ page }) => {
            await AllureHelper.metadata({
                feature: "Network Interception",
                story: "Mock Single User API",
                severity: "critical"
            });
            const interceptor = new NetworkInterceptor(page);
            await AllureHelper.step(
                "Mock User API Response",
                async () => {
                    await interceptor.mockResponse(
                        "**/users/1",
                        apiMockUser
                    );
                }
            );
            await AllureHelper.step(
                "Navigate to SauceDemo",
                async () => {
                    await page.goto(config.sauceDemoUrl);
                    await page.waitForLoadState("networkidle");
                }
            );
            await AllureHelper.step(
                "Verify Mocked User Response",
                async () => {
                    const response = await page.evaluate(
                        async (baseUrl) => {
                            const res = await fetch(
                                `${baseUrl}users/1`
                            );
                            return await res.json();
                        },
                        config.jsonPlaceholderBaseUrl
                    );
                    expect(response.id).toBe(101);
                    expect(response.name)
                        .toBe("Pratiksha Kaninde");
                    expect(response.username)
                        .toBe("pratiksha");
                    expect(response.email)
                        .toBe("pratiksha@test.com");
                    await AllureHelper.attachJson(
                        "Mocked User",
                        response
                    );
                }
            );
        }
    );
    // ==========================================
    // Mock API Error Response
    // ==========================================
    test(
        "Mock API Error Response",
        async ({ page }) => {
            await AllureHelper.metadata({
                feature: "Network Interception",
                story: "Mock API Error Response",
                severity: "critical"
            });
            const interceptor = new NetworkInterceptor(page);
            await AllureHelper.step(
                "Mock 404 Error Response",
                async () => {
                    await interceptor.mockResponse(
                        "**/posts/999",
                        {
                            success: false,
                            error: "Record Not Found"
                        },
                        404
                    );
                }
            );
            await AllureHelper.step(
                "Navigate to SauceDemo",
                async () => {
                    await page.goto(config.sauceDemoUrl);
                    await page.waitForLoadState("networkidle");
                }
            );
            await AllureHelper.step(
                "Verify Error Response",
                async () => {
                    const response = await page.evaluate(
                        async (baseUrl) => {
                            const res = await fetch(
                                `${baseUrl}posts/999`
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
                    expect(response.body.error)
                        .toBe("Record Not Found");
                    await AllureHelper.attachJson(
                        "Error Response",
                        response
                    );
                }
            );
        }
    );
});