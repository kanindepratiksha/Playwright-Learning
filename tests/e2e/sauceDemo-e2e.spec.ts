import { expect } from "@playwright/test";
import { test } from "../../fixtures/fixture";
import checkoutData from "../../testdata/e2e/checkoutData.json";
for (const data of checkoutData) {
    test(
        `Complete purchase - ${data.product} @ui @smoke`,
        async ({
            inventoryPage,
            cartPage,
            checkoutPage
        }) => {
            // ==========================================
            // Verify Products Page
            // ==========================================
            await expect(
                inventoryPage.title
            ).toHaveText("Products");
            await expect(
                inventoryPage.inventory
            ).toBeVisible();
            // ==========================================
            // Add Product to Cart
            // ==========================================
            await inventoryPage.addProduct(
                data.product
            );
            // ==========================================
            // Verify Cart Count
            // ==========================================
            await expect(
                inventoryPage.cartBadgeLocator
            ).toHaveText("1");
            // ==========================================
            // Open Cart
            // ==========================================
            await inventoryPage.openCart();
            // ==========================================
            // Verify Cart Page
            // ==========================================
            await expect(
                cartPage.title
            ).toHaveText("Your Cart");
            // ==========================================
            // Verify Product in Cart
            // ==========================================
            await expect(
                cartPage.getProduct(
                    data.product
                )
            ).toBeVisible();
            // ==========================================
            // Start Checkout
            // ==========================================
            await cartPage.clickCheckout();
            // ==========================================
            // Fill Checkout Details
            // ==========================================
            await checkoutPage.fillCheckoutDetails(
                data.firstName,
                data.lastName,
                data.postalCode
            );
            // ==========================================
            // Continue Checkout
            // ==========================================
            await checkoutPage.continueCheckout();
            // ==========================================
            // Finish Order
            // ==========================================
            await checkoutPage.finishCheckout();
            // ==========================================
            // Verify Successful Order
            // ==========================================
            await expect(
                checkoutPage.orderCompleteHeader
            ).toBeVisible();
        }
    );
}