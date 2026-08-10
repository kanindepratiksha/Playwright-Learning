import {
    APIRequestContext,
    APIResponse,
    TestInfo
} from "@playwright/test";
import { BaseApi } from "./BaseApi";
import { AllureHelper } from "../utils/AllureHelper";
export class ApiClient extends BaseApi {
    constructor(
        request: APIRequestContext,
        testInfo?: TestInfo
    ) {
        super(request, testInfo);
    }
    // ==========================================
    // GET Request
    // ==========================================
    async getRequest(
        url: string,
        headers: Record<string, string> = {}
    ): Promise<APIResponse> {
        return await AllureHelper.step(
            "Send GET Request",
            async () => {
                return await this.get(
                    url,
                    headers
                );
            }
        );
    }
    // ==========================================
    // POST Request
    // ==========================================
    async postRequest(
        url: string,
        body: any,
        headers: Record<string, string> = {}
    ): Promise<APIResponse> {
        return await AllureHelper.step(
            "Send POST Request",
            async () => {
                return await this.post(
                    url,
                    body,
                    headers
                );
            }
        );
    }
    // ==========================================
    // PUT Request
    // ==========================================
    async putRequest(
        url: string,
        body: any,
        headers: Record<string, string> = {}
    ): Promise<APIResponse> {
        return await AllureHelper.step(
            "Send PUT Request",
            async () => {
                return await this.put(
                    url,
                    body,
                    headers
                );
            }
        );
    }
    // ==========================================
    // PATCH Request
    // ==========================================
    async patchRequest(
        url: string,
        body: any,
        headers: Record<string, string> = {}
    ): Promise<APIResponse> {
        return await AllureHelper.step(
            "Send PATCH Request",
            async () => {
                return await this.patch(
                    url,
                    body,
                    headers
                );
            }
        );
    }
    // ==========================================
    // DELETE Request
    // ==========================================
    async deleteRequest(
        url: string,
        headers: Record<string, string> = {}
    ): Promise<APIResponse> {
        return await AllureHelper.step(
            "Send DELETE Request",
            async () => {
                return await this.delete(
                    url,
                    headers
                );
            }
        );
    }
}