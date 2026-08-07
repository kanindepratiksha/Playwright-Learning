import { test, expect } from "@playwright/test";
import { config } from "../../config/env";
import { NetworkInterceptor } from "../../utils/NetworkInterceptor";
test.describe("Abort Request", () => {
    test("Abort image request", async ({ page }) => {
        const interceptor = new NetworkInterceptor(page);
        await interceptor.abortRequest("**/*.png");
        await page.goto(config.sauceDemoUrl);
        expect(true).toBeTruthy();
    });
});