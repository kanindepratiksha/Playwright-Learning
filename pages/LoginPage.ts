import { Page } from '@playwright/test';

export class LoginPage {

    constructor(private page: Page) {}

    username = this.page.getByPlaceholder('Username');
    password = this.page.getByPlaceholder('Password');
    loginBtn = this.page.getByRole('button', { name: 'Login' });

    async login(user: string, pass: string) {
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginBtn.click();
    }
}