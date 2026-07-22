import { BaseApi } from "./BaseApi";
import { config } from "../config/env";
import { ApiHeaders } from "./ApiHeaders";
export class AuthApi extends BaseApi {
    async generateToken(): Promise<string> {
        const response = await this.post(
            `${config.restfulBookerBaseUrl}/auth`,
            {
                username: "admin",
                password: "password123"
            },
            ApiHeaders.json()
        );
        const body = await response.json();
        return body.token;
    }
}