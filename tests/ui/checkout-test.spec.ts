import { test } from "../hooks/reporting/uiAllureHooks";
import { expect } from "@playwright/test";
import { Severity } from "allure-js-commons";
import { AllureHelper } from "../../utils/AllureHelper";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";
import { FakerUtils } from "../../utils/FakerUtils";
import { config } from "../../config/env";
import { testData } from "../../utils/appConstants";
import users from "../../testdata/users.json";
test(
    "Checkout using Dynamic Test Data @ui @smoke",
    async ({ page }) => {
        await AllureHelper.metadata({
            feature: "Dynamic Test Data",
            story: "Checkout using Dynamic Test Data",
            severity: Severity.CRITICAL
        });
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const user = FakerUtils.getUser();
        await page.goto(config.sauceDemoUrl, {
            waitUntil: "commit"
        });
        await page.waitForLoadState("networkidle");
        // Login
        await loginPage.login(
            users[0].username,
            users[0].password
        );
        // Add product
        await inventoryPage.addProduct(
            testData.product1
        );
        // Open cart
        await inventoryPage.openCart();
        // Verify product in cart
        await expect(
            cartPage.getProduct(testData.product1)
        ).toBeVisible();
        // Checkout
        await cartPage.clickCheckout();
        await checkoutPage.completeCheckout(user);
        // Verify successful order
        await expect(
            checkoutPage.orderCompleteHeader
        ).toBeVisible();
        // Attach dynamic user data to Allure
        await AllureHelper.attachJson(
            "Dynamic User",
            user
        );
    }
);