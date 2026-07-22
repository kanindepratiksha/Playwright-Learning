import { test } from '@playwright/test';
import { FramesPage } from '../pages/FramesPage';
test('Verify iframe handling using frameLocator()', async ({ page }) => {
    // ==========================================
    // Create Frames Page Object
    // ==========================================
    const framesPage = new FramesPage(page);
    // ==========================================
    // Navigate to Frames Page
    // ==========================================
    await framesPage.navigate();
    // ==========================================
    // Verify Frame Heading Visibility
    // ==========================================
    await framesPage.verifyFrameHeadingVisible();
    // ==========================================
    // Verify Frame Heading Text
    // ==========================================
    await framesPage.verifyFrameText();
});