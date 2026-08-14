import { test } from "../hooks/reporting/uiAllureHooks";
import { Severity } from "allure-js-commons";
import { AllureHelper } from "../../utils/AllureHelper";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";
import { FakerUtils } from "../../utils/FakerUtils";
import { config } from "../../config/env";
import { testData } from "../../utils/appConstants";
import users from "../../testdata/users.json";
test(
    "Checkout using Dynamic Test Data",
    async ({ page }) => {
        await AllureHelper.metadata({
            feature: "Dynamic Test Data",
            story: "Checkout using Dynamic Test Data",
            severity: Severity.CRITICAL
        });
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const user = FakerUtils.getUser();
        await page.goto(config.sauceDemoUrl, {
            waitUntil: "commit"
        });
        await page.waitForLoadState("networkidle");
        await loginPage.login(
            users[0].username,
            users[0].password
        );
        await inventoryPage.addProduct(
            testData.product1
        );
        await inventoryPage.openCart();
        await cartPage.verifyProduct(
            testData.product1
        );
        await cartPage.checkout(user);
        await cartPage.verifyOrderSuccess();
        await AllureHelper.attachJson(
            "Dynamic User",
            user
        );
    }
);