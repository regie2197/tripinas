import { Page, Locator, expect } from '@playwright/test';

export class ManageSecurity {
  static navigateToSecurity() {
    throw new Error('Method not implemented.');
  }
  public readonly page: Page;
  public readonly openUserButton: Locator;
  public readonly manageAccountMenuItem: Locator;
  public readonly securityButton: Locator;
  public readonly securityHeading: Locator;
  public readonly passwordText: Locator;
  public readonly updatePasswordButton: Locator;
  public readonly updatePasswordHeading: Locator;
  public readonly newPasswordText: Locator;
  public readonly newPasswordTextbox: Locator;
  public readonly confirmPasswordText: Locator;
  public readonly confirmPasswordTextbox: Locator;
  public readonly signoutCheckbox: Locator;
  public readonly signoutText: Locator
  public readonly cancelButton: Locator;
  public readonly saveButton: Locator;
  public readonly activeDevicesText: Locator;
  public readonly closeModalButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.openUserButton = page.getByRole('button', { name: 'Open user button' });
    this.manageAccountMenuItem = page.getByRole('menuitem', { name: 'Manage account' })
    this.securityButton = page.getByRole('button', { name: 'Security' });
    this.securityHeading = page.getByRole('heading', { name: 'Security' });
    this.passwordText = page.getByText('Password', { exact: true });
    this.updatePasswordButton = page.getByRole('button', { name: 'Update password' });
    this.updatePasswordHeading = page.getByRole('heading', { name: 'Update password' });
    this.newPasswordText = page.getByText('New password');
    this.newPasswordTextbox = page.getByRole('textbox', { name: 'New password' });
    this.confirmPasswordText = page.getByText('Confirm password');
    this.confirmPasswordTextbox = page.getByRole('textbox', { name: 'Confirm password' });
    this.signoutCheckbox = page.getByRole('checkbox', { name: 'Sign out of all other devices' })
    this.signoutText = page.getByText('Sign out of all other devices', { exact: true })
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.activeDevicesText = page.getByText('Active devices');
    this.closeModalButton = page.getByRole('button', { name: 'Close modal' });


  }
  // Methods
  async navigateToSecurity() {
    await this.page.goto('http://localhost:5173/dashboard');
    await this.page.waitForLoadState('domcontentloaded');
    await this.openUserButton.click();
    await this.manageAccountMenuItem.click();
    await this.securityButton.click();
    await expect(this.securityHeading).toBeVisible();
  }

  async navigateToUpdatePassword() {
    await this.page.goto('http://localhost:5173/dashboard');
    await this.page.waitForLoadState('domcontentloaded');
    await this.openUserButton.click();
    await this.manageAccountMenuItem.click();
    await this.securityButton.click();
    await this.updatePasswordButton.click();
    await expect(this.updatePasswordHeading).toBeVisible();
  }

  async enterNewPassword(newPassword: string, confirmPassword: string) {
    await this.newPasswordTextbox.fill(newPassword);
    await this.confirmPasswordTextbox.fill(confirmPassword);
  }

  async clickSavePassword() {
    await this.saveButton.click();
  }

  async uncheckSignoutCheckbox() {
    await this.signoutCheckbox.uncheck();
  }

  async cancelUpdatePassword() {
    await this.cancelButton.click();
    await expect(this.updatePasswordHeading).not.toBeVisible();
  }

  async saveNewPassword() {
    await this.saveButton.click();
  }

  async closeModal() {
    await this.closeModalButton.click();
  }

  }
