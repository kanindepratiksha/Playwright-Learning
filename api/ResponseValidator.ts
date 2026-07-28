import { expect } from "@playwright/test";
export class ResponseValidator {
    static verifyBookingId(body: any) {
        expect(body.bookingid).toBeTruthy();
    }
    static verifyBooking(body: any, expected: any) {
        expect(body.firstname).toBe(expected.firstname);
        expect(body.lastname).toBe(expected.lastname);
        expect(body.totalprice).toBe(expected.totalprice);
        expect(body.depositpaid).toBe(expected.depositpaid);
        expect(body.bookingdates.checkin)
            .toBe(expected.bookingdates.checkin);
        expect(body.bookingdates.checkout)
            .toBe(expected.bookingdates.checkout);
        expect(body.additionalneeds)
            .toBe(expected.additionalneeds);
    }
    static verifyToken(body: any) {
        expect(body.token).toBeTruthy();
    }
}