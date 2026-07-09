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
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.frame = page.frameLocator('#frame1');
    }
    // ==========================================
    // Dynamic Locator
    // ==========================================
    private getSampleHeading(): Locator {
        return this.frame.locator('#sampleHeading');
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
        await this.verifyVisible(this.getSampleHeading());
    }
    // ==========================================
    // Verify Heading Text
    // ==========================================
    async verifyFrameText() {
        await this.verifyText(
            this.getSampleHeading(),
            testData.frameHeading
        );
    }
}