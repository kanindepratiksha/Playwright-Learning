import { test } from "../../fixtures/fixture";
import checkoutData from "../../testdata/e2e/checkoutData.json";
for (const data of checkoutData) {
    test(
        `Complete purchase - ${data.product}`,
        async ({
            inventoryPage,
            cartPage,
            checkoutPage
        }) => {
            // Verify Products page
            await inventoryPage.verifyProductsPage();
            // Add product to cart
            await inventoryPage.addProduct(data.product);
            // Verify cart count
            await inventoryPage.verifyCartCount("1");
            // Open cart
            await inventoryPage.openCart();
            // Verify cart
            await cartPage.verifyCartPage();
            await cartPage.verifyProduct(data.product);
            // Start checkout
            await cartPage.clickCheckout();
            // Fill checkout details
            await checkoutPage.fillCheckoutDetails(
                data.firstName,
                data.lastName,
                data.postalCode
            );
            // Continue checkout
            await checkoutPage.continueCheckout();
            // Finish order
            await checkoutPage.finishCheckout();
            // Verify successful order
            await checkoutPage.verifyOrderSuccess();
        }
    );
}