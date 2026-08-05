import { test, expect } from "@playwright/test";
import { AuthApi } from "../../api/AuthApi";
import { BookingApi } from "../../api/BookingApi";
import { SchemaValidator } from "../../utils/SchemaValidator";
import { bookingSchema } from "../../schemas/bookingSchema";
import bookingData from "../../testdata/bookingData.json";
test("Patch Booking", async ({ request }, testInfo) => {
    const authApi = new AuthApi(request, testInfo);
    const bookingApi = new BookingApi(request, testInfo);
    const authResponse = await authApi.generateToken();
    const token = (await authResponse.json()).token;
    const createResponse = await bookingApi.createBooking(bookingData);
    const bookingId = (await createResponse.json()).bookingid;
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