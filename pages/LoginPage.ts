import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  // Locators
  public readonly emailInput: Locator;
  public readonly passwordInput: Locator;
  public readonly continueButton: Locator;

  constructor(public readonly page: Page) {
    this.emailInput = page.getByRole('textbox', { name: 'Email address or username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
  }

  // Actions
  async navigateTo(): Promise<void> {
    await this.page.goto('http://localhost:5173/sign-in');
  }

  async enterEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.enterEmail(email);
    await this.clickContinue();
    await this.enterPassword(password);
    await this.clickContinue();
  }

  // Assertions
  async verifyPageLoaded(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
  }

  async verifyLoginSuccessful(expectedUrl: string = 'http://localhost:5173/dashboard'): Promise<void> {
    await this.page.waitForURL(expectedUrl);
    await expect(this.page).toHaveURL(expectedUrl);
  }
}