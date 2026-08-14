import { test } from "../hooks/reporting/uiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { HooksAdvancedPage } from "../../pages/hooks-advancedPage";
import users from "../../testdata/users.json";
// ==========================================
// Page Object
// ==========================================
let hooksAdvancedPage: HooksAdvancedPage;
// ==========================================
// test.use()
// ==========================================
test.use({
    viewport: {
        width: 1366,
        height: 768
    }
});
// ==========================================
// Test Suite
// ==========================================
test.describe("Hooks Advanced - Playwright Features", () => {
    // ==========================================
    // Execute tests sequentially
    // ==========================================
    test.describe.configure({
        mode: "serial"
    });
    // ==========================================
    // Before Each
    // ==========================================
    test.beforeEach(async ({ page }) => {
        hooksAdvancedPage = new HooksAdvancedPage(page);
        await hooksAdvancedPage.navigate();
        await hooksAdvancedPage.login(
            users[0].username,
            users[0].password
        );
    });
    // ==========================================
    // Verify Login
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
                severity: "critical"
            });
            // ==========================================
            // Verify Login
            // ==========================================
            await AllureHelper.step(
                "Verify User is Logged In",
                async () => {
                    await hooksAdvancedPage.verifyLogin();
                }
            );
        }
    );
    // ==========================================
    // Verify Logout
    // ==========================================
    test(
        "@regression Verify Logout",
        async () => {
            test.slow();
            // ==========================================
            // Allure Metadata
            // ==========================================
            await AllureHelper.metadata({
                feature: "Playwright Hooks",
                story: "Verify Logout",
                severity: "critical"
            });
            // ==========================================
            // Logout
            // ==========================================
            await AllureHelper.step(
                "Logout From Application",
                async () => {
                    await hooksAdvancedPage.logout();
                }
            );
            // ==========================================
            // Verify Logout
            // ==========================================
            await AllureHelper.step(
                "Verify Logout Successful",
                async () => {
                    await hooksAdvancedPage.verifyLogout();
                }
            );
        }
    );
    // ==========================================
    // Known Bug Example
    // ==========================================
    test(
        "Known Bug Example",
        async () => {
            await AllureHelper.metadata({
                feature: "Playwright Hooks",
                story: "Known Bug Example",
                severity: "minor"
            });
            await AllureHelper.step(
                "Known Bug Placeholder",
                async () => {
                    // Placeholder for future known bug validation.
                }
            );
        }
    );
    // ==========================================
    // Future Feature
    // ==========================================
    test.fixme(
        "Wishlist Feature",
        async () => {
            await AllureHelper.metadata({
                feature: "Playwright Hooks",
                story: "Wishlist Feature",
                severity: "minor"
            });
        }
    );
    // ==========================================
    // After Each
    // ==========================================
    test.afterEach(async ({ page }, testInfo) => {
        console.log("========== AFTER EACH ==========");
        console.log(`Title : ${testInfo.title}`);
        console.log(`Status : ${testInfo.status}`);
        console.log(`Duration : ${testInfo.duration} ms`);
        await page.screenshot({
            path: testInfo.outputPath("screenshot.png"),
            fullPage: true
        });
    });
});