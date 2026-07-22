import { BaseApi } from "./BaseApi";
import { config } from "../config/env";
import { ApiHeaders } from "./ApiHeaders";
export class BookingApi extends BaseApi {
    async createBooking(data: any) {
        return await this.post(
            `${config.restfulBookerBaseUrl}/booking`,
            data,
            ApiHeaders.json()
        );
    }
    async getBooking(id: number) {
        return await this.get(
            `${config.restfulBookerBaseUrl}/booking/${id}`
        );
    }
    async updateBooking(
        id: number,
        token: string,
        data: any
    ) {
        return await this.put(
            `${config.restfulBookerBaseUrl}/booking/${id}`,
            data,
            ApiHeaders.auth(token)
        );
    }
    async deleteBooking(
        id: number,
        token: string
    ) {
        return await this.delete(
            `${config.restfulBookerBaseUrl}/booking/${id}`,
            ApiHeaders.auth(token)
        );
    }
}