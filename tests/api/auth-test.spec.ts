import { test, expect } from "@playwright/test";
import { AuthApi } from "../../api/AuthApi";
test("Generate Authentication Token", async ({ request }) => {
    const authApi = new AuthApi();
    const response = await request.post(authApi.getAuthUrl(), {
        headers: authApi.getDefaultHeaders(),
        data: {
            username: "admin",
            password: "password123"
        }
    });
    const body = await response.json();
    expect(body.token).toBeTruthy();
});
