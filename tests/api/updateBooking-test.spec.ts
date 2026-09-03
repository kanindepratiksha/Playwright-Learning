import { expect } from "@playwright/test";
import { test } from "../hooks/reporting/apiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { AuthApi } from "../../api/AuthApi";
import { BookingApi } from "../../api/BookingApi";
import { ApiAssertions } from "../../api/ApiAssertions";
import { SchemaValidator } from "../../utils/SchemaValidator";
import { bookingSchema } from "../../schemas/bookingSchema";
import bookingData from "../../testdata/bookingData.json";
import { Severity } from "allure-js-commons";
test(
    "Update Booking - Verify response data @api @smoke",
    async ({ request }, testInfo) => {
        // ==========================================
        // Allure Metadata
        // ==========================================
        await AllureHelper.metadata({
            feature: "Booking",
            story: "Update Booking",
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
        // Updated Booking Data
        // ==========================================
        const updatedBooking = {
            ...bookingData,
            lastname: "Updated",
            totalprice: 800
        };
        // ==========================================
        // Update Booking
        // ==========================================
        const response =
            await bookingApi.updateBooking(
                bookingId,
                updatedBooking,
                token
            );
        // ==========================================
        // Verify HTTP Status
        // ==========================================
        ApiAssertions.verifyStatus(
            response,
            200
        );
        // ==========================================
        // Parse Response
        // ==========================================
        const body =
            await response.json();
        // ==========================================
        // Verify Updated Response Data
        // ==========================================
        expect(body.firstname).toBe(
            updatedBooking.firstname
        );
        expect(body.lastname).toBe(
            updatedBooking.lastname
        );
        expect(body.totalprice).toBe(
            updatedBooking.totalprice
        );
        expect(body.depositpaid).toBe(
            updatedBooking.depositpaid
        );
        expect(body.bookingdates.checkin).toBe(
            updatedBooking.bookingdates.checkin
        );
        expect(body.bookingdates.checkout).toBe(
            updatedBooking.bookingdates.checkout
        );
        expect(body.additionalneeds).toBe(
            updatedBooking.additionalneeds
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
test(
     "Reject Update Booking with Invalid Authorization Header @api @regression",
    async ({ request }, testInfo) => {
        // ==========================================
        // Allure Metadata
        // ==========================================
        await AllureHelper.metadata({
            feature: "Booking",
            story: "Update Booking with Invalid Authorization",
            severity: Severity.CRITICAL
        });
        // ==========================================
        // Initialize Booking API
        // ==========================================
        const bookingApi = new BookingApi(
            request,
            testInfo
        );
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
        // Update with Invalid Token
        // ==========================================
        const response =
            await bookingApi.updateBooking(
                bookingId,
                bookingData,
                "invalid-token"
            );
        // ==========================================
        // Verify Unauthorized Response
        // ==========================================
        ApiAssertions.verifyStatus(
            response,
            403
        );
    }
);