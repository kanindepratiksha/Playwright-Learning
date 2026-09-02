export interface User {
    firstName: string;
    lastName: string;
    postalCode: string;
}
export interface ExcelUser {
    Username: string;
    Password: string;
    Expected: string;
}
export interface LoginUser {
    username: string;
    password: string;
    expected: string;
}
export interface BookingDates {
    checkin: string;
    checkout: string;
}
export interface Booking {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: BookingDates;
    additionalneeds?: string;
}
export interface CreateBookingResponse {
    bookingid: number;
    booking: Booking;
}