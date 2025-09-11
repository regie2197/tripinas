import { expect, Locator, Page } from '@playwright/test';

export class RegisterPage {
    // Locators
    public readonly registerHeader: Locator;
    public readonly firstNameInput: Locator;
    public readonly lastNameInput: Locator;
    public readonly usernameInput: Locator;
    public readonly emailInput: Locator;
    public readonly registerPasswordInput: Locator;
    public readonly continueButton: Locator;
    public readonly signInLink: Locator;
    public readonly optionalText: Locator;
    public readonly errorMessageUsername: Locator;
    public readonly errorMessageFirstName: Locator;
    public readonly errorMessageLastName: Locator;
    public readonly errorMessageEmailSignUp: Locator;

    constructor(public readonly page: Page) {
        this.registerHeader = page.getByRole('heading', { name: 'Create your account' });
        this.firstNameInput = page.locator('#firstName-field');
        this.lastNameInput = page.locator('#lastName-field');
        this.usernameInput = page.locator('#username-field');
        this.emailInput = page.locator('#emailAddress-field');
        this.registerPasswordInput = page.locator('#password-field');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.signInLink = page.getByRole('link', { name: 'Sign in' });
        this.optionalText = page.getByText('Optional');
        this.errorMessageUsername = page.locator('#error-username');
        this.errorMessageFirstName = page.locator('#error-firstName');
        this.errorMessageLastName = page.locator('#error-lastName');
        this.errorMessageEmailSignUp = page.locator('#error-emailAddress');
    }

    async clickSignInLink() {
        await this.signInLink.click();
    }

    async verifySignUpPageUI() {
        await expect(this.registerHeader).toBeVisible();
        await expect(this.registerHeader).toContainText('Create your account');
        await expect(this.firstNameInput).toBeVisible();
        await expect(this.lastNameInput).toBeVisible();
        await expect(this.usernameInput).toBeVisible();
        await expect(this.emailInput).toBeVisible();
        await expect(this.registerPasswordInput).toBeVisible();
        await expect(this.continueButton).toBeVisible();
        await expect(this.signInLink).toBeVisible();
    }

    async isFieldOptional() {
        await expect((this.optionalText).first()).toBeVisible();
        await expect((this.optionalText).nth(1)).toBeVisible();
    }

    async isFieldNotOptional() {
        await expect(this.emailInput).toBeVisible();
        await expect(this.usernameInput).toBeVisible();
        await expect(this.registerPasswordInput).toBeVisible();
        await expect((this.optionalText).nth(3)).not.toBeVisible();
    }

    /**
     * @param firstName
     * @param lastName
     * @param username
     * @param email
     * @param registerPassword 
     * @param registerErrorMessage
     */

    async fillOptionalFields(firstName: string, lastName: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
    }

    async fillRequiredFields(email: string, username: string, registerPassword: string) {
        await this.emailInput.fill(email);
        await this.usernameInput.fill(username);
        await this.registerPasswordInput.fill(registerPassword);
        await this.continueButton.click();
    }

    async verifyUsernameErrorMessage(usernameError: string): Promise<void> {
        await expect(this.errorMessageUsername).toBeVisible();
        await expect(this.errorMessageUsername).toContainText(usernameError);
    }

    async verifyFirstNameErrorMessage() {
        await expect(this.errorMessageFirstName).toBeVisible();
        await expect(this.errorMessageFirstName).toContainText('First name should not exceed 256 characters.');
    }

    async verifyLastNameErrorMessage() {
        await expect(this.errorMessageLastName).toBeVisible();
        await expect(this.errorMessageLastName).toContainText('Last name should not exceed 256 characters.');
    }

    async isFirstNameErrorVisible() {
        await expect.soft(this.errorMessageFirstName).toBeVisible();
    }

    async isLastNameErrorVisible() {
        await expect.soft(this.errorMessageLastName).toBeVisible();
    }

    async isEmailErrorVisible(registerErrorMessage: string): Promise<void> {
        await expect(this.errorMessageEmailSignUp).toBeVisible();
        await expect(this.errorMessageEmailSignUp).toContainText(registerErrorMessage);
    }
}