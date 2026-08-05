import { test, expect } from "@playwright/test";
import { AuthApi } from "../../api/AuthApi";
import { SchemaValidator } from "../../utils/SchemaValidator";
import { authSchema } from "../../schemas/authSchema";
test("Generate Authentication Token", async ({ request }, testInfo) => {
    const authApi = new AuthApi(request, testInfo);
    const response = await authApi.generateToken();
    const body = await response.json();
    SchemaValidator.validate(
        body,
        authSchema,
        "Authentication Schema"
    );
});
test("Reject Authentication with Invalid Payload", async ({ request }, testInfo) => {
    const authApi = new AuthApi(request, testInfo);
    const response = await authApi.generateTokenWithInvalidPayload();
    expect(response.status()).toBe(200);
    await expect(response.json()).resolves.toEqual({
        reason: "Bad credentials"
    });
});