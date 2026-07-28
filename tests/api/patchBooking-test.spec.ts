import { test, expect } from "@playwright/test";
import { AuthApi } from "../../api/AuthApi";
import { BookingApi } from "../../api/BookingApi";
import bookingData from "../../testdata/bookingData.json";
test("Patch Booking", async ({ request }) => {
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
    const response = await request.patch(
        bookingApi.getBookingByIdUrl(bookingId),
        {
            headers: bookingApi.getAuthHeaders(token),
            data: {
                firstname: "Playwright"
            }
        }
    );
    const body = await response.json();
    expect(body.firstname).toBe("Playwright");
});
