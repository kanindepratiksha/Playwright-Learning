import { test, expect } from "@playwright/test";
import { AuthApi } from "../../api/AuthApi";
import { SchemaValidator } from "../../utils/SchemaValidator";
import { authSchema } from "../../schemas/authSchema";
test("Generate Authentication Token", async ({ request }, testInfo) => {
    const authApi = new AuthApi(request, testInfo);
    const response = await authApi.generateTokenResponse();
    expect(response.status()).toBe(200);
    const body = await response.json();
    SchemaValidator.validate(
        body,
        authSchema,
        "Authentication Schema"
    );
    expect(body.token).toBeTruthy();
});