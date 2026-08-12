import { expect } from "@playwright/test";
import { test } from "../hooks/reporting/apiAllureHooks";
import { AuthApi } from "../../api/AuthApi";
import { BookingApi } from "../../api/BookingApi";
import { AllureHelper } from "../../utils/AllureHelper";
import { SchemaValidator } from "../../utils/SchemaValidator";
import { bookingSchema } from "../../schemas/bookingSchema";
import bookingData from "../../testdata/bookingData.json";
test("Patch Booking", async ({ request }, testInfo) => {
    await AllureHelper.metadata({
        feature: "Booking",
        story: "Partial Update Booking"
    });
    const authApi = new AuthApi(request, testInfo);
    const bookingApi = new BookingApi(request, testInfo);
    // Generate Token
    const token = await authApi.generateToken();
    // Create Booking
    const createResponse = await bookingApi.createBooking(bookingData);
    expect(createResponse.status()).toBe(200);
    const createBody = await createResponse.json();
    const bookingId = createBody.bookingid;
    // Patch Booking
    const response = await bookingApi.patchBooking(
        bookingId,
        {
            firstname: "Playwright"
        },
        token
    );
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstname).toBe("Playwright");
    SchemaValidator.validate(
        body,
        bookingSchema,
        "Booking Schema"
    );
});