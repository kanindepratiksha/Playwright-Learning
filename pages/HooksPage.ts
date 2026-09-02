import { Page, Locator } from "@playwright/test";
import { config } from "../config/env";
import users from "../testdata/users.json";
import { testData } from "../utils/appConstants";
import { BasePage } from "./BasePage";
import { AllureHelper } from "../utils/AllureHelper";
export class HooksPage extends BasePage {
    // ==========================================
    // Locators
    // ==========================================
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;
    private readonly menuButton: Locator;
    private readonly sideMenu: Locator;
    private readonly logoutButton: Locator;
    private readonly productTitle: Locator;
    // ==========================================
    // Constructor
    // ==========================================
    constructor(page: Page) {
        super(page);
        this.username = page.getByPlaceholder("Username");
        this.password = page.getByPlaceholder("Password");
        this.loginButton = page.getByRole("button", {
            name: testData.loginButton
        });
        this.menuButton = page.locator("#react-burger-menu-btn");
        this.sideMenu = page.locator(".bm-menu-wrap");
        this.logoutButton = page.locator("#logout_sidebar_link");
        this.productTitle = page.locator(".title");
    }
    // ==========================================
    // Navigate
    // ==========================================
    async navigate(): Promise<void> {
        await AllureHelper.step(
            "Navigate to SauceDemo",
            async () => {
                await super.navigate(config.sauceDemoUrl);
            }
        );
    }
    // ==========================================
    // Login
    // ==========================================
    async login(): Promise<void> {
        await AllureHelper.step(
            "Login with Valid User",
            async () => {
                await this.fill(
                    this.username,
                    users[0].username
                );
                await this.fill(
                    this.password,
                    users[0].password
                );
                await this.click(this.loginButton);
            }
        );
    }
    // ==========================================
    // Verify Login
    // ==========================================
    async verifyLogin(): Promise<void> {
        await AllureHelper.step(
            "Verify Login",
            async () => {
                await this.verifyText(
                    this.productTitle,
                    testData.productPageTitle
                );
            }
        );
    }
    // ==========================================
    // Logout
    // ==========================================
    async logout(): Promise<void> {
        await AllureHelper.step(
            "Logout from Application",
            async () => {
                // Open hamburger menu
                await this.click(this.menuButton);
                // Wait for side menu to become visible
                await this.sideMenu.waitFor({
                    state: "visible",
                    timeout: 15_000
                });
                // Wait for logout option
                await this.logoutButton.waitFor({
                    state: "visible",
                    timeout: 15_000
                });
                // Click logout
                await this.click(this.logoutButton);
            }
        );
    }
    // ==========================================
    // Verify Logout
    // ==========================================
    async verifyLogout(): Promise<void> {
        await AllureHelper.step(
            "Verify Logout",
            async () => {
                await this.verifyUrl(config.sauceDemoUrl);
                await this.verifyVisible(
                    this.username
                );
            }
        );
    }
}