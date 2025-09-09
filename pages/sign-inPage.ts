import { expect, Locator, Page } from '@playwright/test';

export class signInPage {
    public readonly headingSignIn: Locator;
    public readonly headingWelcome: Locator;
    public readonly inputUsername: Locator;
    public readonly inputPassword: Locator;
    public readonly buttonContinue: Locator;
    public readonly linkSignUp: Locator;
    public readonly linkForgotPassword: Locator;
    public readonly buttonResetPassword: Locator;
    
    constructor(public readonly page: Page) {
        this.headingWelcome = page.getByRole('heading', { name: 'Welcome to your admin dashboard!' });
        this.headingSignIn = page.getByRole('heading', { name: 'Sign in to Tripinas' });
        this.inputUsername = page.getByRole('textbox', { name: 'Email address or username' });
        this.inputPassword = page.getByRole('textbox', { name: 'Password' });
        this.buttonContinue = page.getByRole('button', { name: 'Continue' });
        this.linkSignUp = page.getByRole('link', { name: 'Sign up' });
        this.linkForgotPassword = page.getByRole('link', { name: 'Forgot password?' });
        this.buttonResetPassword = page.getByRole('button', { name: 'Reset your password' });
    }

    async navigateTo(): Promise<void> {
        await this.page.goto('http://localhost:5173/sign-in');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async goToSignUp(): Promise<void> {
        await this.linkSignUp.click();
        await this.page.waitForURL('http://localhost:5173/sign-up');
    }

    async signIn(identifier: string, password: string): Promise<void> {
        await this.inputUsername.fill(identifier);
        await this.buttonContinue.click();
        await this.inputPassword.fill(password);
        await this.buttonContinue.click();
    }

    async requestNewPassword(identifier: string): Promise<void> {
        await this.inputUsername.fill(identifier);
        await this.buttonContinue.click();
        await this.linkForgotPassword.click();
        await this.buttonResetPassword.click();
        //Can't go any further as Verification Code is outside the scope.
    }
}