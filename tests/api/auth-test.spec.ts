import { expect } from "@playwright/test";
import { test } from "../hooks/reporting/apiAllureHooks";
import { AuthApi } from "../../api/AuthApi";
import { AllureHelper } from "../../utils/AllureHelper";
import { SchemaValidator } from "../../utils/SchemaValidator";
import { authSchema } from "../../schemas/authSchema";
test(
    "Generate Authentication Token",
    async ({ request }, testInfo) => {
        await AllureHelper.metadata({
            feature: "Generate Token",
            severity: "critical",
            story: "Generate Authentication Token"
        });
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
    }
);