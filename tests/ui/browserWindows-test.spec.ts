import { test } from "../hooks/reporting/uiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { BrowserWindowsPage } from "../../pages/BrowserWindowsPage";
import { Severity } from "allure-js-commons";
test.setTimeout(90_000);
test("Verify Browser Windows", async ({ page }) => {
    await AllureHelper.metadata({
        feature: "Browser Windows",
        story: "Verify Browser Windows",
        severity: Severity.CRITICAL
    });
    const browserWindowsPage = new BrowserWindowsPage(page);
    await browserWindowsPage.navigate();
    await browserWindowsPage.verifyNewTab();
    await browserWindowsPage.verifyNewWindow();
});