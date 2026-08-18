import { expect } from "@playwright/test";
import { test } from "../../fixtures/workerFixture";
import { AllureHelper } from "../../utils/AllureHelper";
import { Severity } from "allure-js-commons";
test.describe("Worker Fixture Demo", () => {
    // ==========================================
    // Worker Test 1
    // ==========================================
    test(
        "Worker Test 1",
        async ({ token }) => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Worker Fixture",
                story: "Worker Test 1",
                severity: Severity.CRITICAL
            });
            // ==========================================
            // Verify Worker Fixture
            // ==========================================
            await AllureHelper.step(
                "Verify Worker Token",
                async () => {
                    expect(token).toBeDefined();
                    expect(token).toBeTruthy();
                    await AllureHelper.attachText(
                        "Worker Token",
                        token
                    );
                }
            );
        }
    );
    // ==========================================
    // Worker Test 2
    // ==========================================
    test(
        "Worker Test 2",
        async ({ token }) => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Worker Fixture",
                story: "Worker Test 2",
                severity: Severity.CRITICAL
            });
            // ==========================================
            // Verify Worker Fixture
            // ==========================================
            await AllureHelper.step(
                "Verify Worker Token",
                async () => {
                    expect(token).toBeDefined();
                    expect(token).toBeTruthy();
                    await AllureHelper.attachText(
                        "Worker Token",
                        token
                    );
                }
            );
        }
    );
});