import { Page, Locator, expect } from '@playwright/test';

export class RegistrationPage {

  readonly registrationFormHeader: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly clickContinueButton: Locator;


    constructor(public readonly page: Page) {
        this.registrationFormHeader = page.getByRole('heading', { name: 'Create your account' });
        this.firstNameInput = page.getByRole('textbox', { name: 'First name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last name' });
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.emailInput = page.getByRole('textbox', { name: 'Email address' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.clickContinueButton = page.getByRole('button', { name: 'Continue' });
    }
}