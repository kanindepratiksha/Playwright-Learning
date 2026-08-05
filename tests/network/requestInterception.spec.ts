import { test, expect } from "@playwright/test";
import { config } from "../../config/env";
import { NetworkInterceptor } from "../../utils/NetworkInterceptor";
import { Request } from "@playwright/test";
test.describe("Request Interception", () => {
    test("Capture GET request details", async ({ page }) => {
        const interceptor = new NetworkInterceptor(page);
        await interceptor.interceptRequest("**/posts/1");
        await page.goto(config.sauceDemoUrl);
        const response = await page.evaluate(async (baseUrl) => {
            const res = await fetch(`${baseUrl}posts/1`);
            return await res.json();
        }, config.jsonPlaceholderBaseUrl);
        expect(response.id).toBe(1);
        expect(response.userId).toBe(1);
        expect(response.title).toBeTruthy();
    });
    test("Intercept POST request", async ({ page }) => {
        const interceptor = new NetworkInterceptor(page);
        let method = "";
        let postData = "";
        await interceptor.interceptRequest(
            "**/posts",
            (request: Request) => {
                method = request.method();
                postData = request.postData() || "";
            }
        );
        await page.goto(config.sauceDemoUrl);
        const response = await page.evaluate(async (baseUrl) => {
            const res = await fetch(`${baseUrl}posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: "Playwright",
                    body: "Network Interception",
                    userId: 1
                })
            });
            return await res.json();
        }, config.jsonPlaceholderBaseUrl);
        expect(method).toBe("POST");
        expect(postData).toContain("Playwright");
        expect(response.title).toBe("Playwright");
    });
});