import { test } from "@playwright/test";
import { BookingApi } from "../../api/BookingApi";
import { ApiAssertions } from "../../api/ApiAssertions";
import { ResponseValidator } from "../../api/ResponseValidator";
import { SchemaValidator } from "../../utils/SchemaValidator";
import { bookingSchema } from "../../schemas/bookingSchema";
import bookingData from "../../testdata/bookingData.json";
test("Get Booking", async ({ request }) => {
    const bookingApi = new BookingApi(request);
    const createResponse = await bookingApi.createBooking(bookingData);
    const bookingId = (await createResponse.json()).bookingid;
    const response = await bookingApi.getBooking(bookingId);
    ApiAssertions.verifyStatus(response, 200);
    const body = await response.json();
    ResponseValidator.verifyBooking(body, bookingData);
    SchemaValidator.validate(body, bookingSchema,"Booking Schema");
});