import { expect } from "@playwright/test";
import { test } from "../hooks/reporting/apiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { ApiRequestBuilder } from "../../builder/ApiRequestBuilder";
test("Verify Request Builder", async () => {
    await AllureHelper.metadata({
        feature: "Framework",
        story: "Request Builder"
    });
    const requestData = new ApiRequestBuilder()
        .url("/booking")
        .headers({
            "Content-Type": "application/json"
        })
        .body({
            firstname: "John"
        })
        .build();
    await AllureHelper.attachJson(
        "Request Builder Output",
        requestData
    );
    expect(requestData.url).toBe("/booking");
    expect(requestData.headers["Content-Type"])
        .toBe("application/json");
    expect(requestData.body.firstname)
        .toBe("John");
});