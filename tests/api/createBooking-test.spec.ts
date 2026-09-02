import { expect } from "@playwright/test";
import { ApiAssertions } from "../../api/ApiAssertions";
import { BookingApi } from "../../api/BookingApi";
import { ResponseValidator } from "../../api/ResponseValidator";
import { test } from "../hooks/reporting/apiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { SchemaValidator } from "../../utils/SchemaValidator";
import { createBookingSchema } from "../../schemas/createBookingSchema";
import bookingData from "../../testdata/bookingData.json";
import { Severity } from "allure-js-commons";
import { CreateBookingResponse } from "../../utils/types";
test(
    "Create Booking - Verify response data @api @smoke",
    async ({ request }, testInfo) => {
        // ==========================================
        // Allure Metadata
        // ==========================================
        await AllureHelper.metadata({
            severity: Severity.CRITICAL,
            feature: "Create Booking",
            story: "Create Booking API"
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
        const response = await bookingApi.createBooking(
            bookingData
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
            await response.json() as CreateBookingResponse;
        // ==========================================
        // Verify Booking ID
        // ==========================================
        ResponseValidator.verifyBookingId(
            body
        );
        expect(body.bookingid).toBeGreaterThan(0);
        // ==========================================
        // Verify Response Data
        // ==========================================
        expect(body.booking).toBeDefined();
        expect(body.booking.firstname).toBe(
            bookingData.firstname
        );
        expect(body.booking.lastname).toBe(
            bookingData.lastname
        );
        expect(body.booking.totalprice).toBe(
            bookingData.totalprice
        );
        expect(body.booking.depositpaid).toBe(
            bookingData.depositpaid
        );
        expect(body.booking.bookingdates.checkin).toBe(
            bookingData.bookingdates.checkin
        );
        expect(body.booking.bookingdates.checkout).toBe(
            bookingData.bookingdates.checkout
        );
        expect(body.booking.additionalneeds).toBe(
            bookingData.additionalneeds
        );
        // ==========================================
        // Schema Validation
        // ==========================================
        SchemaValidator.validate(
            body,
            createBookingSchema,
            "Create Booking Schema"
        );
    }
);