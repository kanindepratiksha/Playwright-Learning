import { Page, Locator, expect } from "@playwright/test";
import { config } from "../config/env";
import { testData } from "../utils/appConstants";

export class BrowserWindowsPage {
  // ==========================================
  // Page Object
  // ==========================================
  readonly page: Page;

  // ==========================================
  // Locators
  // ==========================================
  readonly newTabButton: Locator;
  readonly newWindowButton: Locator;

  // ==========================================
  // Constructor
  // ==========================================
  constructor(page: Page) {
    this.page = page;

    this.newTabButton = page.locator("#tabButton");

    this.newWindowButton = page.locator("#windowButton");
  }

  // ==========================================
  // Navigate
  // ==========================================
  async navigate() {
    await this.page.goto(config.browserWindowsUrl);
  }

  // ==========================================
  // Handle Multiple Tab
  // ==========================================
  async verifyNewTab() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),

      this.newTabButton.click(),
    ]);

    await newPage.waitForLoadState();

    await expect(newPage.locator("#sampleHeading")).toHaveText(
      testData.newTabHeading,
    );

    await newPage.close();
  }

  // ==========================================
  // Handle Popup Window
  // ==========================================
  async verifyNewWindow() {
    const [popup] = await Promise.all([
      this.page.context().waitForEvent("page"),

      this.newWindowButton.click(),
    ]);

    await popup.waitForLoadState();

    await expect(popup.locator("#sampleHeading")).toHaveText(
      testData.newTabHeading,
    );

    await popup.close();
  }
}
