import {
    APIRequestContext,
    APIResponse,
    TestInfo
} from "@playwright/test";
import { config } from "../config/env";
import { ApiRequestBuilder } from "../builder/ApiRequestBuilder";
import { ApiClient } from "./ApiClient";
export class BookingApi {
    private apiClient: ApiClient;
    constructor(
        request: APIRequestContext,
        testInfo?: TestInfo
    ) {
        this.apiClient = new ApiClient(
            request,
            testInfo
        );
    }
    async createBooking(
        bookingData: any
    ): Promise<APIResponse> {
        const requestData = new ApiRequestBuilder()
            .url(`${config.restfulBookerBaseUrl}/booking`)
            .headers({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
            .body(bookingData)
            .build();
        return await this.apiClient.postRequest(
            requestData.url,
            requestData.body,
            requestData.headers
        );
    }
    async getBooking(
        bookingId: number
    ): Promise<APIResponse> {
        const requestData = new ApiRequestBuilder()
            .url(`${config.restfulBookerBaseUrl}/booking/${bookingId}`)
            .headers({
                "Accept": "application/json"
            })
            .build();
        return await this.apiClient.getRequest(
            requestData.url,
            requestData.headers
        );
    }
    async updateBooking(
        bookingId: number,
        bookingData: any,
        token: string
    ): Promise<APIResponse> {
        const requestData = new ApiRequestBuilder()
            .url(`${config.restfulBookerBaseUrl}/booking/${bookingId}`)
            .headers({
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${token}`
            })
            .body(bookingData)
            .build();
        return await this.apiClient.putRequest(
            requestData.url,
            requestData.body,
            requestData.headers
        );
    }
    async patchBooking(
        bookingId: number,
        bookingData: any,
        token: string
    ): Promise<APIResponse> {
        const requestData = new ApiRequestBuilder()
            .url(`${config.restfulBookerBaseUrl}/booking/${bookingId}`)
            .headers({
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${token}`
            })
            .body(bookingData)
            .build();
        return await this.apiClient.patchRequest(
            requestData.url,
            requestData.body,
            requestData.headers
        );
    }
    async deleteBooking(
        bookingId: number,
        token: string
    ): Promise<APIResponse> {
        const requestData = new ApiRequestBuilder()
            .url(`${config.restfulBookerBaseUrl}/booking/${bookingId}`)
            .headers({
                "Content-Type": "application/json",
                "Cookie": `token=${token}`
            })
            .build();
        return await this.apiClient.deleteRequest(
            requestData.url,
            requestData.headers
        );
    }
    async deleteBookingWithInvalidToken(
        bookingId: number,
        invalidToken: string
    ): Promise<APIResponse> {
        const requestData = new ApiRequestBuilder()
            .url(`${config.restfulBookerBaseUrl}/booking/${bookingId}`)
            .headers({
                "Content-Type": "application/json",
                "Cookie": `token=${invalidToken}`
            })
            .build();
        return await this.apiClient.deleteRequest(
            requestData.url,
            requestData.headers
        );
    }
}