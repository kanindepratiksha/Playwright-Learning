import {
    APIRequestContext,
    TestInfo
} from "@playwright/test";
import { BookingApi } from "../../../api/BookingApi";
import { TokenManager } from "../../../utils/TokenManager";
import { BookingFactory } from "../../../factory/BookingFactory";
import { AllureHelper } from "../../../utils/AllureHelper";
export class BookingFlow {
    constructor(
        private request: APIRequestContext,
        private testInfo?: TestInfo
    ) {}
    async createUpdateDeleteBooking(): Promise<number> {
        const bookingApi = new BookingApi(
            this.request,
            this.testInfo
        );
        // ==========================================
        // Get Authentication Token
        // ==========================================
        const token = await AllureHelper.step(
            "Get Authentication Token",
            async () => {
                return await TokenManager.getToken(
                    this.request
                );
            }
        );
        // ==========================================
        // Create Booking Data
        // ==========================================
        const booking = await AllureHelper.step(
            "Generate Booking Test Data",
            async () => {
                return BookingFactory.createBooking();
            }
        );
        // ==========================================
        // Create Booking
        // ==========================================
        const bookingId = await AllureHelper.step(
            "Create Booking",
            async () => {
                const createResponse =
                    await bookingApi.createBooking(booking);
                const createBody =
                    await createResponse.json();
                return createBody.bookingid;
            }
        );
        // ==========================================
        // Update Booking
        // ==========================================
        await AllureHelper.step(
            "Update Booking",
            async () => {
                booking.firstname = "Updated User";
                const updateResponse =
                    await bookingApi.updateBooking(
                        bookingId,
                        booking,
                        token
                    );
                if (updateResponse.status() !== 200) {
                    throw new Error(
                        `Booking update failed. Status: ${updateResponse.status()}`
                    );
                }
            }
        );
        // ==========================================
        // Delete Booking
        // ==========================================
        await AllureHelper.step(
            "Delete Booking",
            async () => {
                const deleteResponse =
                    await bookingApi.deleteBooking(
                        bookingId,
                        token
                    );
                if (deleteResponse.status() !== 201) {
                    throw new Error(
                        `Booking delete failed. Status: ${deleteResponse.status()}`
                    );
                }
            }
        );
        return bookingId;
    }
}