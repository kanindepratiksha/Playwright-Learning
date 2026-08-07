import { test, expect } from "@playwright/test";
import { config } from "../../config/env";
import { NetworkInterceptor } from "../../utils/NetworkInterceptor";
import mockedUsers from "../../testdata/mockedUsers.json";
test.describe("Route Fulfill", () => {
    test("Mock API response using route.fulfill()", async ({ page }) => {
        const interceptor = new NetworkInterceptor(page);
        await interceptor.mockResponse(
            "**/posts/1",
            mockedUsers,
            200,
            {
                "Access-Control-Allow-Origin": "*"
            }
        );
        await page.goto(config.sauceDemoUrl);
        const response = await page.evaluate(async (baseUrl) => {
            const res = await fetch(`${baseUrl}posts/1`);
            return await res.json();
        }, config.jsonPlaceholderBaseUrl);
        expect(response.page).toBe(1);
        expect(response.total).toBe(2);
        expect(response.data).toHaveLength(2);
        expect(response.data[0].first_name).toBe("Pratiksha");
    });
    test("Mock API with custom status", async ({ page }) => {
        const interceptor = new NetworkInterceptor(page);
        await interceptor.mockResponse(
            "**/posts/404",
            {
                success: false,
                message: "Record Not Found"
            },
            404
        );
        await page.goto(config.sauceDemoUrl);
        const response = await page.evaluate(async (baseUrl) => {
            const res = await fetch(`${baseUrl}posts/404`);
            return {
                status: res.status,
                body: await res.json()
            };
        }, config.jsonPlaceholderBaseUrl);
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Record Not Found");
    });
});