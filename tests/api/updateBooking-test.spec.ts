import { test } from "../hooks/reporting/apiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { AuthApi } from "../../api/AuthApi";
import { BookingApi } from "../../api/BookingApi";
import { ApiAssertions } from "../../api/ApiAssertions";
import { SchemaValidator } from "../../utils/SchemaValidator";
import { bookingSchema } from "../../schemas/bookingSchema";
import bookingData from "../../testdata/bookingData.json";
test(
    "Update Booking",
    async ({ request }, testInfo) => {
        await AllureHelper.metadata({
            feature: "Booking",
            story: "Update Booking",
            severity: "critical"
        });
        const authApi = new AuthApi(request, testInfo);
        const bookingApi = new BookingApi(request, testInfo);
        // Generate Token
        const token = await authApi.generateToken();
        // Create Booking
        const createResponse =
            await bookingApi.createBooking(bookingData);
        const bookingId =
            (await createResponse.json()).bookingid;
        // Updated Booking Data
        const updatedBooking = {
            ...bookingData,
            lastname: "Updated",
            totalprice: 800
        };
        // Update Booking
        const response = await bookingApi.updateBooking(
            bookingId,
            updatedBooking,
            token
        );
        ApiAssertions.verifyStatus(response, 200);
        const body = await response.json();
        SchemaValidator.validate(
            body,
            bookingSchema,
            "Booking Schema"
        );
    }
);
test(
    "Reject Update Booking with Invalid Authorization Header",
    async ({ request }, testInfo) => {
        await AllureHelper.metadata({
            feature: "Booking",
            story: "Update Booking with Invalid Authorization",
            severity: "critical"
        });
        const bookingApi = new BookingApi(request, testInfo);
        // Create Booking
        const createResponse =
            await bookingApi.createBooking(bookingData);
        const bookingId =
            (await createResponse.json()).bookingid;
        // Update with Invalid Token
        const response = await bookingApi.updateBooking(
            bookingId,
            bookingData,
            "invalid-token"
        );
        ApiAssertions.verifyStatus(response, 403);
    }
);