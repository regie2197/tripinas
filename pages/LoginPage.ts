import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    // Locators
    public readonly loginHeader: Locator;
    public readonly emailOrUsernameInput: Locator;
    public readonly passwordInput: Locator;
    public readonly continueButton: Locator;
    public readonly dashboardText: Locator;
    public readonly profileUsername: Locator;
    public readonly profileFullName: Locator;
    public readonly profileEmail: Locator;
    public readonly errorMessageEmail: Locator;
    public readonly errorMessagePassword: Locator;
    public readonly signUpLink: Locator;
    public readonly forgotPasswordLink: Locator;
    public readonly getHelpLink: Locator;
    public readonly enterPassHeader: Locator;
    public readonly forgotPasswordHeader: Locator;
    public readonly resetPasswordButton: Locator;
    public readonly backLink: Locator;
    public readonly resetPasswordHeader: Locator;
    public readonly resendButton: Locator;
    public readonly codeInput: Locator;
    public readonly getHelpHeader: Locator;
    public readonly emailSuppButton: Locator;
    public readonly signedOutText: Locator;

    constructor(public readonly page: Page) {
        this.loginHeader = page.getByRole('heading', { name: 'Sign In to Tripinas' });
        this.emailOrUsernameInput = page.getByRole('textbox', { name: 'Email address or username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.dashboardText = page.getByText('Dashboard Home');
        this.profileUsername = page.getByTestId('user-username');
        this.profileFullName = page.getByTestId('user-fullname');
        this.profileEmail = page.getByTestId('user-email');
        this.errorMessageEmail = page.locator('#error-identifier');
        this.errorMessagePassword = page.locator('#error-password');
        this.signUpLink = page.getByRole('link', { name: 'Sign Up' });
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
        this.getHelpLink = page.getByRole('link', { name: 'Get Help' });
        this.enterPassHeader = page.getByRole('heading', { name: 'Enter your password' });
        this.forgotPasswordHeader = page.getByRole('heading', { name: 'Forgot Password?' });
        this.resetPasswordButton = page.getByRole('button', { name: 'Reset your password' });
        this.backLink = page.getByRole('link', { name: 'Back' });
        this.resetPasswordHeader = page.getByRole('heading', { name: 'Reset password' });
        this.resendButton = page.getByRole('button', { name: 'Didn\'t receive a code? Resend' });
        this.codeInput = page.getByRole('textbox', { name: 'Enter verification code' });
        this.getHelpHeader = page.getByRole('heading', { name: 'Get help' });
        this.emailSuppButton = page.getByRole('button', { name: 'Email support' });
        this.signedOutText = page.getByText('You are signed out.');
    }

    async navigateToLogin() {
        await this.page.goto('http://localhost:5173/sign-in');
        await this.page.waitForLoadState("domcontentloaded");
    }

    /**
     * @param emailOrUsername 
     * @param password 
     * @param expectedUsername
     * @param expectedFullName
     * @param passwordErrorMessage
     */

    async enterEmailOrUsername(emailOrUsername: string): Promise<void>  {
        await this.emailOrUsernameInput.fill(emailOrUsername);
        await this.continueButton.click();
    }

    async enterPassword(password: string): Promise<void>  {
        await this.passwordInput.fill(password);
        await this.continueButton.click();
    }

    async verifyDashboard(): Promise<void>  {
        await this.page.waitForURL('http://localhost:5173/dashboard');
        await expect(this.dashboardText).toBeVisible();
        await expect(this.dashboardText).toHaveText('Dashboard Home');
    }

    async verifyProfileDetails(expectedFullName: string, expectedUsername: string, expectedEmail: string): Promise<void>  {
        await expect(this.profileFullName).toContainText(expectedFullName);
        await expect(this.profileUsername).toContainText(expectedUsername);
        await expect(this.profileEmail).toContainText(expectedEmail);
    }

    async verifyEmailErrorMessage() {
        await expect(this.errorMessageEmail).toBeVisible();
        await expect(this.errorMessageEmail).toHaveText('Couldn\'t find your account.');
    }

    async verifyPasswordErrorMessage(passwordErrorMessage: string): Promise<void> {
        await expect(this.errorMessagePassword).toBeVisible();
        await expect(this.errorMessagePassword).toHaveText(passwordErrorMessage);
    }

    async verifyLoginPageUI() {
        await expect(this.loginHeader).toBeVisible();
        await expect(this.loginHeader).toContainText('Sign in to Tripinas');
        await expect(this.emailOrUsernameInput).toBeVisible();
        await expect(this.continueButton).toBeVisible();
        await expect(this.signUpLink).toBeVisible();
    }

    async verify2ndLoginPageUI() {
        await expect(this.enterPassHeader).toBeVisible();
        await expect(this.enterPassHeader).toContainText('Enter your password');
        await expect(this.passwordInput).toBeVisible();
        await expect(this.forgotPasswordLink).toBeVisible();
        await expect(this.continueButton).toBeVisible();
        await expect(this.getHelpLink).toBeVisible();
    }

    async clickForgotPassword() {
        await this.forgotPasswordLink.click();
    }

    async verifyForgotPasswordPageUI() {
        await expect(this.forgotPasswordHeader).toBeVisible();
        await expect(this.forgotPasswordHeader).toContainText('Forgot Password?');
        await expect(this.resetPasswordButton).toBeVisible();
        await expect(this.backLink).toBeVisible();
        await expect(this.getHelpLink).toBeVisible();
    }

    async clickResetPassword() {
        await this.resetPasswordButton.click();
    }

    async verifyResetPasswordPageUI() {
        await expect(this.resetPasswordHeader).toBeVisible();
        await expect(this.resetPasswordHeader).toContainText('Reset password');
        await expect(this.resendButton).toBeVisible();
        await expect(this.codeInput).toBeVisible();
    }

    async clickBackLink() {
        await this.backLink.click();
    }

    async clickGetHelpLink() {
        await this.getHelpLink.click();
    }

    async verifyGetHelpPageUI() {
        await expect(this.getHelpHeader).toBeVisible();
        await expect(this.getHelpHeader).toContainText('Get help');
        await expect(this.emailSuppButton).toBeVisible();
        await expect(this.backLink).toBeVisible();
    }

    async clickSignUpLink() {
        await this.signUpLink.click();
    }

    async browserBackButton() {
        await this.page.goBack();
    }

    async verifySignedOut() {
        await this.page.waitForURL('http://localhost:5173/dashboard');
        await expect(this.signedOutText).toBeVisible();
        await expect(this.signedOutText).toContainText('You are signed out.');
    }
}