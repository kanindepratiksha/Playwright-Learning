import { test } from "@playwright/test";
import { AuthApi } from "../../api/AuthApi";
import { BookingApi } from "../../api/BookingApi";
import { ApiAssertions } from "../../api/ApiAssertions";
import bookingData from "../../testdata/bookingData.json";
test("Update Booking", async ({ request }) => {
    const authApi = new AuthApi();
    const bookingApi = new BookingApi();
    const authResponse = await request.post(authApi.getAuthUrl(), {
        headers: authApi.getDefaultHeaders(),
        data: { username: "admin", password: "password123" }
    });
    const token = (await authResponse.json()).token;
    const createResponse = await request.post(
        bookingApi.getBookingUrl(),
        {
            headers: bookingApi.getDefaultHeaders(),
            data: bookingData
        }
    );
    const bookingId = (await createResponse.json()).bookingid;
    const updatedBooking = {
        ...bookingData,
        lastname: "Updated",
        totalprice: 800
    };
    const response = await request.put(
        bookingApi.getBookingByIdUrl(bookingId),
        {
            headers: bookingApi.getAuthHeaders(token),
            data: updatedBooking
        }
    );
    ApiAssertions.verifyStatus(response, 200);
});
