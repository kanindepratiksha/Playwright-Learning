import { test } from "../hooks/reporting/uiAllureHooks";
import { AllureHelper } from "../../utils/AllureHelper";
import { config } from "../../config/env";
import { testData } from "../../utils/appConstants";
import users from "../../testdata/users.json";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";
// ==========================================
// Default User
// ==========================================
const user = users[0];
test(
    "Locators Advanced Demo",
    async ({ page }) => {
        // ==========================================
        // Allure Metadata
        // ==========================================
        await AllureHelper.metadata({
            feature: "Advanced Locators",
            story: "Verify Advanced Playwright Locators",
            severity: "critical"
        });
        // ==========================================
        // Page Objects
        // ==========================================
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
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
        // Verify Products Page
        // ==========================================
        await inventoryPage.verifyPageTitle();
        await inventoryPage.verifyInventoryList();
        // ==========================================
        // Verify Products
        // ==========================================
        await inventoryPage.verifyFirstInventoryItemVisible();
        await inventoryPage.verifyLastInventoryItemVisible();
        await inventoryPage.verifyInventoryItemVisible(1);
        // ==========================================
        // Add Product
        // ==========================================
        await inventoryPage.addProduct(
            testData.product1
        );
        // ==========================================
        // Open Cart
        // ==========================================
        await inventoryPage.openCart();
        // ==========================================
        // Verify Cart
        // ==========================================
        await cartPage.verifyCartPage();
        await cartPage.verifyCartTitle();
        await cartPage.verifyProduct(
            testData.product1
        );
    }
);