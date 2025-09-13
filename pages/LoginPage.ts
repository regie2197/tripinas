import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {
    public readonly page: Page;
    public readonly usernameInput: Locator;
    public readonly emailInput: Locator;
    public readonly passwordInput: Locator;
    public readonly continueButton: Locator;
    public readonly showPasswordButton: Locator;
    public readonly forgotPasswordLink: Locator;
    public readonly resetPasswordButton: Locator;
    public readonly resendCodeButton: Locator;
    public readonly verificationCodeInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Email address or username' });
        this.emailInput = page.getByRole('textbox', { name: 'Email address' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.showPasswordButton = page.getByRole('button', { name: 'Show password' });
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
        this.resetPasswordButton = page.getByRole('button', { name: 'Reset your password' });
        this.resendCodeButton = page.getByRole('button', { name: 'Resend code' });
        this.verificationCodeInput = page.getByRole('textbox', { name: 'Enter verification code' });
    }

    async goto(): Promise<void> {
        await this.page.goto(process.env.TRIPINAS_BASE_URL + 'sign-in');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async isSignInHeadingVisible(): Promise<void> {
        await this.page.getByRole('heading', { name: 'Sign in to Tripinas' }).isVisible();
    }

    async loginUsernameCredential(username: string, password: string): Promise<void> {
        await expect(this.usernameInput).toBeVisible();
        await this.usernameInput.fill(username);
        await this.continueButton.click();
        await this.passwordInput.fill(password);
        await this.showPasswordButton.click();
    }

    async clickLoginContinueButton(): Promise<void> {
        await this.continueButton.click();
    }

    async loginEmailCredential(email: string, password: string): Promise<void> {
        await expect(this.emailInput).toBeVisible();
        await this.emailInput.fill(email);
        await this.continueButton.click();
        await this.passwordInput.fill(password);
        await this.showPasswordButton.click();
    }

    async verifyLoginSuccess() {
        await expect(this.page.getByTestId('user-fullname')).toBeVisible();
        await expect(this.page.getByTestId('user-username')).toBeVisible();
        await expect(this.page.getByTestId('user-email')).toBeVisible();
    }

    /*
    *Perform login with the provided username and incorrect password
    * @param wrongPassword - The incorrect password to be used for login
    */
    async loginWithWrongPassword(username: string, wrongPassword: string): Promise<void> {
        await expect(this.usernameInput).toBeVisible();
        await this.usernameInput.fill(username);
        await this.continueButton.click();
        await this.passwordInput.fill(wrongPassword);
        await this.showPasswordButton.click();
    }

    async requestPasswordReset(): Promise<void> {
        await expect(this.page.getByRole('link', { name: 'Forgot password?' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Forgot password?' }).click();
        await expect(this.resetPasswordButton).toBeVisible();
        await this.resetPasswordButton.click();
    }
    async assertPasswordResetPage(emailMasked: string): Promise<void> {
        await expect(this.page.getByText('First, enter the code sent to')).toBeVisible();
        await expect(this.page.getByText(emailMasked)).toBeVisible();
        await expect(this.verificationCodeInput).toBeVisible();
    }
    async submitVerificationCode(code: string): Promise<void> {
        await this.verificationCodeInput.click();
        await this.verificationCodeInput.fill(code);
        await this.continueButton.click();
    }

    async inputNewCode(code: string): Promise<void> {
        await this.verificationCodeInput.fill(code);
        await this.continueButton.click();
    }
}



