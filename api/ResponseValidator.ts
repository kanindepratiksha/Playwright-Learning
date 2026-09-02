import { expect } from "@playwright/test";
import {
    Booking,
    CreateBookingResponse
} from "../utils/types";
export class ResponseValidator {
    // ==========================================
    // Verify Booking ID
    // ==========================================
    static verifyBookingId(
        body: CreateBookingResponse
    ): void {
        expect(body.bookingid).toBeTruthy();
        expect(body.bookingid).toBeGreaterThan(0);
    }
    // ==========================================
    // Verify Booking Response
    // ==========================================
    static verifyBooking(
        body: Booking,
        expected: Booking
    ): void {
        expect(body).toBeDefined();
        expect(body.firstname).toBe(
            expected.firstname
        );
        expect(body.lastname).toBe(
            expected.lastname
        );
        expect(body.totalprice).toBe(
            expected.totalprice
        );
        expect(body.depositpaid).toBe(
            expected.depositpaid
        );
        expect(body.bookingdates).toBeDefined();
        expect(body.bookingdates.checkin).toBe(
            expected.bookingdates.checkin
        );
        expect(body.bookingdates.checkout).toBe(
            expected.bookingdates.checkout
        );
        expect(body.additionalneeds).toBe(
            expected.additionalneeds
        );
    }
    // ==========================================
    // Verify Authentication Token
    // ==========================================
    static verifyToken(
        body: { token: string }
    ): void {
        expect(body.token).toBeTruthy();
    }
}