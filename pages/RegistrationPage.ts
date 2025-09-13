import { Page, expect } from '@playwright/test';

export class RegistrationPage {
  public readonly page: Page;
  public readonly firstNameInput;
  public readonly lastNameInput;
  public readonly usernameInput;
  public readonly emailInput;
  public readonly passwordInput;
  public readonly showPasswordButton;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByRole('textbox', { name: 'First name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last name' });
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.emailInput = page.getByRole('textbox', { name: 'Email address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.showPasswordButton = page.getByRole('button', { name: 'Show password' });
    }

    async gotoSignUp() {
        await this.page.goto('http://localhost:5173/sign-up');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.getByRole('heading', { name: 'Create your account' }).isVisible();
    }

    async fillRegistrationForm(firstName: string, lastName: string, username: string, email: string, password: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.usernameInput.fill(username);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.showPasswordButton.click();
    }
    async verifyRegistrationSuccess() {
        await expect(this.page).toHaveURL('http://localhost:5173/dashboard/');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.getByRole('heading', { name: 'Dashboard Home' }).click();

        await expect(this.page.getByTestId('user-fullname')).toBeVisible();
        await expect(this.page.getByTestId('user-username')).toBeVisible();
        await expect(this.page.getByTestId('user-email')).toBeVisible();
    }
    async UsernameTaken(name: string, lastName: string, username: string, email: string, password: string) {
        await this.firstNameInput.fill(name);
        await this.lastNameInput.fill(lastName);
        await this.usernameInput.fill(username);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    } 
    async EmailTaken(name: string, lastName: string, username: string, email: string, password: string) {
        await this.firstNameInput.fill(name);
        await this.lastNameInput.fill(lastName);
        await this.usernameInput.fill(username);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }
    async registerWithShortPassword(name: string, lastName: string, username: string, email: string, password: string) {
        await this.firstNameInput.fill(name);
        await this.lastNameInput.fill(lastName);
        await this.usernameInput.fill(username);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.showPasswordButton.click();
    }
    async registerWithSequentialPassword(name: string, lastName: string, username: string, email: string, password: string) {
        await this.firstNameInput.fill(name);
        await this.lastNameInput.fill(lastName);
        await this.usernameInput.fill(username);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.showPasswordButton.click();
    }
    async registerWithRepeatingDigitsPassword(name: string, lastName: string, username: string, email: string, password: string) {
      await this.firstNameInput.fill(name);
      await this.lastNameInput.fill(lastName);
      await this.usernameInput.fill(username);
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.showPasswordButton.click();
    }
    async registerWithCommonPassword(name: string, lastName: string, username: string, email: string, password: string) {
      await this.firstNameInput.fill(name);
      await this.lastNameInput.fill(lastName);
      await this.usernameInput.fill(username);
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.showPasswordButton.click();
    }
    async clickContinue() {
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }
    /**
     * Verifies that the username already taken error message is displayed and matches the expected message.
     * @param username The username that was attempted to be registered.
     * @param email The email address that was attempted to be registered.
     * @param password The password that was attempted to be registered.
     * @param expectedErrorMessage The expected error message text.
     */

    async expectPasswordmeetsCriteria() {
        await expect(this.page.getByText('Your password meets all the')).toBeVisible();
    }
    async expectUsernameTakenError(expectedErrorMessage: string) {
        await expect(this.page.getByText('That username is taken.')).toBeVisible();
        await expect(this.page.locator('#error-username')).toContainText(expectedErrorMessage);
    }
    async expectEmailTakenError(expectedErrorMessage: string) {
        await expect(this.page.getByText('That email address is taken.')).toBeVisible();
        await expect(this.page.locator('#error-emailAddress')).toContainText(expectedErrorMessage);
    }
    async expectShortenedPasswordError(expectedErrorMessage: string) {
      await expect(this.page.getByText('Your password must contain 8 or more characters.')).toBeVisible({ timeout: 5000 });
      await expect(this.page.locator('#error-password')).toContainText(expectedErrorMessage);
    }
    async expectSequentialPasswordError(expectedErrorMessage: string) {
      await expect(this.page.getByText('This password has been found')).toBeVisible();
      await expect(this.page.locator('#error-password')).toContainText(expectedErrorMessage);
    }
    async expectRepeatingDigitsPasswordError(expectedErrorMessage: string) {
      await expect(this.page.getByText('This password has been found')).toBeVisible();
      await expect(this.page.locator('#error-password')).toContainText(expectedErrorMessage);
    }
    async expectCommonPasswordError(expectedErrorMessage: string) {
      await expect(this.page.getByText('This password has been found')).toBeVisible();
      await expect(this.page.locator('#error-password')).toContainText(expectedErrorMessage);
    }
}
 // Note: @Regression: Test is flaky and needs stabilization with URL http://localhost:5173/dashboard (Error: waiting for navigation to "http://localhost:5173/dashboard" until "load")
    