import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { AllureHelper } from "../utils/AllureHelper";
export class CartPage extends BasePage {
    // ==========================================
    // Locators
    // ==========================================
    private readonly cartLink: Locator;
    private readonly cartTitle: Locator;
    private readonly cartBadge: Locator;
    private readonly cartItems: Locator;
    private readonly checkoutButton: Locator;
    private readonly continueShoppingButton: Locator;
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.cartLink = page.getByRole("link", {
            name: /shopping cart/i
        });
        this.cartTitle = page.locator(".title");
        this.cartBadge = page.locator(".shopping_cart_badge");
        this.cartItems = page.locator(".cart_item");
        this.checkoutButton = page.getByRole("button", {
            name: "Checkout"
        });
        this.continueShoppingButton = page.getByRole("button", {
            name: "Continue Shopping"
        });
    }
    // ==========================================
    // Public Locators
    // ==========================================
    get title(): Locator {
        return this.cartTitle;
    }
    get badge(): Locator {
        return this.cartBadge;
    }
    get items(): Locator {
        return this.cartItems;
    }
    get checkoutBtn(): Locator {
        return this.checkoutButton;
    }
    get continueShoppingBtn(): Locator {
        return this.continueShoppingButton;
    }
    // ==========================================
    // Dynamic Locators
    // ==========================================
    private getCartProduct(
        productName: string
    ): Locator {
        return this.cartItems.filter({
            hasText: productName
        });
    }
    /**
     * Returns a specific product from the cart.
     * Assertions should be performed in the test.
     */
    getProduct(
        productName: string
    ): Locator {
        return this.getCartProduct(productName);
    }
    private getRemoveButton(
        productName: string
    ): Locator {
        return this.getCartProduct(productName).getByRole(
            "button",
            {
                name: /remove/i
            }
        );
    }
    // ==========================================
    // Actions
    // ==========================================
    /**
     * Opens the shopping cart.
     */
    async openCart(): Promise<void> {
        await AllureHelper.step(
            "Open Shopping Cart",
            async () => {
                await this.click(this.cartLink);
            }
        );
    }
    /**
     * Removes a product from the cart.
     */
    async removeProduct(
        productName: string
    ): Promise<void> {
        await AllureHelper.step(
            `Remove Product: ${productName}`,
            async () => {
                await this.click(
                    this.getRemoveButton(productName)
                );
            }
        );
    }
    /**
     * Clicks the Checkout button.
     */
    async clickCheckout(): Promise<void> {
        await AllureHelper.step(
            "Click Checkout",
            async () => {
                await this.click(this.checkoutButton);
            }
        );
    }
    /**
     * Clicks Continue Shopping.
     */
    async continueShopping(): Promise<void> {
        await AllureHelper.step(
            "Continue Shopping",
            async () => {
                await this.click(
                    this.continueShoppingButton
                );
            }
        );
    }
}