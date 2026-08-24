import { test } from "../hooks/reporting/apiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { AuthApi } from "../../api/AuthApi";
import { BookingApi } from "../../api/BookingApi";
import { ApiPerformanceTracker } from "../../utils/ApiPerformanceTracker";
import bookingData from "../../testdata/bookingData.json";
import { Severity } from "allure-js-commons";
test(
    "API Performance Dashboard",
    async ({ request }, testInfo) => {
        await AllureHelper.metadata({
            feature: "Performance",
            story: "API Performance Dashboard",
            severity: Severity.CRITICAL
        });
        ApiPerformanceTracker.clear();
        const authApi = new AuthApi(request, testInfo);
        const bookingApi = new BookingApi(request, testInfo);
        // Generate Token
        const token = await authApi.generateToken();
        // Create Booking
        const createResponse =
            await bookingApi.createBooking(bookingData);
        const bookingId =
            (await createResponse.json()).bookingid;
        // Execute APIs
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
        // Print Performance Summary
        ApiPerformanceTracker.printReport();
    }
);