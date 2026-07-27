import { test } from "@playwright/test";
import { BookingApi } from "../../api/BookingApi";
import { ApiAssertions } from "../../api/ApiAssertions";
import { ResponseValidator } from "../../api/ResponseValidator";
import bookingData from "../../testdata/bookingData.json";
test("Create Booking", async ({ request }) => {
    const bookingApi = new BookingApi();
    const response = await request.post(
        bookingApi.getBookingUrl(),
        {
            headers: bookingApi.getDefaultHeaders(),
            data: bookingData
        }
    );
    ApiAssertions.verifyStatus(response, 200);
    const body = await response.json();
    ResponseValidator.verifyBookingId(body);
});