import { test } from "../hooks/reporting/uiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { FramesPage } from "../../pages/FramesPage";
test(
    "Verify Frames",
    async ({ page }) => {
        await AllureHelper.metadata({
            feature: "Frames",
            story: "Verify Frames",
            severity: "critical"
        });
        const framesPage = new FramesPage(page);
        await framesPage.navigate();
        await framesPage.verifyFrameHeadingVisible();
        await framesPage.verifyFrameText();
    }
);