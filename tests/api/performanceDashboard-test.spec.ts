import { test } from "@playwright/test";
import { AuthApi } from "../../api/AuthApi";
import { BookingApi } from "../../api/BookingApi";
import { ApiPerformanceTracker } from "../../utils/ApiPerformanceTracker";
import bookingData from "../../testdata/bookingData.json";
test("API Performance Dashboard", async ({ request }, testInfo) => {
    ApiPerformanceTracker.clear();
    const authApi = new AuthApi(request, testInfo);
    const bookingApi = new BookingApi(request, testInfo);
    const token = await authApi.generateToken();
    const createResponse =
        await bookingApi.createBooking(bookingData);
    const bookingId =
        (await createResponse.json()).bookingid;
    await bookingApi.getBooking(bookingId);
    await bookingApi.updateBooking(
        bookingId,
        bookingData,
        token
    );
    await bookingApi.patchBooking(
        bookingId,
        {
            firstname: "Playwright"
        },
        token
    );
    await bookingApi.deleteBooking(
        bookingId,
        token
    );
    ApiPerformanceTracker.printReport();
});