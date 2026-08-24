import { expect } from "@playwright/test";
import { test } from "../hooks/reporting/apiAllureHooks";
import { ApiClient } from "../../api/ApiClient";
import { AllureHelper } from "../../utils/AllureHelper";
import { config } from "../../config/env";
import { Severity } from "allure-js-commons";
test(
    "Verify Generic API Client",
    async ({ request }, testInfo) => {
        await AllureHelper.metadata({
            feature: "API Client",
            story: "GET Request Validation",
            severity: Severity.CRITICAL
        });
        const client = new ApiClient(
            request,
            testInfo
        );
        const response = await client.getRequest(
            `${config.restfulBookerBaseUrl}/booking`
        );
        expect(response.status()).toBe(200);
    }
);