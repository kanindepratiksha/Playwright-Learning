import {
    APIRequestContext,
    APIResponse,
    TestInfo
} from "@playwright/test";
import { BaseApi } from "./BaseApi";
import { config } from "../config/env";
import { AllureHelper } from "../utils/AllureHelper";
export class AuthApi extends BaseApi {
    constructor(
        request: APIRequestContext,
        testInfo?: TestInfo
    ) {
        super(request, testInfo);
    }
    // ==========================================
    // Generate Authentication Token
    // ==========================================
    async generateTokenResponse(): Promise<APIResponse> {
        return await AllureHelper.step(
            "Generate Authentication Token",
            async () => {
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
        );
    }
    // ==========================================
    // Get Authentication Token
    // ==========================================
    async generateToken(): Promise<string> {
        const response =
            await this.generateTokenResponse();
        const body = await response.json();
        return body.token;
    }
    // ==========================================
    // Generate Token with Invalid Payload
    // ==========================================
    async generateTokenWithInvalidPayload(): Promise<APIResponse> {
        return await AllureHelper.step(
            "Generate Token with Invalid Payload",
            async () => {
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
        );
    }
}