import { test, expect } from "@playwright/test";
import { config } from "../../config/env";
import { NetworkInterceptor } from "../../utils/NetworkInterceptor";
import modifiedPost from "../../testdata/modifiedPost.json";
test.describe("Response Modification", () => {
    test("Modify API response using route.fetch()", async ({ page }) => {
        const interceptor = new NetworkInterceptor(page);
        await interceptor.modifyResponse("**/posts/1", (body) => {
            body.title = modifiedPost.title;
            body.body = modifiedPost.body;
            body.modified = true;
            body.framework = "Playwright";
        });
        await page.goto(config.sauceDemoUrl);
        const endpoint = `${config.jsonPlaceholderBaseUrl}posts/1`;
        const result = await page.evaluate(async (url) => {
            const response = await fetch(url);
            return await response.json();
        }, endpoint);
        expect(result.modified).toBe(true);
        expect(result.framework).toBe("Playwright");
        expect(result.title).toBe(modifiedPost.title);
        expect(result.body).toBe(modifiedPost.body);
    });
    test("Modify response by adding new property", async ({ page }) => {
        const interceptor = new NetworkInterceptor(page);
        await interceptor.modifyResponse("**/posts/2", (body) => {
            body.executedBy = "Playwright Framework";
            body.executionType = "Response Modification";
        });
        await page.goto(config.sauceDemoUrl);
        const endpoint = `${config.jsonPlaceholderBaseUrl}posts/2`;
        const result = await page.evaluate(async (url) => {
            const response = await fetch(url);
            return await response.json();
        }, endpoint);
        expect(result.executedBy).toBe("Playwright Framework");
        expect(result.executionType).toBe("Response Modification");
    });
});