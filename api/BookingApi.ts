import { APIRequestContext, APIResponse } from "@playwright/test";
import { BaseApi } from "./BaseApi";
import { config } from "../config/env";
export class BookingApi extends BaseApi {
    constructor(request: APIRequestContext) {
        super(request);
    }
    async createBooking(bookingData: any): Promise<APIResponse> {
        return this.post(
            `${config.restfulBookerBaseUrl}/booking`,
            bookingData,
            {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        );
    }
    async getBooking(bookingId: number): Promise<APIResponse> {
        return this.get(
            `${config.restfulBookerBaseUrl}/booking/${bookingId}`,
            {
                "Accept": "application/json"
            }
        );
    }
    async updateBooking(
        bookingId: number,
        bookingData: any,
        token: string
    ): Promise<APIResponse> {
        return this.put(
            `${config.restfulBookerBaseUrl}/booking/${bookingId}`,
            bookingData,
            {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${token}`
            }
        );
    }
    async patchBooking(
        bookingId: number,
        bookingData: any,
        token: string
    ): Promise<APIResponse> {
        return this.patch(
            `${config.restfulBookerBaseUrl}/booking/${bookingId}`,
            bookingData,
            {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${token}`
            }
        );
    }
    async deleteBooking(
        bookingId: number,
        token: string
    ): Promise<APIResponse> {
        return this.delete(
            `${config.restfulBookerBaseUrl}/booking/${bookingId}`,
            {
                "Content-Type": "application/json",
                "Cookie": `token=${token}`
            }
        );
    }
}