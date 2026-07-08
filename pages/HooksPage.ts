import { Page, Locator } from '@playwright/test';
import { config } from '../config/env';
import user from '../testdata/users.json';
import { BasePage } from './BasePage';
export class HooksPage extends BasePage {
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;
    private readonly menuButton: Locator;
    private readonly logoutButton: Locator;
    constructor(page: Page) {
        super(page);
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutButton = page.getByText('Logout');
    }
    async navigate() {
        await super.navigate(config.sauceDemoUrl);
    }
    async login() {
        await this.fill(this.username, user.username);
        await this.fill(this.password, user.password);
        await this.click(this.loginButton);
    }
    async verifyLogin() {
        await this.verifyText(
            this.page.locator('.title'),
            'Products'
        );
    }
    async logout() {
        await this.click(this.menuButton);
        await this.click(this.logoutButton);
    }
    async verifyLogout() {
        await this.verifyUrl(config.sauceDemoUrl);
    }
}