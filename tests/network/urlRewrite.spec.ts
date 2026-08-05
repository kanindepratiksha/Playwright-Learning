import { test, expect } from "@playwright/test";
import { config } from "../../config/env";
import { NetworkInterceptor } from "../../utils/NetworkInterceptor";
test("Rewrite URL", async ({ page }) => {
    const interceptor = new NetworkInterceptor(page);
    await interceptor.rewriteUrl(
        "**/posts/1",
        `${config.jsonPlaceholderBaseUrl}posts/2`
    );
    await page.goto(config.sauceDemoUrl);
    const result = await page.evaluate(async (baseUrl) => {
        const response = await fetch(`${baseUrl}posts/1`);
        return response.json();
    }, config.jsonPlaceholderBaseUrl);
    expect(result.id).toBe(2);
});