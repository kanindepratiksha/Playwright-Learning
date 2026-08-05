import { test, expect } from "@playwright/test";
import { config } from "../../config/env";
import { NetworkInterceptor } from "../../utils/NetworkInterceptor";
import mockedUsers from "../../testdata/mockedUsers.json";
import apiMockUser from "../../testdata/apiMockUser.json";
test.describe("API Mocking", () => {
    test("Mock complete API response", async ({ page }) => {
        const interceptor = new NetworkInterceptor(page);
        await interceptor.mockResponse(
            "**/posts/1",
            mockedUsers
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
    test("Mock single user API", async ({ page }) => {
        const interceptor = new NetworkInterceptor(page);
        await interceptor.mockResponse(
            "**/users/1",
            apiMockUser
        );
        await page.goto(config.sauceDemoUrl);
        const response = await page.evaluate(async (baseUrl) => {
            const res = await fetch(`${baseUrl}users/1`);
            return await res.json();
        }, config.jsonPlaceholderBaseUrl);
        expect(response.id).toBe(101);
        expect(response.name).toBe("Pratiksha Kaninde");
        expect(response.username).toBe("pratiksha");
        expect(response.email).toBe("pratiksha@test.com");
    });
    test("Mock API Error Response", async ({ page }) => {
        const interceptor = new NetworkInterceptor(page);
        await interceptor.mockResponse(
            "**/posts/999",
            {
                success: false,
                error: "Record Not Found"
            },
            404
        );
        await page.goto(config.sauceDemoUrl);
        const response = await page.evaluate(async (baseUrl) => {
            const res = await fetch(`${baseUrl}posts/999`);
            return {
                status: res.status,
                body: await res.json()
            };
        }, config.jsonPlaceholderBaseUrl);
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.error).toBe("Record Not Found");
    });
});