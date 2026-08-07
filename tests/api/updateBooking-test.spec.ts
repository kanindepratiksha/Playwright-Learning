import { test } from "@playwright/test";
import { AuthApi } from "../../api/AuthApi";
import { BookingApi } from "../../api/BookingApi";
import { ApiAssertions } from "../../api/ApiAssertions";
import { SchemaValidator } from "../../utils/SchemaValidator";
import { bookingSchema } from "../../schemas/bookingSchema";
import bookingData from "../../testdata/bookingData.json";
test("Update Booking", async ({ request }, testInfo) => {
    const authApi = new AuthApi(request, testInfo);
    const bookingApi = new BookingApi(request, testInfo);
   const token = await authApi.generateToken();
    const createResponse = await bookingApi.createBooking(bookingData);
    const bookingId = (await createResponse.json()).bookingid;
    const updatedBooking = {
        ...bookingData,
        lastname: "Updated",
        totalprice: 800
    };
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
});
test("Reject Update Booking with Invalid Authorization Header", async ({ request }, testInfo) => {
    const bookingApi = new BookingApi(request, testInfo);
    const createResponse = await bookingApi.createBooking(bookingData);
    const bookingId = (await createResponse.json()).bookingid;
    const response = await bookingApi.updateBooking(
        bookingId,
        bookingData,
        "invalid-token"
    );
    ApiAssertions.verifyStatus(response, 403);
});