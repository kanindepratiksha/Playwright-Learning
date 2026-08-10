import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { testData } from "../utils/appConstants";
import { AllureHelper } from "../utils/AllureHelper";
export class BrowserContentPage extends BasePage {
    // ==========================================
    // Locators
    // ==========================================
    private readonly sampleHeading: Locator;
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.sampleHeading = page.locator("#sampleHeading");
    }
    // ==========================================
    // Verify Heading
    // ==========================================
    async verifyHeading() {
        await AllureHelper.step(
            "Verify Browser Content Heading",
            async () => {
                await this.sampleHeading.waitFor({
                    state: "visible"
                });
                await expect(this.sampleHeading).toHaveText(
                    testData.newTabHeading
                );
            }
        );
    }
}