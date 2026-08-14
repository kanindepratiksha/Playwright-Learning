import { test } from "../hooks/reporting/uiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { config } from "../../config/env";
import { testData } from "../../utils/appConstants";
import users from "../../testdata/users.json";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
test(
    "Verify Product Sorting Using Dropdown Options",
    async ({ page }) => {
        // ==========================================
        // Allure Metadata
        // ==========================================
        await AllureHelper.metadata({
            feature: "Dropdown",
            story: "Verify Product Sorting Using Dropdown Options",
            severity: "critical"
        });
        // ==========================================
        // Page Objects
        // ==========================================
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
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
        // ==========================================
        // Verify Login
        // ==========================================
        await loginPage.verifyLoginSuccess();
        await inventoryPage.verifyProductsPage();
        // ==========================================
        // Verify Product Sorting
        // ==========================================
        await inventoryPage.sortProducts("az");
        await inventoryPage.verifySortOption("az");
        await inventoryPage.verifyFirstProduct(
            testData.productNameAZ
        );
        await inventoryPage.sortProducts("za");
        await inventoryPage.verifySortOption("za");
        await inventoryPage.verifyFirstProduct(
            testData.productNameZA
        );
        await inventoryPage.sortProducts("lohi");
        await inventoryPage.verifySortOption("lohi");
        await inventoryPage.verifyFirstPrice(
            testData.lowPrice
        );
        await inventoryPage.sortProducts("hilo");
        await inventoryPage.verifySortOption("hilo");
        await inventoryPage.verifyFirstProduct(
            testData.highPriceProduct
        );
        await inventoryPage.verifyFirstPrice(
            testData.highPrice
        );
    }
);