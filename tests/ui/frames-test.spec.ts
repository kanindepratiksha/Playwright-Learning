import { test } from "../hooks/reporting/uiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { FramesPage } from "../../pages/FramesPage";
import { Severity } from "allure-js-commons";
test(
    "Verify Frames",
    async ({ page }) => {
        await AllureHelper.metadata({
            feature: "Frames",
            story: "Verify Frames",
            severity: Severity.CRITICAL
        });
        const framesPage = new FramesPage(page);
        await framesPage.navigate();
        await framesPage.verifyFrameHeadingVisible();
        await framesPage.verifyFrameText();
    }
);