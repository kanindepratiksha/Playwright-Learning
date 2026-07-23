import { APIResponse, expect } from "@playwright/test";
export class ApiAssertions {
    static verifyStatus(
        response: APIResponse,
        status: number
    ) {
        expect(response.status()).toBe(status);
    }
    static verifySuccess(
        response: APIResponse
    ) {
        expect(response.ok()).toBeTruthy();
    }
}