import { config } from "../config/env";
import { ApiHeaders } from "./ApiHeaders";
export class AuthApi {
    getAuthUrl(): string {
        return `${config.restfulBookerBaseUrl}/auth`;
    }
    getDefaultHeaders(): Record<string, string> {
        return ApiHeaders.json();
    }
}
