import { config } from "../config/env";
import { ApiHeaders } from "./ApiHeaders";
export class BookingApi {
    getBookingUrl(): string {
        return `${config.restfulBookerBaseUrl}/booking`;
    }
    getBookingByIdUrl(bookingId: number): string {
        return `${config.restfulBookerBaseUrl}/booking/${bookingId}`;
    }
    getDefaultHeaders(): Record<string, string> {
        return ApiHeaders.json();
    }
    getAuthHeaders(token: string): Record<string, string> {
        return ApiHeaders.auth(token);
    }
}