import {
    Page,
    FrameLocator,
    Locator
} from '@playwright/test';
import { config } from '../config/env';
import { testData } from '../utils/appConstants';
import { BasePage } from './BasePage';
export class FramesPage extends BasePage {
    // ==========================================
    // Locators
    // ==========================================
    private readonly frame: FrameLocator;
    private readonly sampleHeading: Locator;
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.frame = page.frameLocator('#frame1');
        this.sampleHeading = this.frame.locator('#sampleHeading');
    }
    // ==========================================
    // Navigate to Frames Page
    // ==========================================
    async navigate() {
        await super.navigate(config.framesUrl);
    }
    // ==========================================
    // Verify Heading Visibility
    // ==========================================
    async verifyFrameHeadingVisible() {
        await this.verifyVisible(this.sampleHeading);
    }
    // ==========================================
    // Verify Heading Text
    // ==========================================
    async verifyFrameText() {
        await this.verifyText(
            this.sampleHeading,
            testData.frameHeading
        );
    }
}