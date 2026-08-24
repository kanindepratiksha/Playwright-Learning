import { test } from "../hooks/reporting/uiAllureHooks";
import { Severity } from "allure-js-commons";
import { AllureHelper } from "../../utils/AllureHelper";
import { HooksPage } from "../../pages/HooksPage";
let hooksPage: HooksPage;
// ==========================================
// Before All
// ==========================================
test.beforeAll(async () => {
    console.log("========== BEFORE ALL ==========");
});
// ==========================================
// Before Each
// ==========================================
test.beforeEach(async ({ page }) => {
    console.log("========== BEFORE EACH ==========");
    hooksPage = new HooksPage(page);
    await hooksPage.navigate();
    await hooksPage.login();
});
// ==========================================
// After Each
// ==========================================
test.afterEach(async ({}, testInfo) => {
    console.log("========== AFTER EACH ==========");
    console.log(`Title : ${testInfo.title}`);
    console.log(`Status : ${testInfo.status}`);
});
// ==========================================
// After All
// ==========================================
test.afterAll(async () => {
    console.log("========== AFTER ALL ==========");
});
// ==========================================
// Test Suite
// ==========================================
test.describe("Hooks Demo", () => {
    // ==========================================
    // Smoke Test
    // ==========================================
    test(
        "@smoke Verify Login",
        async () => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Playwright Hooks",
                story: "Verify Login",
                severity: Severity.CRITICAL
            });
            // ==========================================
            // Verify Login
            // ==========================================
            await AllureHelper.step(
                "Verify User Login",
                async () => {
                    await hooksPage.verifyLogin();
                }
            );
        }
    );
    // ==========================================
    // Regression Test
    // ==========================================
    test(
        "@regression Verify Logout",
        async () => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Playwright Hooks",
                story: "Verify Logout",
                severity: Severity.CRITICAL
            });
            // ==========================================
            // Logout
            // ==========================================
            await AllureHelper.step(
                "Logout from Application",
                async () => {
                    await hooksPage.logout();
                }
            );
            // ==========================================
            // Verify Logout
            // ==========================================
            await AllureHelper.step(
                "Verify Logout",
                async () => {
                    await hooksPage.verifyLogout();
                }
            );
        }
    );
    // ==========================================
    // Example Test
    // ==========================================
    test(
        "Example Test",
        async () => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Playwright Hooks",
                story: "Example Test",
                severity: Severity.NORMAL
            });
            // ==========================================
            // Verify Login
            // ==========================================
            await AllureHelper.step(
                "Verify User Login",
                async () => {
                    await hooksPage.verifyLogin();
                }
            );
        }
    );
    // ==========================================
    // Skip Example
    // ==========================================
    test.skip(
        "Checkout Test",
        async () => {
            await AllureHelper.metadata({
                feature: "Playwright Hooks",
                story: "Checkout Test",
                severity: Severity.MINOR
            });
        }
    );
});