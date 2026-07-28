import { APIResponse, expect } from "@playwright/test";
export class ApiAssertions {
    static verifyStatus(
        response: APIResponse,
        expectedStatus: number
    ): void {
        expect(response.status()).toBe(expectedStatus);
    }
    static verifyResponseTime(
        responseTime: number,
        maxResponseTime: number = 2000
    ): void {
        expect(responseTime).toBeLessThanOrEqual(maxResponseTime);
    }
}