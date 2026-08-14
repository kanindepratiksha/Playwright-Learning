import { test } from "../hooks/reporting/apiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { BookingApi } from "../../api/BookingApi";
import { ApiAssertions } from "../../api/ApiAssertions";
import { ResponseValidator } from "../../api/ResponseValidator";
import { SchemaValidator } from "../../utils/SchemaValidator";
import { bookingSchema } from "../../schemas/bookingSchema";
import bookingData from "../../testdata/bookingData.json";
test("Get Booking", async ({ request }, testInfo) => {
    await AllureHelper.metadata({
        feature: "Booking",
        story: "Retrieve Booking"
    });
    const bookingApi = new BookingApi(request, testInfo);
    // Create Booking
    const createResponse = await bookingApi.createBooking(bookingData);
    const bookingId = (await createResponse.json()).bookingid;
    // Get Booking
    const response = await bookingApi.getBooking(bookingId);
    ApiAssertions.verifyStatus(response, 200);
    const body = await response.json();
    ResponseValidator.verifyBooking(body, bookingData);
    SchemaValidator.validate(
        body,
        bookingSchema,
        "Booking Schema"
    );
});