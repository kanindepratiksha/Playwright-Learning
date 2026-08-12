import { expect } from "@playwright/test";
import { test } from "../hooks/reporting/apiAllureHooks";
import { BookingFlow } from "./flows/BookingFlow";
import { AllureHelper } from "../../utils/AllureHelper";

test(
    "Booking Workflow",
    async ({ request }, testInfo) => {

        await AllureHelper.metadata({
            feature: "Booking Workflow",
            story: "Create Update Delete Booking",
            severity: "critical"
        });

        const bookingFlow = new BookingFlow(
            request,
            testInfo
        );

        let bookingId = 0;

        await AllureHelper.step(
            "Execute Booking Flow",
            async () => {
                bookingId =
                    await bookingFlow.createUpdateDeleteBooking();
            }
        );

        await AllureHelper.attachText(
            "Booking ID",
            bookingId.toString()
        );

        expect(bookingId).toBeGreaterThan(0);
    }
);