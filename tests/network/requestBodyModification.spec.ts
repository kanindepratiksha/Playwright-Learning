import { test, expect } from "@playwright/test";
import { config } from "../../config/env";
import { NetworkInterceptor } from "../../utils/NetworkInterceptor";
test("Modify Request Body", async ({ page }) => {
    const interceptor = new NetworkInterceptor(page);
    await interceptor.modifyRequestBody("**/posts", body => {
        body.title = "Modified By Playwright";
        body.userId = 999;
    });
    await page.goto(config.sauceDemoUrl);
    const result = await page.evaluate(async (baseUrl) => {
        const response = await fetch(`${baseUrl}posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: "Original",
                body: "Body",
                userId: 1
            })
        });
        return response.json();
    }, config.jsonPlaceholderBaseUrl);
    expect(result.title).toBe("Modified By Playwright");
});