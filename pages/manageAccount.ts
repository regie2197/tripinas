import { Page, Locator } from '@playwright/test';

export class ManageProfile {
  readonly page: Page;

  // Top-level user menu
  readonly openUserButton: Locator;
  readonly userFullnameText: Locator;
  readonly userUsernameText: Locator;
  readonly manageAccountMenuItem: Locator;

  // Profile section
  readonly profileButton: Locator;
  readonly profileDetailsHeading: Locator;
  readonly profileParagraph: Locator;
  readonly profileLogoImg: Locator;
  readonly profileFullnameText: Locator;
  readonly updateProfileButton: Locator;
  readonly updateProfileHeading: Locator;
  readonly uploadButton: Locator;
  readonly firstNameTextbox: Locator;
  readonly firstNameText: Locator;
  readonly lastNameTextbox: Locator;
  readonly cancelButton: Locator;
  readonly updateProfileConfirmButton: Locator;
  readonly removeButton: Locator;
  readonly saveCancelText: Locator;

  // Username section
  readonly usernameText: Locator;
  readonly usernameLabel: Locator;
  readonly updateUsernameButton: Locator;
  readonly updateUsernameHeading: Locator;
  readonly usernameTextbox: Locator;

  // Email section
  readonly emailAddressesText: Locator;
  readonly userEmailText: Locator;
  readonly openMenuButton: Locator;
  readonly completeVerificationMenuItem: Locator;
  readonly verifyEmailHeading: Locator;
  readonly verificationCodeText: Locator;

  constructor(page: Page) {
    this.page = page;

    // Top-level user menu
    this.openUserButton = page.getByRole('button', { name: 'Open user button' });
    this.userFullnameText = page.getByText('Juan Dela Cruz', { exact: true });
    this.userUsernameText = page.getByText('regietest', { exact: true });
    this.manageAccountMenuItem = page.getByRole('menuitem', { name: 'Manage account' });

    // Profile section
    this.profileButton = page.getByRole('button', { name: 'Profile', exact: true });
    this.profileDetailsHeading = page.getByRole('heading', { name: 'Profile details' });
    this.profileParagraph = page.getByRole('paragraph').filter({ hasText: 'Profile' });
    this.profileLogoImg = page.getByRole('img', { name: "Juan Dela Cruz's logo" });
    this.profileFullnameText = page.getByText('Juan Dela Cruz', { exact: true });
    this.updateProfileButton = page.getByRole('button', { name: 'Update profile' });
    this.updateProfileHeading = page.getByRole('heading', { name: 'Update profile' });
    this.uploadButton = page.getByRole('button', { name: 'Upload' });
    this.firstNameTextbox = page.getByRole('textbox', { name: 'First name' });
    this.firstNameText = page.getByText('First name');
    this.lastNameTextbox = page.getByRole('textbox', { name: 'Last name' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.updateProfileConfirmButton = page.getByRole('button', { name: 'Update profile' });
    this.removeButton = page.getByRole('button', { name: 'Remove' });
    this.saveCancelText = page.getByText('SaveCancel');

    // Username section
    this.usernameText = page.getByText('Username', { exact: true });
    this.updateUsernameButton = page.getByRole('button', { name: 'Update username' });
    this.updateUsernameHeading = page.getByRole('heading', { name: 'Update username' });
    this.usernameLabel = page.locator('label').filter({ hasText: 'Username' });
    this.usernameTextbox = page.getByRole('textbox', { name: 'Username' });

    // Email section
    this.emailAddressesText = page.getByText('Email addresses');
    this.userEmailText = page.getByText('regietest@email.com', { exact: true });
    this.openMenuButton = page.getByRole('button', { name: 'Open menu' });
    this.completeVerificationMenuItem = page.getByRole('menuitem', { name: 'Complete verification' });
    this.verifyEmailHeading = page.getByRole('heading', { name: 'Verify email address' });
    this.verificationCodeText = page.getByText('Enter the verification code');
  }

  // Example helper method for uploading profile picture
  async uploadProfilePicture(filePath: string) {
    await this.uploadButton.setInputFiles(filePath);
  }
}
