import { ApiAssertions } from "../../api/ApiAssertions";
import { BookingApi } from "../../api/BookingApi";
import { ResponseValidator } from "../../api/ResponseValidator";
import { test } from "../hooks/reporting/apiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { SchemaValidator } from "../../utils/SchemaValidator";
import { createBookingSchema } from "../../schemas/createBookingSchema";
import bookingData from "../../testdata/bookingData.json";
import { Severity } from "allure-js-commons";
test(
    "Create Booking",
    async ({ request }, testInfo) => {
        await AllureHelper.metadata({
            severity: Severity.CRITICAL,
            feature: "Create Booking",
            story: "Create Booking API"
        });
        const bookingApi = new BookingApi(
            request,
            testInfo
        );
        const response = await bookingApi.createBooking(
            bookingData
        );
        ApiAssertions.verifyStatus(response, 200);
        const body = await response.json();
        ResponseValidator.verifyBookingId(body);
        SchemaValidator.validate(
            body,
            createBookingSchema,
            "Create Booking Schema"
        );
    }
);