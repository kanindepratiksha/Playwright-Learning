import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { AllureHelper } from "../utils/AllureHelper";
type SortOption = "az" | "za" | "lohi" | "hilo";
export class InventoryPage extends BasePage {
    // ==========================================
    // Locators
    // ==========================================
    private readonly pageTitle: Locator;
    private readonly inventoryList: Locator;
    private readonly inventoryItems: Locator;
    private readonly firstInventoryItem: Locator;
    private readonly cartBadge: Locator;
    private readonly sortDropdown: Locator;
    private readonly firstProduct: Locator;
    private readonly firstPrice: Locator;
    private readonly cartLink: Locator;
    private readonly backToProductsButton: Locator;
    private readonly menuButton: Locator;
    private readonly logoutButton: Locator;
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.pageTitle = page.locator(".title");
        this.inventoryList = page.locator(
            ".inventory_list"
        );
        this.inventoryItems = page.locator(
            ".inventory_item"
        );
        this.firstInventoryItem =
            this.inventoryItems.first();
        this.cartBadge = page.locator(
            ".shopping_cart_badge"
        );
        this.sortDropdown = page.getByTestId(
            "product-sort-container"
        );
        this.firstProduct = page
            .locator(".inventory_item_name")
            .first();
        this.firstPrice = page
            .locator(".inventory_item_price")
            .first();
        this.cartLink = page.getByTestId(
            "shopping-cart-link"
        );
        this.backToProductsButton = page.getByRole(
            "button",
            {
                name: "Back to products"
            }
        );
        this.menuButton = page.getByRole(
            "button",
            {
                name: /open menu/i
            }
        );
        this.logoutButton = page.getByRole(
            "link",
            {
                name: "Logout"
            }
        );
    }
    // ==========================================
    // Public Locators
    // ==========================================
    get title(): Locator {
        return this.pageTitle;
    }
    get inventory(): Locator {
        return this.inventoryList;
    }
    get products(): Locator {
        return this.inventoryItems;
    }
    get firstProductLocator(): Locator {
        return this.firstProduct;
    }
    get firstPriceLocator(): Locator {
        return this.firstPrice;
    }
    get firstItem(): Locator {
        return this.firstInventoryItem;
    }
    get cartBadgeLocator(): Locator {
        return this.cartBadge;
    }
    get sortDropdownLocator(): Locator {
        return this.sortDropdown;
    }
    // ==========================================
    // Dynamic Product Locators
    // ==========================================
    getProduct(productName: string): Locator {
        return this.inventoryItems.filter({
            hasText: productName
        });
    }
    getProductText(productName: string): Locator {
        return this.page.getByText(
            productName,
            {
                exact: true
            }
        );
    }
    getAddToCartButton(
        productName: string
    ): Locator {
        return this.getProduct(
            productName
        ).getByRole(
            "button",
            {
                name: "Add to cart"
            }
        );
    }
    getRemoveButton(
        productName: string
    ): Locator {
        return this.getProduct(
            productName
        ).getByRole(
            "button",
            {
                name: "Remove"
            }
        );
    }
    // ==========================================
    // Product Actions
    // ==========================================
    async addProduct(
        productName: string
    ): Promise<void> {
        await AllureHelper.step(
            `Add Product: ${productName}`,
            async () => {
                await this.getAddToCartButton(
                    productName
                ).click();
            }
        );
    }
    async removeProduct(
        productName: string
    ): Promise<void> {
        await AllureHelper.step(
            `Remove Product: ${productName}`,
            async () => {
                await this.getRemoveButton(
                    productName
                ).click();
            }
        );
    }
    async openProduct(
        productName: string
    ): Promise<void> {
        await AllureHelper.step(
            `Open Product: ${productName}`,
            async () => {
                await this.getProductText(
                    productName
                ).click();
            }
        );
    }
    async addProductFromDetails(
        productName: string
    ): Promise<void> {
        await AllureHelper.step(
            `Add Product From Details: ${productName}`,
            async () => {
                await this.getProductDetailsAddButton()
                    .click();
            }
        );
    }
    // ==========================================
    // Cart Actions
    // ==========================================
    async openCart(): Promise<void> {
        await AllureHelper.step(
            "Open Shopping Cart",
            async () => {
                await this.click(
                    this.cartLink
                );
            }
        );
    }
    // ==========================================
    // Navigation Actions
    // ==========================================
    async backToProducts(): Promise<void> {
        await AllureHelper.step(
            "Back to Products",
            async () => {
                await this.click(
                    this.backToProductsButton
                );
            }
        );
    }
    async goBack(): Promise<void> {
        await AllureHelper.step(
            "Navigate Back",
            async () => {
                await this.page.goBack();
            }
        );
    }
    async reloadPage(): Promise<void> {
        await AllureHelper.step(
            "Reload Page",
            async () => {
                await this.page.reload();
            }
        );
    }
    // ==========================================
    // Product Interaction
    // ==========================================
    async hoverFirstProduct(): Promise<void> {
        await AllureHelper.step(
            "Hover Over First Product",
            async () => {
                await this.firstInventoryItem.hover();
            }
        );
    }
    async sortProducts(
        option: SortOption
    ): Promise<void> {
        await AllureHelper.step(
            `Sort Products: ${option.toUpperCase()}`,
            async () => {
                await this.sortDropdown.selectOption(
                    option
                );
            }
        );
    }
    // ==========================================
    // Logout
    // ==========================================
    async logout(): Promise<void> {
        await AllureHelper.step(
            "Logout",
            async () => {
                await this.menuButton.click();
                await this.logoutButton.click();
            }
        );
    }
    // ==========================================
    // Product Details Locators
    // ==========================================
    getProductDetailsName(): Locator {
        return this.page.locator(
            ".inventory_details_name"
        );
    }
    getProductDetailsAddButton(): Locator {
        return this.page.getByRole(
            "button",
            {
                name: "Add to cart"
            }
        );
    }
    getProductDetailsRemoveButton(): Locator {
        return this.page.getByRole(
            "button",
            {
                name: "Remove"
            }
        );
    }
    // ==========================================
    // Product Name Helpers
    // ==========================================
    getProductNames(): Locator {
        return this.page.locator(
            ".inventory_item_name"
        );
    }
    async getProductNamesInOrder(): Promise<string[]> {
        const names =
            await this.getProductNames()
                .allTextContents();
        return names.map(
            name => name.trim()
        );
    }
}