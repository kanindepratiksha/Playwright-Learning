import { APIRequestContext } from "@playwright/test";
import { BookingApi } from "../api/BookingApi";
import { TokenManager } from "../utils/TokenManager";
import { BookingFactory } from "../factory/BookingFactory";
export class BookingFlow {
    constructor(
        private request: APIRequestContext
    ) {}
    async createUpdateDeleteBooking(): Promise<number> {
        const bookingApi = new BookingApi(this.request);
        // Get cached token
        const token = await TokenManager.getToken(this.request);
        // Create dynamic booking data
        const booking = BookingFactory.createBooking();
        // Create Booking
        const createResponse = await bookingApi.createBooking(booking);
        const createBody = await createResponse.json();
        const bookingId = createBody.bookingid;
        // Update Booking
        booking.firstname = "Updated User";
        const updateResponse = await bookingApi.updateBooking(
            bookingId,
            booking,
            token
        );
        if (updateResponse.status() !== 200) {
            throw new Error(
                `Booking update failed. Status: ${updateResponse.status()}`
            );
        }
        // Delete Booking
        const deleteResponse = await bookingApi.deleteBooking(
            bookingId,
            token
        );
        if (deleteResponse.status() !== 201) {
            throw new Error(
                `Booking delete failed. Status: ${deleteResponse.status()}`
            );
        }
        return bookingId;
    }
}