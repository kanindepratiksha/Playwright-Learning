import {
    APIRequestContext,
    APIResponse,
    TestInfo
} from "@playwright/test";
import { RetryUtil } from "../utils/RetryUtil";
export class BaseApi {
    constructor(
        protected request: APIRequestContext,
        protected testInfo?: TestInfo
    ) {}
    private async executeRequest(
        method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
        url: string,
        headers: Record<string, string> = {},
        data?: any
    ): Promise<APIResponse> {
        console.log("\n========================================");
        console.log("API REQUEST");
        console.log("========================================");
        console.log(`Method : ${method}`);
        console.log(`URL    : ${url}`);
        if (Object.keys(headers).length) {
            console.log("\nHeaders:");
            console.log(JSON.stringify(headers, null, 2));
        }
        if (data) {
            console.log("\nRequest Body:");
            console.log(JSON.stringify(data, null, 2));
        }
        const requestDetails = {
            method,
            url,
            headers,
            body: data ?? null
        };
        if (this.testInfo) {
            await this.testInfo.attach("API Request", {
                body: Buffer.from(
                    JSON.stringify(requestDetails, null, 2)
                ),
                contentType: "application/json"
            });
        }
        const start = Date.now();
        const response = await RetryUtil.execute(async () => {
            switch (method) {
                case "GET":
                    return await this.request.get(url, { headers });
                case "POST":
                    return await this.request.post(url, {
                        headers,
                        data
                    });
                case "PUT":
                    return await this.request.put(url, {
                        headers,
                        data
                    });
                case "PATCH":
                    return await this.request.patch(url, {
                        headers,
                        data
                    });
                case "DELETE":
                    return await this.request.delete(url, {
                        headers
                    });
                default:
                    throw new Error("Unsupported HTTP Method");
            }
        });
        const end = Date.now();
        let responseBody: any;
        try {
            responseBody = await response.json();
        } catch {
            responseBody = await response.text();
        }
        const responseDetails = {
            status: response.status(),
            statusText: response.statusText(),
            responseTime: `${end - start} ms`,
            headers: response.headers(),
            body: responseBody
        };
        if (this.testInfo) {
            await this.testInfo.attach("API Response", {
                body: Buffer.from(
                    JSON.stringify(responseDetails, null, 2)
                ),
                contentType: "application/json"
            });
        }
        console.log("\n========================================");
        console.log("API RESPONSE");
        console.log("========================================");
        console.log(`Status Code   : ${response.status()}`);
        console.log(`Status Text   : ${response.statusText()}`);
        console.log(`Response Time : ${end - start} ms`);
        console.log("\nResponse Body:");
        console.log(JSON.stringify(responseBody, null, 2));
        console.log("========================================\n");
        // Return the response so each test can validate
        // the expected status (200, 201, 403, etc.).
        return response;
    }
    protected async get(
        url: string,
        headers: Record<string, string> = {}
    ): Promise<APIResponse> {
        return this.executeRequest("GET", url, headers);
    }
    protected async post(
        url: string,
        data: any,
        headers: Record<string, string> = {}
    ): Promise<APIResponse> {
        return this.executeRequest("POST", url, headers, data);
    }
    protected async put(
        url: string,
        data: any,
        headers: Record<string, string> = {}
    ): Promise<APIResponse> {
        return this.executeRequest("PUT", url, headers, data);
    }
    protected async patch(
        url: string,
        data: any,
        headers: Record<string, string> = {}
    ): Promise<APIResponse> {
        return this.executeRequest("PATCH", url, headers, data);
    }
    protected async delete(
        url: string,
        headers: Record<string, string> = {}
    ): Promise<APIResponse> {
        return this.executeRequest("DELETE", url, headers);
    }
}