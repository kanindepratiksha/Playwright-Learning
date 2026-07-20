import { APIRequestContext, expect } from "@playwright/test";
import { config } from "../config/env";
export class AuthApi {
  constructor(private request: APIRequestContext) {}
  async generateToken(): Promise<string> {
    const response = await this.request.post(
      `${config.restfulBookerBaseUrl}/auth`,
      {
        data: {
          username: "admin",
          password: "password123",
        },
      }
    );
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.token).toBeTruthy();
    return responseBody.token;
  }
}