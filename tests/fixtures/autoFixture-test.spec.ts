import { test } from "../../fixtures/autoFixture";
import { AllureHelper } from "../../utils/AllureHelper";
import { config } from "../../config/env";
import { HomePage } from "../../pages/HomePage";
test.describe("Auto Fixture Demo", () => {
    test(
        "Verify Auto Fixture",
        async ({ page }) => {
            await AllureHelper.metadata({
                feature: "Auto Fixture",
                story: "Verify Auto Fixture",
                severity: "critical"
            });
            const homePage = new HomePage(page);
            await AllureHelper.step(
                "Navigate to SauceDemo",
                async () => {
                    await page.goto(
                        config.sauceDemoUrl,
                        {
                            waitUntil: "commit"
                        }
                    );
                    await page.waitForLoadState("networkidle");
                }
            );
            await AllureHelper.step(
                "Verify Home Page Title",
                async () => {
                    await homePage.verifyHomePageTitle();
                }
            );
        }
    );
});