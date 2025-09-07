import { Page, Locator } from '@playwright/test';

export class Security {
  readonly page: Page;
  readonly securityButton: Locator;
  readonly securityHeading: Locator;
  readonly passwordText: Locator;
  readonly updatePasswordButton: Locator;
  readonly updatePasswordHeading: Locator;
  readonly newPasswordText: Locator;
  readonly confirmPasswordTextbox: Locator;
  readonly cancelButton: Locator;
  readonly saveButton: Locator;
  readonly activeDevicesText: Locator;
  readonly closeModalButton: Locator;
  readonly openUserButton: Locator;
  readonly signOutMenuItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.securityButton = page.getByRole('button', { name: 'Security' });
    this.securityHeading = page.getByRole('heading', { name: 'Security' });
    this.passwordText = page.getByText('Password', { exact: true });
    this.updatePasswordButton = page.getByRole('button', { name: 'Update password' });
    this.updatePasswordHeading = page.getByRole('heading', { name: 'Update password' });
    this.newPasswordText = page.getByText('New password');
    this.confirmPasswordTextbox = page.getByRole('textbox', { name: 'Confirm password' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.activeDevicesText = page.getByText('Active devices');
    this.closeModalButton = page.getByRole('button', { name: 'Close modal' });
    this.openUserButton = page.getByRole('button', { name: 'Open user button' });
    this.signOutMenuItem = page.getByRole('menuitem', { name: 'Sign out' });
  }

  async goto() {
    await this.page.goto('http://localhost:5173/dashboard');
  }
}
