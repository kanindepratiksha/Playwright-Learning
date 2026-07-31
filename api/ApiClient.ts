import {
    APIRequestContext,
    APIResponse,
    TestInfo
} from "@playwright/test";
import { BaseApi } from "./BaseApi";
export class ApiClient extends BaseApi {
    constructor(
        request: APIRequestContext,
        testInfo?: TestInfo
    ) {
        super(request, testInfo);
    }
    async getRequest(
        url: string,
        headers: Record<string, string> = {}
    ): Promise<APIResponse> {
        return this.get(url, headers);
    }
    async postRequest(
        url: string,
        body: any,
        headers: Record<string, string> = {}
    ): Promise<APIResponse> {
        return this.post(url, body, headers);
    }
    async putRequest(
        url: string,
        body: any,
        headers: Record<string, string> = {}
    ): Promise<APIResponse> {
        return this.put(url, body, headers);
    }
    async patchRequest(
        url: string,
        body: any,
        headers: Record<string, string> = {}
    ): Promise<APIResponse> {
        return this.patch(url, body, headers);
    }
    async deleteRequest(
        url: string,
        headers: Record<string, string> = {}
    ): Promise<APIResponse> {
        return this.delete(url, headers);
    }
}