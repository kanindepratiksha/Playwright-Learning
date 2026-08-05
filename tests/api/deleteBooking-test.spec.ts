import { test } from "@playwright/test";
import { AuthApi } from "../../api/AuthApi";
import { BookingApi } from "../../api/BookingApi";
import { ApiAssertions } from "../../api/ApiAssertions";
import bookingData from "../../testdata/bookingData.json";
test("Delete Booking", async ({ request }, testInfo) => {
    const authApi = new AuthApi(request, testInfo);
    const bookingApi = new BookingApi(request, testInfo);
    const authResponse = await authApi.generateToken();
    const token = (await authResponse.json()).token;
    const createResponse = await bookingApi.createBooking(bookingData);
    const bookingId = (await createResponse.json()).bookingid;
    const response = await bookingApi.deleteBooking(
        bookingId,
        token
    );
    ApiAssertions.verifyStatus(response, 201);
});
test("Reject Delete Booking with Invalid Token", async ({ request }, testInfo) => {
    const bookingApi = new BookingApi(request, testInfo);
    const createResponse = await bookingApi.createBooking(bookingData);
    const bookingId = (await createResponse.json()).bookingid;
    const response = await bookingApi.deleteBookingWithInvalidToken(
        bookingId,
        "invalid-token"
    );
    ApiAssertions.verifyStatus(response, 403);
});