import { test } from "../hooks/reporting/uiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { config } from "../../config/env";
import { testData } from "../../utils/appConstants";
import users from "../../testdata/users.json";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";
test(
    "UI Actions Demo",
    async ({ page }) => {
        // ==========================================
        // Allure Metadata
        // ==========================================
        await AllureHelper.metadata({
            feature: "UI Actions",
            story: "Verify UI Actions",
            severity: "critical"
        });
        // ==========================================
        // Page Objects
        // ==========================================
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        // ==========================================
        // Test Data
        // ==========================================
        const user = users[0];
        // ==========================================
        // Navigate
        // ==========================================
        await page.goto(config.sauceDemoUrl, {
            waitUntil: "commit"
        });
        await page.waitForLoadState("networkidle");
        // ==========================================
        // Login
        // ==========================================
        await loginPage.login(
            user.username,
            user.password
        );
        await inventoryPage.loginWithKeyboard();
        // ==========================================
        // Verify Login
        // ==========================================
        await loginPage.verifyLoginSuccess();
        await inventoryPage.verifyProductsPage();
        // ==========================================
        // Product Actions
        // ==========================================
        await inventoryPage.hoverFirstProduct();
        await inventoryPage.addProduct(
            testData.product1
        );
        await inventoryPage.verifyCartCount("1");
        await inventoryPage.openCart();
        // ==========================================
        // Cart Actions
        // ==========================================
        await cartPage.verifyCartPage();
        await cartPage.verifyProduct(
            testData.product1
        );
        await cartPage.removeProduct(
            testData.product1
        );
        await cartPage.verifyCartIsEmpty();
        // ==========================================
        // Browser Navigation
        // ==========================================
        await inventoryPage.goBack();
        await inventoryPage.verifyProductsPage();
        await inventoryPage.reloadPage();
        await inventoryPage.verifyProductsPage();
    }
);