import { test, expect } from "@playwright/test";
import { ApiRequestBuilder } from "../../builder/ApiRequestBuilder";
test("Verify Request Builder", async () => {
    const requestData = new ApiRequestBuilder()
        .url("/booking")
        .headers({
            "Content-Type": "application/json"
        })
        .body({
            firstname: "John"
        })
        .build();
    expect(requestData.url).toBe("/booking");
    expect(requestData.headers["Content-Type"])
        .toBe("application/json");
    expect(requestData.body.firstname)
        .toBe("John");
});