import { expect } from "@playwright/test";
import { test } from "../../fixtures/teardownFixture";
import { AllureHelper } from "../../utils/AllureHelper";
import { Severity } from "allure-js-commons";
test.describe("Fixture Teardown Demo", () => {
    test(
        "Create and Delete User",
        async ({ user }) => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Fixture Teardown",
                story: "Create and Delete User",
                severity: Severity.CRITICAL
            });
            // ==========================================
            // Verify User Creation
            // ==========================================
            await AllureHelper.step(
                "Verify Created User",
                async () => {
                    expect(user).toBeDefined();
                    expect(user.username).toBeTruthy();
                    await AllureHelper.attachJson(
                        "Created User",
                        user
                    );
                }
            );
        }
    );
});