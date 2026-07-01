import {
    Page,
    FrameLocator,
    Locator,
    expect
} from '@playwright/test';

import { config } from '../config/env';
import { testData } from '../utils/appConstants';

export class FramesPage {

    // ==========================================
    // Page Object
    // ==========================================
    readonly page: Page;

    // ==========================================
    // Locators
    // ==========================================
    readonly frame: FrameLocator;
    readonly sampleHeading: Locator;

    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {

        this.page = page;

        this.frame = page.frameLocator('#frame1');

        this.sampleHeading = this.frame.locator('#sampleHeading');
    }

    // ==========================================
    // Navigate to Frames Page
    // ==========================================
    async navigate() {

        await this.page.goto(config.framesUrl);

    }

    // ==========================================
    // Verify Heading Visibility
    // ==========================================
    async verifyFrameHeadingVisible() {

        await expect(this.sampleHeading)
            .toBeVisible();

    }

    // ==========================================
    // Verify Heading Text
    // ==========================================
    async verifyFrameText() {

        await expect(this.sampleHeading)
            .toHaveText(testData.frameHeading);

    }

}