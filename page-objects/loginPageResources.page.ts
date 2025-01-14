import { Page } from '@playwright/test';

export class LoginResourcesPage {
    constructor(private page: Page) {}

    public loginInput = this.page.locator('#outlined-adornment-email-login');
    public passwordInput = this.page.locator('#outlined-adornment-password-login');
    public loginButton = this.page.getByRole('button', {name: 'SIGN IN'});

    async navigate() {
        await this.page.goto('https://automatedtests.stg.monument.io/login');
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async fillLoginInput(text: string) {
        await this.loginInput.fill(text);
    }

    async fillPasswordInput(text: string) {
        await this.passwordInput.fill(text);
    }

}