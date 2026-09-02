import { test, expect } from "../../fixtures/fixture";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";
import checkoutData from "../../testdata/e2e/checkoutData.json";
import performanceGlitchUser from "../../testdata/e2e/performanceGlitchUser.json";
const standardUser = checkoutData[0];
const secondProduct = checkoutData[1].product;
test.describe("Scenario 2", () => {
    test(
        "Standard user - Product and Cart flow @ui @regression",
        async ({ page, loginPage }) => {
            const inventoryPage = new InventoryPage(page);
            const cartPage = new CartPage(page);
            const product1 = standardUser.product;
            const product2 = secondProduct;
            await loginPage.login(
                standardUser.username,
                standardUser.password
            );
            await expect(inventoryPage.title).toHaveText("Products");
            await expect(inventoryPage.inventory).toBeVisible();
            await inventoryPage.openProduct(product1);
            await expect(page).toHaveURL(/inventory-item/);
            await expect(
                inventoryPage.getProductDetailsName()
            ).toHaveText(product1);
            await inventoryPage.addProductFromDetails(product1);
            await expect(
                inventoryPage.getProductDetailsRemoveButton()
            ).toBeVisible();
            await expect(
                inventoryPage.cartBadgeLocator
            ).toHaveText("1");
            await inventoryPage.backToProducts();
            await expect(inventoryPage.title).toHaveText("Products");
            await expect(inventoryPage.inventory).toBeVisible();
            await inventoryPage.openCart();
            await expect(cartPage.title).toHaveText("Your Cart");
            await expect(
                cartPage.getProduct(product1)
            ).toBeVisible();
            await cartPage.continueShopping();
            await expect(inventoryPage.title).toHaveText("Products");
            await expect(inventoryPage.inventory).toBeVisible();
            await expect(
                inventoryPage.getRemoveButton(product1)
            ).toBeVisible();
            await expect(
                inventoryPage.cartBadgeLocator
            ).toHaveText("1");
            await inventoryPage.removeProduct(product1);
            await expect(
                inventoryPage.cartBadgeLocator
            ).not.toBeVisible();
            await expect(
                inventoryPage.getAddToCartButton(product1)
            ).toBeVisible();
            await inventoryPage.sortProducts("za");
            await expect(
                inventoryPage.sortDropdownLocator
            ).toHaveValue("za");
            const actualNames =
                await inventoryPage.getProductNamesInOrder();
            const expectedNames =
                [...actualNames].sort((a, b) =>
                    b.localeCompare(a)
                );
            expect(actualNames).toEqual(expectedNames);
            await inventoryPage.addProduct(product1);
            await inventoryPage.addProduct(product2);
            await expect(
                inventoryPage.cartBadgeLocator
            ).toHaveText("2");
            await inventoryPage.openCart();
            await expect(cartPage.title).toHaveText("Your Cart");
            await expect(cartPage.items).toHaveCount(2);
            await expect(
                cartPage.getProduct(product1)
            ).toBeVisible();
            await expect(
                cartPage.getProduct(product2)
            ).toBeVisible();
            await expect(
                cartPage
                    .getProduct(product1)
                    .locator(".cart_quantity")
            ).toHaveText("1");
            await expect(
                cartPage
                    .getProduct(product2)
                    .locator(".cart_quantity")
            ).toHaveText("1");
            await cartPage.removeProduct(product1);
            await cartPage.removeProduct(product2);
            await expect(cartPage.items).toHaveCount(0);
            await expect(cartPage.badge).not.toBeVisible();
            await cartPage.continueShopping();
            await expect(inventoryPage.title).toHaveText("Products");
            await expect(inventoryPage.inventory).toBeVisible();
        }
    );
    test(
        "Standard user - Checkout validation @ui @regression",
        async ({ page, loginPage }) => {
            const inventoryPage = new InventoryPage(page);
            const cartPage = new CartPage(page);
            const checkoutPage = new CheckoutPage(page);
            await loginPage.login(
                standardUser.username,
                standardUser.password
            );
            await inventoryPage.addProduct(
                standardUser.product
            );
            await expect(
                inventoryPage.cartBadgeLocator
            ).toHaveText("1");
            await inventoryPage.openCart();
            await expect(cartPage.title).toHaveText("Your Cart");
            await cartPage.clickCheckout();
            await expect(
                checkoutPage.checkoutTitle
            ).toHaveText("Checkout: Your Information");
            await checkoutPage.continueCheckout();
            await expect(
                checkoutPage.errorMsg
            ).toContainText(
                "Error: First Name is required"
            );
            await checkoutPage.fillCheckoutDetails(
                standardUser.firstName,
                "",
                ""
            );
            await checkoutPage.continueCheckout();
            await expect(
                checkoutPage.errorMsg
            ).toContainText(
                "Error: Last Name is required"
            );
            await checkoutPage.fillCheckoutDetails(
                standardUser.firstName,
                standardUser.lastName,
                ""
            );
            await checkoutPage.continueCheckout();
            await expect(
                checkoutPage.errorMsg
            ).toContainText(
                "Error: Postal Code is required"
            );
        }
    );
    test(
        "Standard user - Checkout cancellation @ui @regression",
        async ({ page, loginPage }) => {
            const inventoryPage = new InventoryPage(page);
            const cartPage = new CartPage(page);
            const checkoutPage = new CheckoutPage(page);
            await loginPage.login(
                standardUser.username,
                standardUser.password
            );
            await inventoryPage.addProduct(
                standardUser.product
            );
            await inventoryPage.addProduct(
                secondProduct
            );
            await expect(
                inventoryPage.cartBadgeLocator
            ).toHaveText("2");
            await inventoryPage.openCart();
            await expect(cartPage.title).toHaveText("Your Cart");
            await expect(cartPage.items).toHaveCount(2);
            await cartPage.clickCheckout();
            await expect(
                checkoutPage.checkoutTitle
            ).toHaveText("Checkout: Your Information");
            await checkoutPage.cancelCheckout();
            await expect(cartPage.title).toHaveText("Your Cart");
            await expect(cartPage.items).toHaveCount(2);
            await expect(
                cartPage.getProduct(standardUser.product)
            ).toBeVisible();
            await expect(
                cartPage.getProduct(secondProduct)
            ).toBeVisible();
        }
    );
    test(
        "Performance glitch user - Complete checkout @ui @regression",
        async ({ page, loginPage }) => {
            const inventoryPage = new InventoryPage(page);
            const cartPage = new CartPage(page);
            const checkoutPage = new CheckoutPage(page);
            // Performance glitch user login
            await loginPage.login(
                performanceGlitchUser.username,
                performanceGlitchUser.password
            );
            await expect(inventoryPage.title).toHaveText("Products");
            await expect(inventoryPage.inventory).toBeVisible();
            // Add products
            await inventoryPage.addProduct(
                standardUser.product
            );
            await inventoryPage.addProduct(
                secondProduct
            );
            await expect(
                inventoryPage.cartBadgeLocator
            ).toHaveText("2");
            // Open cart
            await inventoryPage.openCart();
            await expect(cartPage.title).toHaveText("Your Cart");
            await expect(cartPage.items).toHaveCount(2);
            // Checkout
            await cartPage.clickCheckout();
            await expect(
                checkoutPage.checkoutTitle
            ).toHaveText("Checkout: Your Information");
            // Fill checkout details
            await checkoutPage.fillCheckoutDetails(
                standardUser.firstName,
                standardUser.lastName,
                standardUser.postalCode
            );
            await checkoutPage.continueCheckout();
            await expect(page).toHaveURL(
                /checkout-step-two/
            );
            // Complete order
            await checkoutPage.finishCheckout();
            await expect(
                checkoutPage.orderCompleteHeader
            ).toBeVisible();
            await expect(page).toHaveTitle("Swag Labs");
            await expect(page).toHaveURL(
                /checkout-complete/
            );
            // Back to products
            await checkoutPage.backHome();
            await expect(inventoryPage.title).toHaveText("Products");
            await expect(inventoryPage.inventory).toBeVisible();
            // Logout
            await inventoryPage.logout();
            await expect(
                loginPage.usernameField
            ).toBeVisible();
            await expect(
                loginPage.passwordField
            ).toBeVisible();
            await expect(
                loginPage.loginBtn
            ).toBeVisible();
        }
    );
});