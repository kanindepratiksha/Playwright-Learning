import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { AllureHelper } from "../utils/AllureHelper";
export class HomePage extends BasePage {
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
    }
    // ==========================================
    // Verify Home Page Title
    // ==========================================
    async verifyHomePageTitle() {
        await AllureHelper.step(
            "Verify Home Page Title",
            async () => {
                await this.verifyTitle(/Swag Labs/);
            }
        );
    }
}