import { test, expect } from "@playwright/test";
import { config } from "../../config/env";
import { NetworkInterceptor } from "../../utils/NetworkInterceptor";
test.describe("Route Continue", () => {
    test("Continue original request", async ({ page }) => {
        const interceptor = new NetworkInterceptor(page);
        await interceptor.continueRequest("**/posts/1");
        await page.goto(config.sauceDemoUrl);
        const response = await page.evaluate(async (baseUrl) => {
            const res = await fetch(`${baseUrl}posts/1`);
            return await res.json();
        }, config.jsonPlaceholderBaseUrl);
        expect(response.id).toBe(1);
        expect(response.userId).toBe(1);
    });
    test("Continue request with custom headers", async ({ page }) => {
        const interceptor = new NetworkInterceptor(page);
        await interceptor.continueWithHeaders(
            "**/posts/1",
            {
                Authorization: "Bearer Playwright",
                Framework: "Automation"
            }
        );
        await page.goto(config.sauceDemoUrl);
        const response = await page.evaluate(async (baseUrl) => {
            const res = await fetch(`${baseUrl}posts/1`);
            return await res.json();
        }, config.jsonPlaceholderBaseUrl);
        expect(response.id).toBe(1);
        expect(response.userId).toBe(1);
    });
});