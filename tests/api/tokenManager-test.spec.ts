import { expect } from "@playwright/test";
import { test } from "../hooks/reporting/apiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { TokenManager } from "../../utils/TokenManager";
test("Verify Token Manager", async ({ request }) => {
    await AllureHelper.metadata({
        feature: "Authentication",
        story: "Token Manager"
    });
    const token1 = await TokenManager.getToken(request);
    const token2 = await TokenManager.getToken(request);
    await AllureHelper.attachText(
        "Generated Token",
        token1
    );
    expect(token1).toBe(token2);
});