import { test, expect } from "@playwright/test";
import { BookingFlow } from "./flows/BookingFlow";
test("Booking Workflow", async ({ request }) => {
    const bookingFlow = new BookingFlow(request);
    const bookingId = await bookingFlow.createUpdateDeleteBooking();
    expect(bookingId).toBeGreaterThan(0);
});