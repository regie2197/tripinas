// This file defines a "LoginPage" class.
// A Page Object is like a helper that knows how to interact with the login page.

import { Page } from '@playwright/test';

export class LoginPage {
  // We keep a reference to Playwright's Page (the browser tab)
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Go to the login page
  async gotoSignIn() {
    await this.page.goto('/sign-in');  // baseURL should be set in config
  }

  // Fill in the login form and submit
  async login(email: string, password: string) {
    // Fill email/username
    await this.page.getByRole('textbox', { name: 'Email address or username' }).fill(email);
    await this.page.getByRole('button', { name: 'Continue' }).click();

    // Fill password
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }
}
