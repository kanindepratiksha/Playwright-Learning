import {
    APIRequestContext,
    APIResponse,
    TestInfo
} from "@playwright/test";
import { BaseApi } from "./BaseApi";
import { config } from "../config/env";
export class AuthApi extends BaseApi {
    constructor(
        request: APIRequestContext,
        testInfo?: TestInfo
    ) {
        super(request, testInfo);
    }
    // Returns full API response (for schema validation & assertions)
    async generateTokenResponse(): Promise<APIResponse> {
        return await this.post(
            `${config.restfulBookerBaseUrl}/auth`,
            {
                username: config.username,
                password: config.password
            },
            {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        );
    }
    // Returns only the token (for TokenManager)
    async generateToken(): Promise<string> {
        const response = await this.generateTokenResponse();
        const body = await response.json();
        return body.token;
    }
    async generateTokenWithInvalidPayload(): Promise<APIResponse> {
        return await this.post(
            `${config.restfulBookerBaseUrl}/auth`,
            {
                username: config.username
            },
            {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        );
    }
}