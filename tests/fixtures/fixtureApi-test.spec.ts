import { APIResponse } from "@playwright/test";
import { test, expect } from "../../fixtures/apiFixture";
import { AllureHelper } from "../../utils/AllureHelper";
import { config } from "../../config/env";
test.describe("API Fixture", () => {
    test(
        "Verify Users API",
        async ({ apiClient }) => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "API Fixture",
                story: "Verify Users API",
                severity: "critical"
            });
            let response: APIResponse;
            // ==========================================
            // Send GET Request
            // ==========================================
            await AllureHelper.step(
                "Send GET Request",
                async () => {
                    response = await apiClient.get(
                        `${config.jsonPlaceholderBaseUrl}users`
                    );
                }
            );
            // ==========================================
            // Verify Status Code
            // ==========================================
            await AllureHelper.step(
                "Verify Status Code",
                async () => {
                    expect(response.status()).toBe(200);
                }
            );
            // ==========================================
            // Verify Response Body
            // ==========================================
            await AllureHelper.step(
                "Verify Response Body",
                async () => {
                    const body = await response.json();
                    expect(body).toBeTruthy();
                    expect(Array.isArray(body)).toBeTruthy();
                    expect(body.length).toBeGreaterThan(0);
                    await AllureHelper.attachJson(
                        "Users Response",
                        body
                    );
                }
            );
        }
    );
});