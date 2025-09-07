import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    public readonly headingWelcome: Locator;
    public readonly headingSignIn: Locator;
    public readonly inputUsername: Locator;
    public readonly inputPassword: Locator;
    public readonly buttonContinue: Locator;
    
    constructor(public readonly page: Page) {
        this.headingWelcome = page.getByRole('heading', { name: 'Welcome to your admin dashboard!' });
        this.headingSignIn = page.getByRole('heading', { name: 'Sign in to Tripinas' });
        this.inputUsername = page.getByRole('textbox', { name: 'Email address or username' });
        this.inputPassword = page.getByRole('textbox', { name: 'Password' });
        this.buttonContinue = page.getByRole('button', { name: 'Continue' });
    }

    async navigateTo(): Promise<void> {
        await this.page.goto('http://localhost:5173/');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async login(identifier: string, password: string): Promise<void> {
        await this.inputUsername.fill(identifier);
        await this.inputPassword.fill(password);
        await this.buttonContinue.click();
    }
}