import { expect } from "@playwright/test";
import { test } from "../../fixtures/testScopeFixture";
import { AllureHelper } from "../../utils/AllureHelper";
import { Severity } from "allure-js-commons";
test.describe("Test Scope Fixture Demo", () => {
    // ==========================================
    // Test One
    // ==========================================
    test(
        "Test One",
        async ({ sample }) => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Test Scope Fixture",
                story: "Test One",
                severity: Severity.CRITICAL
            });
            // ==========================================
            // Verify Fixture
            // ==========================================
            await AllureHelper.step(
                "Verify Sample Fixture",
                async () => {
                    expect(sample).toBeDefined();
                    expect(sample).toBe("Sample Fixture");
                    await AllureHelper.attachText(
                        "Fixture Value",
                        sample
                    );
                }
            );
        }
    );
    // ==========================================
    // Test Two
    // ==========================================
    test(
        "Test Two",
        async ({ sample }) => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Test Scope Fixture",
                story: "Test Two",
                severity: Severity.CRITICAL
            });
            // ==========================================
            // Verify Fixture
            // ==========================================
            await AllureHelper.step(
                "Verify Sample Fixture",
                async () => {
                    expect(sample).toBeDefined();
                    expect(sample).toBe("Sample Fixture");
                    await AllureHelper.attachText(
                        "Fixture Value",
                        sample
                    );
                }
            );
        }
    );
});