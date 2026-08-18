import { Severity } from "allure-js-commons";
import { test } from "../../fixtures/overrideFixture";
import { HomePage } from "../../pages/HomePage";
import { AllureHelper } from "../../utils/AllureHelper";
test.describe("Fixture Override Demo", () => {
    test(
        "Override Built-in Page Fixture",
        async ({ page }) => {
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Fixture Override",
                story: "Override Built-in Page Fixture",
                severity: Severity.CRITICAL
            });
            // ==========================================
            // Page Object
            // ==========================================
            const homePage = new HomePage(page);
            // ==========================================
            // Verify Home Page
            // ==========================================
            await AllureHelper.step(
                "Verify Home Page Title",
                async () => {
                    await homePage.verifyHomePageTitle();
                }
            );
        }
    );
});