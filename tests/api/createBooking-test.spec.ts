import { test } from "@playwright/test";
import { BookingApi } from "../../api/BookingApi";
import { ApiAssertions } from "../../api/ApiAssertions";
import { ResponseValidator } from "../../api/ResponseValidator";
import { SchemaValidator } from "../../utils/SchemaValidator";
import { createBookingSchema } from "../../schemas/createBookingSchema";
import bookingData from "../../testdata/bookingData.json";
test("Create Booking", async ({ request }) => {
    const bookingApi = new BookingApi(request);
    const response = await bookingApi.createBooking(bookingData);
    ApiAssertions.verifyStatus(response, 200);
    const body = await response.json();
    ResponseValidator.verifyBookingId(body);
    SchemaValidator.validate(body, createBookingSchema,"Create Booking Schema");
});