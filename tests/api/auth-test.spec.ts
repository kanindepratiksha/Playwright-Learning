import { test, expect } from "@playwright/test";
import { AuthApi } from "../../api/AuthApi";
import { SchemaValidator } from "../../utils/SchemaValidator";
import { authSchema } from "../../schemas/authSchema";
test("Generate Authentication Token", async ({ request }) => {
    const authApi = new AuthApi(request);
    const response = await authApi.generateToken();
    const body = await response.json();
    SchemaValidator.validate(body, authSchema, "Authentication Schema");
});

test("Reject Authentication with Invalid Payload", async ({ request }) => {
    const response = await request.post(
        "https://restful-booker.herokuapp.com/auth",
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            data: { username: "admin" }
        }
    );

    expect(response.status()).toBe(200);
    await expect(response.json()).resolves.toEqual({ reason: "Bad credentials" });
});
