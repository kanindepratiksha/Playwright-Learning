import { test } from "@playwright/test";
import { AuthApi } from "../../api/AuthApi";
import { BookingApi } from "../../api/BookingApi";
import { ApiAssertions } from "../../api/ApiAssertions";
import bookingData from "../../testdata/bookingData.json";
test("Delete Booking", async ({ request }, testInfo) => {
    const authApi = new AuthApi(request, testInfo);
    const bookingApi = new BookingApi(request, testInfo);
    // Generate Token
    const token = await authApi.generateToken();
    // Create Booking
    const createResponse = await bookingApi.createBooking(bookingData);
    const createBody = await createResponse.json();
    const bookingId = createBody.bookingid;
    // Delete Booking
    const response = await bookingApi.deleteBooking(
        bookingId,
        token
    );
    ApiAssertions.verifyStatus(response, 201);
});