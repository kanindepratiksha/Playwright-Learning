import { test, expect } from "@playwright/test";
import { ApiClient } from "../../api/ApiClient";
import { config } from "../../config/env";
test("Verify Generic API Client", async ({ request }) => {
    const client = new ApiClient(request);
    const response = await client.getRequest(
        `${config.restfulBookerBaseUrl}/booking`
    );
    expect(response.status()).toBe(200);
});