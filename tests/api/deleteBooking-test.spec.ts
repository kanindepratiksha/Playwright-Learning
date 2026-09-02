import { expect } from "@playwright/test";
import { test } from "../hooks/reporting/apiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { AuthApi } from "../../api/AuthApi";
import { BookingApi } from "../../api/BookingApi";
import { ApiAssertions } from "../../api/ApiAssertions";
import bookingData from "../../testdata/bookingData.json";
import { Severity } from "allure-js-commons";
test(
    "Delete Booking - Verify deletion @api @smoke",
    async ({ request }, testInfo) => {
        // ==========================================
        // Allure Metadata
        // ==========================================
        await AllureHelper.metadata({
            severity: Severity.CRITICAL,
            feature: "Delete Booking",
            story: "Delete Existing Booking"
        });
        // ==========================================
        // Initialize APIs
        // ==========================================
        const authApi = new AuthApi(
            request,
            testInfo
        );
        const bookingApi = new BookingApi(
            request,
            testInfo
        );
        // ==========================================
        // Generate Authentication Token
        // ==========================================
        const token = await authApi.generateToken();
        expect(token).toBeTruthy();
        // ==========================================
        // Create Booking
        // ==========================================
        const createResponse =
            await bookingApi.createBooking(
                bookingData
            );
        ApiAssertions.verifyStatus(
            createResponse,
            200
        );
        const createBody =
            await createResponse.json();
        const bookingId =
            createBody.bookingid;
        expect(bookingId).toBeGreaterThan(0);
        // ==========================================
        // Delete Booking
        // ==========================================
        const response =
            await bookingApi.deleteBooking(
                bookingId,
                token
            );
        // ==========================================
        // Verify Delete Status
        // ==========================================
        ApiAssertions.verifyStatus(
            response,
            201
        );
        // ==========================================
        // Verify Delete Response Body
        // ==========================================
        const responseBody =
            await response.text();
        expect(responseBody).toContain(
            "Created"
        );
        // ==========================================
        // Verify Booking No Longer Exists
        // ==========================================
        const getResponse =
            await bookingApi.getBooking(
                bookingId
            );
        expect(getResponse.status()).toBe(404);
    }
);