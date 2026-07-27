import { test } from "@playwright/test";
import { BookingApi } from "../../api/BookingApi";
import { ApiAssertions } from "../../api/ApiAssertions";
import { ResponseValidator } from "../../api/ResponseValidator";
import bookingData from "../../testdata/bookingData.json";
test("Get Booking", async ({ request }) => {
    const bookingApi = new BookingApi();
    const createResponse = await request.post(
        bookingApi.getBookingUrl(),
        {
            headers: bookingApi.getDefaultHeaders(),
            data: bookingData
        }
    );
    const bookingId = (await createResponse.json()).bookingid;
    const response = await request.get(
        bookingApi.getBookingByIdUrl(bookingId),
        {
            headers: bookingApi.getDefaultHeaders()
        }
    );
    ApiAssertions.verifyStatus(response, 200);
    const body = await response.json();
    ResponseValidator.verifyBooking(body, bookingData);
});