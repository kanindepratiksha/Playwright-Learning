import { APIRequestContext, APIResponse, expect } from "@playwright/test";
export class BaseApi {
    constructor(protected request: APIRequestContext) {}
    protected async get(
        url: string,
        headers: Record<string, string> = {}
    ): Promise<APIResponse> {
        const response = await this.request.get(url, { headers });
        expect(response.ok()).toBeTruthy();
        return response;
    }
    protected async post(
        url: string,
        data: any,
        headers: Record<string, string> = {}
    ): Promise<APIResponse> {
        const response = await this.request.post(url, {
            headers,
            data
        });
        expect(response.ok()).toBeTruthy();
        return response;
    }
    protected async put(
        url: string,
        data: any,
        headers: Record<string, string> = {}
    ): Promise<APIResponse> {
        const response = await this.request.put(url, {
            headers,
            data
        });
        expect(response.ok()).toBeTruthy();
        return response;
    }
    protected async delete(
        url: string,
        headers: Record<string, string> = {}
    ): Promise<APIResponse> {
        const response = await this.request.delete(url, {
            headers
        });
        expect(response.ok()).toBeTruthy();
        return response;
    }
}