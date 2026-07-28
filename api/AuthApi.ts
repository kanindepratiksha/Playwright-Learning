import { APIRequestContext, APIResponse } from "@playwright/test";
import { BaseApi } from "./BaseApi";
import { config } from "../config/env";
export class AuthApi extends BaseApi {
    constructor(request: APIRequestContext) {
        super(request);
    }
    async generateToken(): Promise<APIResponse> {
        return this.post(
            `${config.restfulBookerBaseUrl}/auth`,
            {
                username: config.username,
                password: config.password
            },
            {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        );
    }
}