import { test } from "@playwright/test";
import { AuthApi } from "../../api/AuthApi";
import { BookingApi } from "../../api/BookingApi";
import { ApiAssertions } from "../../api/ApiAssertions";
import bookingData from "../../testdata/bookingData.json";
test("Delete Booking", async ({ request }) => {
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
    const response = await request.delete(
        bookingApi.getBookingByIdUrl(bookingId),
        {
            headers: bookingApi.getAuthHeaders(token)
        }
    );
    ApiAssertions.verifyStatus(response, 201);
});
