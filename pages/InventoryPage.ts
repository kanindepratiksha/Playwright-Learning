import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Logger } from "../utils/Logger";
import { WaitUtil } from "../utils/WaitUtil";
import { AssertUtil } from "../utils/AssertUtil";
import { AllureHelper } from "../utils/AllureHelper";
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
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.pageTitle =
            page.locator(".title");
        this.inventoryList =
            page.locator(".inventory_list");
        this.inventoryItems =
            page.locator(".inventory_item");
        this.firstInventoryItem =
            this.inventoryItems.first();
        this.cartBadge =
            page.locator(".shopping_cart_badge");
        this.sortDropdown =
            page.locator(
                '[data-test="product-sort-container"]'
            );
        this.firstProduct =
            page.locator(
                ".inventory_item_name"
            ).first();
        this.firstPrice =
            page.locator(
                ".inventory_item_price"
            ).first();
        this.cartLink =
            page.locator(
                ".shopping_cart_link"
            );
    }
    // ==========================================
    // Dynamic Locator - Product
    // ==========================================
    private getProduct(
        productName: string
    ): Locator {
        return this.inventoryItems.filter({
            hasText: productName
        });
    }
    // ==========================================
    // Dynamic Locator - Product Text
    // ==========================================
    private getProductText(
        productName: string
    ): Locator {
        return this.page.getByText(
            productName,
            { exact: true }
        );
    }
    // ==========================================
    // Actions
    // ==========================================
    async addProduct(
        productName: string
    ) {
        await AllureHelper.step(
            `Add Product : ${productName}`,
            async () => {
                await this.getProduct(
                    productName
                )
                    .getByRole("button", {
                        name: "Add to cart"
                    })
                    .click();
            }
        );
    }
    async openCart() {
        await AllureHelper.step(
            "Open Shopping Cart",
            async () => {
                await this.click(
                    this.cartLink
                );
            }
        );
    }
    async hoverFirstProduct() {
        await AllureHelper.step(
            "Hover Over First Product",
            async () => {
                await this.firstInventoryItem.hover();
            }
        );
    }
    async sortProducts(
        option: string
    ) {
        await AllureHelper.step(
            `Sort Products : ${option.toUpperCase()}`,
            async () => {
                await this.sortDropdown.selectOption(
                    option
                );
            }
        );
    }
    // ==========================================
    // Compatibility Methods
    // ==========================================
    async verifyProductsPage() {
        await AllureHelper.step(
            "Verify Products Page",
            async () => {
                await this.verifyPageTitle();
                await this.verifyInventoryList();
            }
        );
    }
    async verifySortOption(
        option: string
    ) {
        await this.verifySelectedSortOption(
            option
        );
    }
    async verifyCartCount(
        count: string
    ) {
        await AllureHelper.step(
            `Verify Cart Count : ${count}`,
            async () => {
                await this.verifyCartBadgeCount(
                    count
                );
            }
        );
    }
    async loginWithKeyboard() {
        await AllureHelper.step(
            "Login Using Keyboard",
            async () => {
                // Kept for backward compatibility.
            }
        );
    }
    async goBack() {
        await AllureHelper.step(
            "Navigate Back",
            async () => {
                await this.page.goBack();
            }
        );
    }
    async reloadPage() {
        await AllureHelper.step(
            "Reload Page",
            async () => {
                await this.page.reload();
            }
        );
    }
    // ==========================================
    // Verifications
    // ==========================================
    async verifyPageTitle() {
        await this.verifyVisible(
            this.pageTitle
        );
    }
    async verifyInventoryList() {
        await this.verifyVisible(
            this.inventoryList
        );
    }
    async verifyProductVisible(
        productName: string
    ) {
        await AllureHelper.step(
            `Verify Product : ${productName}`,
            async () => {
                Logger.info(
                    `Verifying product: ${productName}`
                );
                const product =
                    this.getProductText(
                        productName
                    );
                await WaitUtil.waitForVisible(
                    product
                );
                await AssertUtil.visible(
                    product
                );
                Logger.info(
                    `${productName} is visible`
                );
            }
        );
    }
    async verifyFirstInventoryItemVisible() {
        await this.verifyVisible(
            this.firstInventoryItem
        );
    }
    async verifyLastInventoryItemVisible() {
        await this.verifyVisible(
            this.inventoryItems.last()
        );
    }
    async verifyInventoryItemVisible(
        index: number
    ) {
        await this.verifyVisible(
            this.inventoryItems.nth(index)
        );
    }
    async verifyCartBadgeCount(
        count: string
    ) {
        await this.verifyText(
            this.cartBadge,
            count
        );
    }
    async verifySelectedSortOption(
        option: string
    ) {
        await expect(
            this.sortDropdown
        ).toHaveValue(option);
    }
    async verifyFirstProduct(
        productName: string
    ) {
        await this.verifyText(
            this.firstProduct,
            productName
        );
    }
    async verifyFirstPrice(
        price: string
    ) {
        await this.verifyText(
            this.firstPrice,
            price
        );
    }
    // ======================================================
    // Scenario 2 - Product Details
    // ======================================================
    async openProduct(
        productName: string
    ) {
        await AllureHelper.step(
            `Open Product: ${productName}`,
            async () => {
                await this.getProductText(
                    productName
                ).click();
                await expect(
                    this.page
                ).toHaveURL(
                    /inventory-item/
                );
            }
        );
    }
    async addProductFromDetails(
        productName: string
    ) {
        await AllureHelper.step(
            `Add Product From Details: ${productName}`,
            async () => {
                await this.page
                    .getByRole("button", {
                        name: "Add to cart"
                    })
                    .click();
            }
        );
    }
    async verifyRemoveButtonFromDetails(
        productName: string
    ) {
        await AllureHelper.step(
            `Verify Remove Button: ${productName}`,
            async () => {
                await expect(
                    this.page.getByRole(
                        "button",
                        {
                            name: "Remove"
                        }
                    )
                ).toBeVisible();
            }
        );
    }
    // ======================================================
    // Scenario 2 - Product Remove
    // ======================================================
    async removeProduct(
        productName: string
    ) {
        await AllureHelper.step(
            `Remove Product: ${productName}`,
            async () => {
                await this.getProduct(
                    productName
                )
                    .getByRole("button", {
                        name: "Remove"
                    })
                    .click();
            }
        );
    }
    async verifyAddToCartButton(
        productName: string
    ) {
        await AllureHelper.step(
            `Verify Add to Cart Button: ${productName}`,
            async () => {
                await expect(
                    this.getProduct(
                        productName
                    ).getByRole(
                        "button",
                        {
                            name: "Add to cart"
                        }
                    )
                ).toBeVisible();
            }
        );
    }
    // ======================================================
    // Scenario 2 - Sorting
    // ======================================================
    async verifyProductsSortedZA() {
        await AllureHelper.step(
            "Verify Products Sorted Z-A",
            async () => {
                const actualNames =
                    (
                        await this.page
                            .locator(
                                ".inventory_item_name"
                            )
                            .allTextContents()
                    ).map(
                        name => name.trim()
                    );
                const expectedNames =
                    [...actualNames].sort(
                        (a, b) =>
                            b.localeCompare(a)
                    );
                expect(
                    actualNames
                ).toEqual(
                    expectedNames
                );
            }
        );
    }
    // ======================================================
    // Scenario 2 - Cart Empty
    // ======================================================
    async verifyCartIsEmpty() {
        await AllureHelper.step(
            "Verify Cart Is Empty",
            async () => {
                await expect(
                    this.cartBadge
                ).toHaveCount(0);
            }
        );
    }
    // ======================================================
    // Scenario 2 - Logout
    // ======================================================
    async logout() {
        await AllureHelper.step(
            "Logout",
            async () => {
                await this.page
                    .locator(
                        "#react-burger-menu-btn"
                    )
                    .click();
                await this.page
                    .locator(
                        "#logout_sidebar_link"
                    )
                    .click();
                await expect(
                    this.page
                ).toHaveURL(
                    /\/$/
                );
            }
        );
    }
}