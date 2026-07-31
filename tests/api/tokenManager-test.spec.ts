import { test, expect } from "@playwright/test";
import { TokenManager } from "../../utils/TokenManager";
test("Verify Token Manager", async ({ request }) => {
    const token1 = await TokenManager.getToken(request);
    const token2 = await TokenManager.getToken(request);
    console.log("Token 1:", token1);
    console.log("Token 2:", token2);
    expect(token1).toBe(token2);
});