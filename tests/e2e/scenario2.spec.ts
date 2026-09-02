import { test, expect } from "../../fixtures/fixture";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";

test.describe("Scenario 2", () => {
    test(
        "Standard user validates application flow and performance_glitch_user completes checkout",
        async ({ page, loginPage }) => {
            const inventoryPage = new InventoryPage(page);
            const cartPage = new CartPage(page);
            const checkoutPage = new CheckoutPage(page);

            const password = "secret_sauce";

            const product1 = "Sauce Labs Backpack";
            const product2 = "Sauce Labs Bike Light";

            // ============================================================
            // STANDARD USER FLOW
            // ============================================================

            // 1. Login as a Standard user
            await test.step(
                "1. Login as Standard user",
                async () => {
                    await loginPage.login(
                        "standard_user",
                        password
                    );
                }
            );

            // 2. User is on Products/Home page
            await test.step(
                "2. Verify Products/Home page",
                async () => {
                    await inventoryPage.verifyProductsPage();
                }
            );

            // 3. Click on a specific product
            await test.step(
                "3. Open specific product",
                async () => {
                    await inventoryPage.openProduct(product1);
                }
            );

            // 4. Click Add to Cart on product details page
            await test.step(
                "4. Add product from details page",
                async () => {
                    await inventoryPage.addProductFromDetails(product1);
                }
            );

            // 5. Verify Add to Cart changed to Remove
            await test.step(
                "5. Verify button changed to Remove",
                async () => {
                    await inventoryPage.verifyRemoveButtonFromDetails(
                        product1
                    );
                }
            );

            // 6. Verify cart count is 1
            await test.step(
                "6. Verify shopping cart count is 1",
                async () => {
                    await inventoryPage.verifyCartCount("1");
                }
            );

            // 7. Click Back to Products
            await test.step(
                "7. Back to Products",
                async () => {
                    await inventoryPage.backToProducts();
                    await inventoryPage.verifyProductsPage();
                }
            );

            // 8-9. Open Shopping Cart and verify Your Cart page
            await test.step(
                "8-9. Open and verify Your Cart",
                async () => {
                    await inventoryPage.openCart();
                    await cartPage.verifyCartPage();

                    await cartPage.verifyProduct(product1);
                }
            );

            // 10-11. Continue Shopping
            await test.step(
                "10-11. Continue Shopping",
                async () => {
                    await cartPage.continueShopping();

                    await inventoryPage.verifyProductsPage();
                }
            );

            // 12. Verify product is still selected
            // Then remove it from Products page
            await test.step(
                "12. Verify selected product and remove it",
                async () => {
                    await inventoryPage.verifyRemoveButton(product1);
                    await inventoryPage.verifyCartCount("1");

                    await inventoryPage.removeProduct(product1);
                }
            );

            // 13. Verify cart is empty and button changed to Add to Cart
            await test.step(
                "13. Verify cart is empty and Add to Cart button is displayed",
                async () => {
                    await inventoryPage.verifyCartIsEmpty();

                    await inventoryPage.verifyAddToCartButton(
                        product1
                    );
                }
            );

            // 14. Sort products Z-A and verify sorting
            await test.step(
                "14. Sort products Z-A and verify",
                async () => {
                    await inventoryPage.sortProducts("za");

                    await inventoryPage.verifySelectedSortOption("za");

                    await inventoryPage.verifyProductsSortedZA();
                }
            );

            // 15. Add two products and verify cart count
            await test.step(
                "15. Add two products",
                async () => {
                    await inventoryPage.addProduct(product1);
                    await inventoryPage.addProduct(product2);

                    await inventoryPage.verifyCartCount("2");
                }
            );

            // 16-17. Open cart and verify two products
            await test.step(
                "16-17. Open cart and verify products",
                async () => {
                    await inventoryPage.openCart();

                    await cartPage.verifyCartPage();

                    await cartPage.verifyCartItemCount(2);

                    await cartPage.verifyProduct(product1);
                    await cartPage.verifyProduct(product2);

                    await cartPage.verifyProductQuantityAndDescription(
                        product1
                    );

                    await cartPage.verifyProductQuantityAndDescription(
                        product2
                    );
                }
            );

            // 18-19. Remove both products and verify empty cart
            await test.step(
                "18-19. Remove both products and verify empty cart",
                async () => {
                    await cartPage.removeProduct(product1);
                    await cartPage.removeProduct(product2);

                    await cartPage.verifyCartIsEmpty();
                }
            );

            // 20-21. Continue Shopping and verify Products page
            await test.step(
                "20-21. Continue Shopping",
                async () => {
                    await cartPage.continueShopping();

                    await inventoryPage.verifyProductsPage();
                }
            );

            // 22. Add the same two products again
            await test.step(
                "22. Add two products again",
                async () => {
                    await inventoryPage.addProduct(product1);
                    await inventoryPage.addProduct(product2);

                    await inventoryPage.verifyCartCount("2");
                }
            );

            // 23. Open cart and verify two selected products
            await test.step(
                "23. Open cart and verify selected products",
                async () => {
                    await inventoryPage.openCart();

                    await cartPage.verifyCartPage();

                    await cartPage.verifyCartItemCount(2);

                    await cartPage.verifyProduct(product1);
                    await cartPage.verifyProduct(product2);

                    await cartPage.verifyProductQuantityAndDescription(
                        product1
                    );

                    await cartPage.verifyProductQuantityAndDescription(
                        product2
                    );
                }
            );

            // 24-25. Click Checkout
            await test.step(
                "24-25. Open Checkout Information page",
                async () => {
                    await cartPage.clickCheckout();

                    await checkoutPage.verifyCheckoutInformationPage();
                }
            );

            // 26-27. Cancel Checkout and return to Cart
            await test.step(
                "26-27. Cancel checkout and return to Cart",
                async () => {
                    await checkoutPage.cancelCheckout();

                    await cartPage.verifyCartPage();

                    await cartPage.verifyCartItemCount(2);
                }
            );

            // 28-29. Click Checkout again
            await test.step(
                "28-29. Checkout again",
                async () => {
                    await cartPage.clickCheckout();

                    await checkoutPage.verifyCheckoutInformationPage();
                }
            );

            // 30-31. Continue without information and verify First Name error
            await test.step(
                "30-31. Verify First Name required error",
                async () => {
                    await checkoutPage.continueCheckout();

                    await checkoutPage.verifyErrorMessage(
                        "Error: First Name is required"
                    );
                }
            );

            // 32-33. Enter First Name and verify Last Name error
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

            // 34-35. Enter First Name + Last Name and verify Postal Code error
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

            // 36. Fill all checkout information
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

            // 37-38. Continue and verify Overview page
            await test.step(
                "37-38. Continue and verify Checkout Overview",
                async () => {
                    await checkoutPage.continueCheckout();

                    await checkoutPage.verifyCheckoutOverviewPage();
                }
            );

            // 39-40. Cancel Overview and return to Products page
            await test.step(
                "39-40. Cancel Overview and verify Products page",
                async () => {
                    await checkoutPage.cancelCheckout();

                    await inventoryPage.verifyProductsPage();

                    await inventoryPage.verifyCartCount("2");
                }
            );

            // 41-42. Logout Standard user
            await test.step(
                "41-42. Logout Standard user",
                async () => {
                    await inventoryPage.logout();

                    await loginPage.verifyLoginPage();
                }
            );

            // ============================================================
            // PERFORMANCE GLITCH USER FLOW
            // ============================================================

            // 43. Login as performance_glitch_user
            await test.step(
                "43. Login as performance_glitch_user",
                async () => {
                    await loginPage.login(
                        "performance_glitch_user",
                        password
                    );
                }
            );

            // 44. Verify Products/Home page
            await test.step(
                "44. Verify Products/Home page",
                async () => {
                    await inventoryPage.verifyProductsPage();
                }
            );

            // 45. Verify cart contains 2 products selected earlier
            await test.step(
                "45. Verify cart contains two selected products",
                async () => {
                    await inventoryPage.verifyCartCount("2");
                }
            );

            // 46-47. Open cart and click Checkout
            await test.step(
                "46-47. Open cart and checkout",
                async () => {
                    await inventoryPage.openCart();

                    await cartPage.verifyCartPage();

                    await cartPage.verifyCartItemCount(2);

                    await cartPage.verifyProduct(product1);
                    await cartPage.verifyProduct(product2);

                    await cartPage.verifyProductQuantityAndDescription(
                        product1
                    );

                    await cartPage.verifyProductQuantityAndDescription(
                        product2
                    );

                    await cartPage.clickCheckout();
                }
            );

            // 48. Verify Checkout Information page
            await test.step(
                "48. Verify Checkout Information page",
                async () => {
                    await checkoutPage.verifyCheckoutInformationPage();
                }
            );

            // 49. Fill First Name, Last Name and Postal Code
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

            // 50-51. Continue and verify Overview page
            await test.step(
                "50-51. Continue and verify Checkout Overview",
                async () => {
                    await checkoutPage.continueCheckout();

                    await checkoutPage.verifyCheckoutOverviewPage();
                }
            );

            // 52. Finish checkout
            await test.step(
                "52. Finish checkout",
                async () => {
                    await checkoutPage.finishCheckout();
                }
            );

            // 53-54. Verify Checkout Complete page, URL and title
            await test.step(
                "53-54. Verify Checkout Complete page",
                async () => {
                    await checkoutPage.verifyCheckoutCompletePage();

                    await expect(page).toHaveTitle("Swag Labs");

                    await expect(page).toHaveURL(
                        /checkout-complete/
                    );
                }
            );

            // 55-56. Back Home and verify Products page
            await test.step(
                "55-56. Back Home and verify Products page",
                async () => {
                    await checkoutPage.backHome();

                    await inventoryPage.verifyProductsPage();
                }
            );

            // 57. Logout performance_glitch_user
            await test.step(
                "57. Logout performance_glitch_user",
                async () => {
                    await inventoryPage.logout();
                }
            );

            // 58. Verify Login page URL and title
            await test.step(
                "58. Verify Login page URL and title",
                async () => {
                    await expect(page).toHaveURL(/\/$/);

                    await expect(page).toHaveTitle("Swag Labs");

                    await loginPage.verifyLoginPage();
                }
            );
        }
    );
});