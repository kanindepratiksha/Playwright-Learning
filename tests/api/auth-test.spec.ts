import { test, expect } from "@playwright/test";
import { AuthApi } from "../../api/AuthApi";
test("Verify Authentication Token Generation", async ({ request }) => {
    const authApi = new AuthApi(request);
    const token = await authApi.generateToken();
    expect(token).toBeTruthy();
});