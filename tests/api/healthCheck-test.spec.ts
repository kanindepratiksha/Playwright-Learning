import { expect } from "@playwright/test";
import { test } from "../hooks/reporting/apiAllureHooks";
import { BookingApi } from "../../api/BookingApi";
import { AllureHelper } from "../../utils/AllureHelper";
import { ApiAssertions } from "../../api/ApiAssertions";
import { Severity } from "allure-js-commons";
test.describe("Restful Booker - Health Check", () => {
    test(
        "Verify Restful Booker API health @api @smoke",
        async ({ request }, testInfo) => {
            await AllureHelper.metadata({
                feature: "Restful Booker API",
                story: "API Health Check",
                severity: Severity.CRITICAL
            });
            const bookingApi = new BookingApi(
                request,
                testInfo
            );
            const response =
                await bookingApi.healthCheck();
            // ==========================================
            // Verify HTTP Status
            // ==========================================
            ApiAssertions.verifyStatus(
                response,
                201
            );
            // ==========================================
            // Verify Response Body
            // ==========================================
            const responseBody =
                await response.text();
            expect(responseBody).toContain(
                "Created"
            );
        }
    );
});