import { test, expect } from "../../fixtures/fixture";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";
test.describe("Scenario 2", () => {
    test(
        "Standard user validates application and performance_glitch_user completes checkout",
        async ({ page, loginPage }) => {
            const inventoryPage =
                new InventoryPage(page);
            const cartPage =
                new CartPage(page);
            const checkoutPage =
                new CheckoutPage(page);
            const password = "secret_sauce";
            const product1 =
                "Sauce Labs Backpack";
            const product2 =
                "Sauce Labs Bike Light";
            // ==================================================
            // STANDARD USER FLOW
            // ==================================================
            await test.step(
                "1. Login as Standard user",
                async () => {
                    await loginPage.login(
                        "standard_user",
                        password
                    );
                }
            );
            await test.step(
                "2. Verify Products/Home page",
                async () => {
                    await inventoryPage.verifyProductsPage();
                }
            );
            await test.step(
                "3. Open specific product",
                async () => {
                    await inventoryPage.openProduct(
                        product1
                    );
                }
            );
            await test.step(
                "4. Add product from details page",
                async () => {
                    await inventoryPage.addProductFromDetails(
                        product1
                    );
                }
            );
            await test.step(
                "5. Verify button changed to Remove",
                async () => {
                    await inventoryPage.verifyRemoveButtonFromDetails(
                        product1
                    );
                }
            );
            await test.step(
                "6. Verify shopping cart count is 1",
                async () => {
                    await inventoryPage.verifyCartCount(
                        "1"
                    );
                }
            );
            await test.step(
                "7. Back to Products",
                async () => {
                    await page
                        .locator(
                            '[data-test="back-to-products"]'
                        )
                        .click();
                    await inventoryPage.verifyProductsPage();
                }
            );
            await test.step(
                "8-9. Open and verify Your Cart",
                async () => {
                    await inventoryPage.openCart();
                    await cartPage.verifyCartPage();
                    await cartPage.verifyProduct(
                        product1
                    );
                }
            );
            await test.step(
                "10-11. Continue Shopping",
                async () => {
                    await cartPage.continueShopping();
                    await inventoryPage.verifyProductsPage();
                }
            );
            // ==================================================
            // IMPORTANT:
            // When the last item is removed from SauceDemo,
            // the cart badge disappears completely.
            // Therefore we must NOT verify badge text "0".
            // ==================================================
            await test.step(
                "12. Remove selected product from Products page",
                async () => {
                    await inventoryPage.removeProduct(
                        product1
                    );
                    await inventoryPage.verifyCartIsEmpty();
                }
            );
            await test.step(
                "13. Verify product button changed to Add to cart",
                async () => {
                    await inventoryPage.verifyAddToCartButton(
                        product1
                    );
                }
            );
            await test.step(
                "14. Sort products Z-A and verify",
                async () => {
                    await inventoryPage.sortProducts(
                        "za"
                    );
                    await inventoryPage.verifySelectedSortOption(
                        "za"
                    );
                    await inventoryPage.verifyProductsSortedZA();
                }
            );
            await test.step(
                "15. Add two products",
                async () => {
                    await inventoryPage.addProduct(
                        product1
                    );
                    await inventoryPage.addProduct(
                        product2
                    );
                    await inventoryPage.verifyCartCount(
                        "2"
                    );
                }
            );
            await test.step(
                "16-17. Open cart and verify products",
                async () => {
                    await inventoryPage.openCart();
                    await cartPage.verifyCartPage();
                    await cartPage.verifyCartItemCount(
                        2
                    );
                    await cartPage.verifyProduct(
                        product1
                    );
                    await cartPage.verifyProduct(
                        product2
                    );
                }
            );
            await test.step(
                "18-19. Remove both products and verify empty cart",
                async () => {
                    await cartPage.removeProduct(
                        product1
                    );
                    await cartPage.removeProduct(
                        product2
                    );
                    await cartPage.verifyCartIsEmpty();
                }
            );
            await test.step(
                "20-21. Continue Shopping and verify Products page",
                async () => {
                    await cartPage.continueShopping();
                    await inventoryPage.verifyProductsPage();
                }
            );
            await test.step(
                "22. Add two products again",
                async () => {
                    await inventoryPage.addProduct(
                        product1
                    );
                    await inventoryPage.addProduct(
                        product2
                    );
                    await inventoryPage.verifyCartCount(
                        "2"
                    );
                }
            );
            await test.step(
                "23. Open cart and verify",
                async () => {
                    await inventoryPage.openCart();
                    await cartPage.verifyCartPage();
                    await cartPage.verifyCartItemCount(
                        2
                    );
                }
            );
            await test.step(
                "24-25. Open Checkout Information page",
                async () => {
                    await cartPage.clickCheckout();
                    await checkoutPage.verifyCheckoutInformationPage();
                }
            );
            await test.step(
                "26-27. Cancel checkout and return to Cart",
                async () => {
                    await checkoutPage.cancelCheckout();
                    await cartPage.verifyCartPage();
                }
            );
            await test.step(
                "28-29. Checkout again",
                async () => {
                    await cartPage.clickCheckout();
                    await checkoutPage.verifyCheckoutInformationPage();
                }
            );
            await test.step(
                "30-31. Verify First Name required error",
                async () => {
                    await checkoutPage.continueCheckout();
                    await checkoutPage.verifyErrorMessage(
                        "Error: First Name is required"
                    );
                }
            );
            await test.step(
                "32-33. Verify Last Name required error",
                async () => {
                    await checkoutPage.fillCheckoutDetails(
                        "Pratiksha",
                        "",
                        ""
                    );
                    await checkoutPage.continueCheckout();
                    await checkoutPage.verifyErrorMessage(
                        "Error: Last Name is required"
                    );
                }
            );
            await test.step(
                "34-35. Verify Postal Code required error",
                async () => {
                    await checkoutPage.fillCheckoutDetails(
                        "Pratiksha",
                        "Kaninde",
                        ""
                    );
                    await checkoutPage.continueCheckout();
                    await checkoutPage.verifyErrorMessage(
                        "Error: Postal Code is required"
                    );
                }
            );
            await test.step(
                "36. Fill complete checkout information",
                async () => {
                    await checkoutPage.fillCheckoutDetails(
                        "Pratiksha",
                        "Kaninde",
                        "411057"
                    );
                }
            );
            await test.step(
                "37-38. Continue and verify Overview page",
                async () => {
                    await checkoutPage.continueCheckout();
                    await checkoutPage.verifyCheckoutOverviewPage();
                }
            );
            await test.step(
                "39-40. Cancel Overview and verify Products page",
                async () => {
                    await checkoutPage.cancelCheckout();
                    await inventoryPage.verifyProductsPage();
                }
            );
            await test.step(
                "41-42. Logout Standard user",
                async () => {
                    await inventoryPage.logout();
                    await loginPage.verifyLoginPage();
                }
            );
            // ==================================================
            // PERFORMANCE GLITCH USER FLOW
            // ==================================================
            await test.step(
                "43. Login as performance_glitch_user",
                async () => {
                    await loginPage.login(
                        "performance_glitch_user",
                        password
                    );
                }
            );
            await test.step(
                "44. Verify Products/Home page",
                async () => {
                    await inventoryPage.verifyProductsPage();
                }
            );
            await test.step(
                "45. Verify two selected products",
                async () => {
                    await inventoryPage.verifyProductVisible(
                        product1
                    );
                    await inventoryPage.verifyProductVisible(
                        product2
                    );
                }
            );
            await test.step(
                "46-47. Open cart and click Checkout",
                async () => {
                    await inventoryPage.openCart();
                    await cartPage.verifyCartPage();
                    await cartPage.clickCheckout();
                }
            );
            await test.step(
                "48. Verify Checkout Information page",
                async () => {
                    await checkoutPage.verifyCheckoutInformationPage();
                }
            );
            await test.step(
                "49. Fill checkout information",
                async () => {
                    await checkoutPage.fillCheckoutDetails(
                        "Pratiksha",
                        "Kaninde",
                        "411057"
                    );
                }
            );
            await test.step(
                "50-51. Continue and verify Overview",
                async () => {
                    await checkoutPage.continueCheckout();
                    await checkoutPage.verifyCheckoutOverviewPage();
                }
            );
            await test.step(
                "52. Finish checkout",
                async () => {
                    await checkoutPage.finishCheckout();
                }
            );
            await test.step(
                "53-54. Verify Checkout Complete page",
                async () => {
                    await checkoutPage.verifyCheckoutCompletePage();
                    await expect(
                        page
                    ).toHaveTitle(
                        "Swag Labs"
                    );
                    await expect(
                        page
                    ).toHaveURL(
                        /checkout-complete/
                    );
                }
            );
            await test.step(
                "55-56. Back Home and verify Products page",
                async () => {
                    await checkoutPage.backHome();
                    await inventoryPage.verifyProductsPage();
                }
            );
            await test.step(
                "57. Logout performance_glitch_user",
                async () => {
                    await inventoryPage.logout();
                }
            );
            await test.step(
                "58. Verify Login page URL and title",
                async () => {
                    await expect(
                        page
                    ).toHaveURL(
                        /\/$/
                    );
                    await expect(
                        page
                    ).toHaveTitle(
                        "Swag Labs"
                    );
                    await loginPage.verifyLoginPage();
                }
            );
        }
    );
});