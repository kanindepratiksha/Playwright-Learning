import { expect } from "@playwright/test";
import { test } from "../hooks/reporting/apiAllureHooks";
import { AuthApi } from "../../api/AuthApi";
import { BookingApi } from "../../api/BookingApi";
import { AllureHelper } from "../../utils/AllureHelper";
import { SchemaValidator } from "../../utils/SchemaValidator";
import { bookingSchema } from "../../schemas/bookingSchema";
import bookingData from "../../testdata/bookingData.json";
import { Severity } from "allure-js-commons";
test(
     "Patch Booking - Verify partial update response @api @smoke",
    async ({ request }, testInfo) => {
        // ==========================================
        // Allure Metadata
        // ==========================================
        await AllureHelper.metadata({
            feature: "Booking",
            story: "Partial Update Booking",
            severity: Severity.CRITICAL
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
        expect(createResponse.status()).toBe(200);
        const createBody =
            await createResponse.json();
        const bookingId =
            createBody.bookingid;
        expect(bookingId).toBeGreaterThan(0);
        // ==========================================
        // Patch Booking
        // ==========================================
        const patchData = {
            firstname: "Playwright"
        };
        let response =
            await bookingApi.patchBooking(
                bookingId,
                patchData,
                token
            );
        // ==========================================
        // Retry with Fresh Token if Required
        // ==========================================
        if (response.status() === 403) {
            const freshToken =
                await authApi.generateToken();
            expect(freshToken).toBeTruthy();
            response =
                await bookingApi.patchBooking(
                    bookingId,
                    patchData,
                    freshToken
                );
        }
        // ==========================================
        // Verify HTTP Status
        // ==========================================
        expect(response.status()).toBe(200);
        // ==========================================
        // Parse Response
        // ==========================================
        const body =
            await response.json();
        // ==========================================
        // Verify Updated Field
        // ==========================================
        expect(body.firstname).toBe(
            "Playwright"
        );
        // ==========================================
        // Verify Unchanged Fields
        // ==========================================
        expect(body.lastname).toBe(
            bookingData.lastname
        );
        expect(body.totalprice).toBe(
            bookingData.totalprice
        );
        expect(body.depositpaid).toBe(
            bookingData.depositpaid
        );
        expect(body.bookingdates.checkin).toBe(
            bookingData.bookingdates.checkin
        );
        expect(body.bookingdates.checkout).toBe(
            bookingData.bookingdates.checkout
        );
        expect(body.additionalneeds).toBe(
            bookingData.additionalneeds
        );
        // ==========================================
        // Schema Validation
        // ==========================================
        SchemaValidator.validate(
            body,
            bookingSchema,
            "Booking Schema"
        );
    }
);