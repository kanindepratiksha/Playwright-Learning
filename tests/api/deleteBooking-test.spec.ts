import { test } from "@playwright/test";
import { AuthApi } from "../../api/AuthApi";
import { BookingApi } from "../../api/BookingApi";
import { ApiAssertions } from "../../api/ApiAssertions";
import bookingData from "../../testdata/bookingData.json";
test("Delete Booking", async ({ request }) => {
    const authApi = new AuthApi(request);
    const bookingApi = new BookingApi(request);
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

test("Reject Delete Booking with Invalid Token", async ({ request }) => {
    const bookingApi = new BookingApi(request);
    const createResponse = await bookingApi.createBooking(bookingData);
    const bookingId = (await createResponse.json()).bookingid;

    const response = await request.delete(
        `https://restful-booker.herokuapp.com/booking/${bookingId}`,
        {
            headers: {
                "Content-Type": "application/json",
                Cookie: "token=invalid-token"
            }
        }
    );

    ApiAssertions.verifyStatus(response, 403);
});
