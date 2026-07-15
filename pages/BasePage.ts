import { expect, Locator, Page } from '@playwright/test';
export class BasePage {
    protected page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    // ==========================================
    // Navigation
    // ==========================================
    async navigate(url: string) {
        await this.page.goto(url, {
            waitUntil: 'domcontentloaded'
        });
    }
    async refreshPage() {
        await this.page.reload();
    }
    async goBack() {
        await this.page.goBack();
    }
    async goForward() {
        await this.page.goForward();
    }
    // ==========================================
    // Click Actions
    // ==========================================
    async click(locator: Locator) {
        await locator.waitFor({ state: 'visible' });
        await locator.click();
    }
    async doubleClick(locator: Locator) {
        await locator.waitFor({ state: 'visible' });
        await locator.dblclick();
    }
    async rightClick(locator: Locator) {
        await locator.waitFor({ state: 'visible' });
        await locator.click({ button: 'right' });
    }
    async hover(locator: Locator) {
        await locator.waitFor({ state: 'visible' });
        await locator.hover();
    }
    async jsClick(locator: Locator) {
        await locator.waitFor({ state: 'visible' });
        await locator.evaluate((element: HTMLElement) => element.click());
    }
    // ==========================================
    // Text Input
    // ==========================================
    async fill(locator: Locator, value: string) {
        await locator.waitFor({ state: 'visible' });
        await locator.fill(value);
    }
    async clear(locator: Locator) {
        await locator.waitFor({ state: 'visible' });
        await locator.clear();
    }
    async type(locator: Locator, value: string) {
        await locator.waitFor({ state: 'visible' });
        await locator.pressSequentially(value);
    }
    // ==========================================
    // Dropdown
    // ==========================================
    async selectByValue(locator: Locator, value: string) {
        await locator.waitFor({ state: 'visible' });
        await locator.selectOption(value);
    }
    async selectByLabel(locator: Locator, label: string) {
        await locator.waitFor({ state: 'visible' });
        await locator.selectOption({ label });
    }
    async selectByIndex(locator: Locator, index: number) {
        await locator.waitFor({ state: 'visible' });
        await locator.selectOption({ index });
    }
    // ==========================================
    // Checkbox
    // ==========================================
    async check(locator: Locator) {
        await locator.waitFor({ state: 'visible' });
        await locator.check();
    }
    async uncheck(locator: Locator) {
        await locator.waitFor({ state: 'visible' });
        await locator.uncheck();
    }
    // ==========================================
    // Mouse Actions
    // ==========================================
    async dragAndDrop(source: Locator, target: Locator) {
        await source.dragTo(target);
    }
    async scrollIntoView(locator: Locator) {
        await locator.scrollIntoViewIfNeeded();
    }
    // ==========================================
    // File Upload
    // ==========================================
    async uploadFile(locator: Locator, filePath: string) {
        await locator.setInputFiles(filePath);
    }
    // ==========================================
    // Get Values
    // ==========================================
    async getText(locator: Locator): Promise<string> {
        return (await locator.textContent()) ?? '';
    }
    async getInputValue(locator: Locator): Promise<string> {
        return await locator.inputValue();
    }
    async isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }
    async isChecked(locator: Locator): Promise<boolean> {
        return await locator.isChecked();
    }
    // ==========================================
    // Waits
    // ==========================================
    async waitForVisible(locator: Locator) {
        await locator.waitFor({ state: 'visible' });
    }
    async waitForHidden(locator: Locator) {
        await locator.waitFor({ state: 'hidden' });
    }
    async waitForEnabled(locator: Locator) {
        await expect(locator).toBeEnabled();
    }
    async waitForDisabled(locator: Locator) {
        await expect(locator).toBeDisabled();
    }
    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }
    // ==========================================
    // Assertions
    // ==========================================
    async verifyVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }
    async verifyHidden(locator: Locator) {
        await expect(locator).toBeHidden();
    }
    async verifyText(locator: Locator, expectedText: string) {
        await expect(locator).toHaveText(expectedText);
    }
    async verifyContainsText(locator: Locator, expectedText: string) {
        await expect(locator).toContainText(expectedText);
    }
    async verifyTitle(expectedTitle: string) {
        await expect(this.page).toHaveTitle(expectedTitle);
    }
    async verifyUrl(expectedUrl: string) {
        await expect(this.page).toHaveURL(expectedUrl);
    }
    // ==========================================
    // Screenshot
    // ==========================================
    async takeScreenshot(fileName: string) {
        await this.page.screenshot({
            path: `reports/screenshots/${fileName}.png`,
            fullPage: true
        });
    }
    // ==========================================
    // Browser
    // ==========================================
    async closePage() {
        await this.page.close();
    }
}