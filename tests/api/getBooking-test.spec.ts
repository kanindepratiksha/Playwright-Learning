import { expect } from "@playwright/test";
import { test } from "../hooks/reporting/apiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { BookingApi } from "../../api/BookingApi";
import { ApiAssertions } from "../../api/ApiAssertions";
import { ResponseValidator } from "../../api/ResponseValidator";
import { SchemaValidator } from "../../utils/SchemaValidator";
import { bookingSchema } from "../../schemas/bookingSchema";
import bookingData from "../../testdata/bookingData.json";
import { Severity } from "allure-js-commons";
test(
     "Get Booking - Verify response data @api @smoke",
    async ({ request }, testInfo) => {
        // ==========================================
        // Allure Metadata
        // ==========================================
        await AllureHelper.metadata({
            feature: "Booking",
            story: "Retrieve Booking",
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
        // Get Booking
        // ==========================================
        const response =
            await bookingApi.getBooking(
                bookingId
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
        // Verify Booking Response Data
        // ==========================================
        ResponseValidator.verifyBooking(
            body,
            bookingData
        );
        // ==========================================
        // Explicit Response Data Assertions
        // ==========================================
        expect(body.firstname).toBe(
            bookingData.firstname
        );
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