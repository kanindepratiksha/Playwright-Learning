import { Page, Locator, expect } from "@playwright/test";
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
    async navigate() {
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
    async login() {
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
    async verifyLogin() {
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
    async logout() {
        await AllureHelper.step(
            "Logout from Application",
            async () => {
                await this.click(this.menuButton);
                await expect(this.sideMenu).toBeVisible({
                    timeout: 10_000
                });
                await expect(this.logoutButton).toBeVisible({
                    timeout: 10_000
                });
                await this.logoutButton.scrollIntoViewIfNeeded();
                await this.click(this.logoutButton);
            }
        );
    }
    // ==========================================
    // Verify Logout
    // ==========================================
    async verifyLogout() {
        await AllureHelper.step(
            "Verify Logout",
            async () => {
                await this.verifyUrl(config.sauceDemoUrl);
                await this.verifyVisible(this.username);
            }
        );
    }
}