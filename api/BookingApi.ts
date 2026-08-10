import {
    APIRequestContext,
    APIResponse,
    TestInfo
} from "@playwright/test";
import { config } from "../config/env";
import { ApiRequestBuilder } from "../builder/ApiRequestBuilder";
import { ApiClient } from "./ApiClient";
import { AllureHelper } from "../utils/AllureHelper";
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
    // ==========================================
    // Create Booking
    // ==========================================
    async createBooking(
        bookingData: any
    ): Promise<APIResponse> {
        return await AllureHelper.step(
            "Create Booking",
            async () => {
                const requestData =
                    new ApiRequestBuilder()
                        .url(`${config.restfulBookerBaseUrl}/booking`)
                        .headers({
                            "Content-Type": "application/json",
                            Accept: "application/json"
                        })
                        .body(bookingData)
                        .build();
                return await this.apiClient.postRequest(
                    requestData.url,
                    requestData.body,
                    requestData.headers
                );
            }
        );
    }
    // ==========================================
    // Get Booking
    // ==========================================
    async getBooking(
        bookingId: number
    ): Promise<APIResponse> {
        return await AllureHelper.step(
            `Get Booking : ${bookingId}`,
            async () => {
                const requestData =
                    new ApiRequestBuilder()
                        .url(
                            `${config.restfulBookerBaseUrl}/booking/${bookingId}`
                        )
                        .headers({
                            Accept: "application/json"
                        })
                        .build();
                return await this.apiClient.getRequest(
                    requestData.url,
                    requestData.headers
                );
            }
        );
    }
    // ==========================================
    // Update Booking
    // ==========================================
    async updateBooking(
        bookingId: number,
        bookingData: any,
        token: string
    ): Promise<APIResponse> {
        return await AllureHelper.step(
            `Update Booking : ${bookingId}`,
            async () => {
                const requestData =
                    new ApiRequestBuilder()
                        .url(
                            `${config.restfulBookerBaseUrl}/booking/${bookingId}`
                        )
                        .headers({
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Cookie: `token=${token}`
                        })
                        .body(bookingData)
                        .build();
                return await this.apiClient.putRequest(
                    requestData.url,
                    requestData.body,
                    requestData.headers
                );
            }
        );
    }
    // ==========================================
    // Patch Booking
    // ==========================================
    async patchBooking(
        bookingId: number,
        bookingData: any,
        token: string
    ): Promise<APIResponse> {
        return await AllureHelper.step(
            `Patch Booking : ${bookingId}`,
            async () => {
                const requestData =
                    new ApiRequestBuilder()
                        .url(
                            `${config.restfulBookerBaseUrl}/booking/${bookingId}`
                        )
                        .headers({
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Cookie: `token=${token}`
                        })
                        .body(bookingData)
                        .build();
                return await this.apiClient.patchRequest(
                    requestData.url,
                    requestData.body,
                    requestData.headers
                );
            }
        );
    }
    // ==========================================
    // Delete Booking
    // ==========================================
    async deleteBooking(
        bookingId: number,
        token: string
    ): Promise<APIResponse> {
        return await AllureHelper.step(
            `Delete Booking : ${bookingId}`,
            async () => {
                const requestData =
                    new ApiRequestBuilder()
                        .url(
                            `${config.restfulBookerBaseUrl}/booking/${bookingId}`
                        )
                        .headers({
                            "Content-Type": "application/json",
                            Cookie: `token=${token}`
                        })
                        .build();
                return await this.apiClient.deleteRequest(
                    requestData.url,
                    requestData.headers
                );
            }
        );
    }
    // ==========================================
    // Delete Booking with Invalid Token
    // ==========================================
    async deleteBookingWithInvalidToken(
        bookingId: number,
        invalidToken: string
    ): Promise<APIResponse> {
        return await AllureHelper.step(
            `Delete Booking with Invalid Token : ${bookingId}`,
            async () => {
                const requestData =
                    new ApiRequestBuilder()
                        .url(
                            `${config.restfulBookerBaseUrl}/booking/${bookingId}`
                        )
                        .headers({
                            "Content-Type": "application/json",
                            Cookie: `token=${invalidToken}`
                        })
                        .build();
                return await this.apiClient.deleteRequest(
                    requestData.url,
                    requestData.headers
                );
            }
        );
    }
}