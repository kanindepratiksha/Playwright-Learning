import { test } from "../hooks/reporting/uiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { config } from "../../config/env";
import users from "../../testdata/users.json";
import { testData } from "../../utils/appConstants";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";
import { Severity } from "allure-js-commons";
test(
    "Verify Assertions and Waits",
    async ({ page }) => {
        await AllureHelper.metadata({
            feature: "Assertions",
            story: "Verify Assertions and Waits",
            severity: Severity.CRITICAL
        });
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const user = users[0];
        await AllureHelper.step(
            "Navigate to SauceDemo",
            async () => {
                await page.goto(
                    config.sauceDemoUrl,
                    {
                        waitUntil: "commit"
                    }
                );
                await page.waitForLoadState("networkidle");
            }
        );
        await AllureHelper.step(
            "Login",
            async () => {
                await loginPage.login(
                    user.username,
                    user.password
                );
                await inventoryPage.verifyProductsPage();
            }
        );
        await AllureHelper.step(
            "Verify Products",
            async () => {
                await inventoryPage.verifyProductVisible(
                    testData.product1
                );
            }
        );
        await AllureHelper.step(
            "Add Products to Cart",
            async () => {
                await inventoryPage.addProduct(
                    testData.product1
                );
                await inventoryPage.addProduct(
                    testData.product2
                );
                await inventoryPage.verifyCartCount("2");
            }
        );
        await AllureHelper.step(
            "Verify Shopping Cart",
            async () => {
                await inventoryPage.openCart();
                await cartPage.verifyCartPage();
                await cartPage.verifyProduct(
                    testData.product1
                );
                await cartPage.verifyProduct(
                    testData.product2
                );
            }
        );
        await AllureHelper.step(
            "Remove Product",
            async () => {
                await cartPage.removeProduct(
                    testData.product1
                );
                await cartPage.verifyCartBadgeCount("1");
            }
        );
    }
);