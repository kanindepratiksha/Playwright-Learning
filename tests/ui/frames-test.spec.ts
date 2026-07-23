import { test } from '@playwright/test';
import { FramesPage } from '../../pages/FramesPage';
test('Verify Frames', async ({ page }) => {
    // ==========================================
    // Page Object
    // ==========================================
    const framesPage = new FramesPage(page);
    // ==========================================
    // Navigate
    // ==========================================
    await framesPage.navigate();
    // ==========================================
    // Verify Frame Visibility
    // ==========================================
    await framesPage.verifyFrameHeadingVisible();
    // ==========================================
    // Verify Frame Text
    // ==========================================
    await framesPage.verifyFrameText();
});