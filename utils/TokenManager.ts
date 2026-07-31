import { APIRequestContext } from "@playwright/test";
import { AuthApi } from "../api/AuthApi";
export class TokenManager {
    private static token: string | null = null;
    static async getToken(
        request: APIRequestContext
    ): Promise<string> {
        if (this.token) {
            console.log("Using Cached Token");
            return this.token;
        }
        console.log("Generating New Token");
        const authApi = new AuthApi(request);
        this.token = await authApi.generateToken();
        return this.token;
    }
    static clearToken(): void {
        this.token = null;
    }
}