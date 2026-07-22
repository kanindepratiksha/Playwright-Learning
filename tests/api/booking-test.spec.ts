import { test } from "@playwright/test";
import { AuthApi } from "../../api/AuthApi";
import { BookingApi } from "../../api/BookingApi";
import { ApiAssertions } from "../../api/ApiAssertions";
import { ResponseValidator } from "../../api/ResponseValidator";
import bookingData from "../../testdata/bookingData.json";
test("Verify Booking CRUD Operations", async ({ request }) => {
    const authApi = new AuthApi(request);
    const bookingApi = new BookingApi(request);
    // Generate Token
    const token = await authApi.generateToken();
    // Create Booking
    const createResponse = await bookingApi.createBooking(bookingData);
    ApiAssertions.verifyStatus(createResponse, 200);
    const createBody = await createResponse.json();
    ResponseValidator.verifyBookingId(createBody);
    const bookingId = createBody.bookingid;
    // Get Booking
    const getResponse = await bookingApi.getBooking(bookingId);
    ApiAssertions.verifyStatus(getResponse, 200);
    const getBody = await getResponse.json();
    ResponseValidator.verifyBooking(getBody, bookingData);
    // Update Booking
    const updatedBooking = {
        ...bookingData,
        lastname: "Updated",
        totalprice: 800
    };
    const updateResponse = await bookingApi.updateBooking(
        bookingId,
        token,
        updatedBooking
    );
    ApiAssertions.verifyStatus(updateResponse, 200);
    // Delete Booking
    const deleteResponse = await bookingApi.deleteBooking(
        bookingId,
        token
    );
    ApiAssertions.verifyStatus(deleteResponse, 201);
});