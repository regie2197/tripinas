import { Page, Locator } from '@playwright/test';

export class ManageProfile {
  public readonly page: Page;

  // Top-level user menu
  public readonly openUserButton: Locator;
  public readonly userFullnameText: Locator;
  public readonly manageAccountMenuItem: Locator;
  public readonly buttonSignOut: Locator;

  // Profile section
  public readonly profileButton: Locator;
  public readonly profileDetailsHeading: Locator;
  public readonly profileParagraph: Locator;
  public readonly profileLogoImg: Locator;
  public readonly profileFullnameText: Locator;
  public readonly updateProfileButton: Locator;
  public readonly updateProfileHeading: Locator;
  public readonly uploadButton: Locator;
  public readonly firstNameTextbox: Locator;
  public readonly firstNameText: Locator;
  public readonly lastNameTextbox: Locator;
  public readonly cancelButton: Locator;
  //public readonly removeButton: Locator;
  public readonly saveButton: Locator;

  // Username section
  public readonly usernameText: Locator;
  public readonly usernameLabel: Locator;
  public readonly updateUsernameButton: Locator;
  public readonly updateUsernameHeading: Locator;
  public readonly usernameTextbox: Locator;

  // Email section
  public readonly emailAddressesText: Locator;
  public readonly userEmailText: Locator;
  public readonly openMenuButton: Locator;
  public readonly completeVerificationMenuItem: Locator;
  public readonly verifyEmailHeading: Locator;
  public readonly verificationCodeText: Locator;
  public readonly verifyButton: Locator;
  public readonly closeModalButton: Locator;
  public readonly uploadInput: Locator;

  constructor(page: Page) {
    this.page = page;

    // Top-level user menu
    this.openUserButton = page.getByRole('button', { name: 'Open user button' });
    this.userFullnameText = page.getByText('Juan Dela Cruz', { exact: true });
    this.usernameText = page.getByText('regietest', { exact: true });
    this.manageAccountMenuItem = page.getByRole('menuitem', { name: 'Manage account' });
    this.buttonSignOut = page.getByRole('button', { name: 'Sign out' });

    // Profile section
    this.profileButton = page.getByRole('button', { name: 'Profile', exact: true });
    this.profileDetailsHeading = page.getByRole('heading', { name: 'Profile details' });
    this.profileParagraph = page.getByRole('paragraph').filter({ hasText: 'Profile' });
    this.profileLogoImg = page.getByRole('dialog').getByRole('img', { name: 'Juan Dela Cruz\'s logo' })
    this.profileFullnameText = page.getByText('Juan Dela Cruz', { exact: true });
    this.updateProfileButton = page.getByRole('button', { name: 'Update profile' });
    this.updateProfileHeading = page.getByRole('heading', { name: 'Update profile' });
    this.uploadButton = page.getByRole('button', { name: 'Upload' });
    this.uploadInput = page.locator('input[type="file"]');
    this.firstNameTextbox = page.getByRole('textbox', { name: 'First name' });
    this.firstNameText = page.getByText('First name');
    this.lastNameTextbox = page.getByRole('textbox', { name: 'Last name' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    //this.removeButton = page.getByRole('button', { name: 'Remove' });
    this.saveButton = page.getByRole('button', { name: 'Save' });

    // Username section
    this.usernameText = page.getByText('Username', { exact: true });
    this.updateUsernameButton = page.getByRole('button', { name: 'Update username' });
    this.updateUsernameHeading = page.getByRole('heading', { name: 'Update username' });
    this.usernameLabel = page.locator('label').filter({ hasText: 'Username' });
    this.usernameTextbox = page.getByRole('textbox', { name: 'Username' });
    //Should also be here: this.cancelButton & saveButton

    // Email section
    this.emailAddressesText = page.getByText('Email addresses');
    this.userEmailText = page.getByText('regietest@email.com', { exact: true });
    this.openMenuButton = page.getByRole('button', { name: 'Open menu' });
    this.completeVerificationMenuItem = page.getByRole('menuitem', { name: 'Complete verification' });
    this.verifyEmailHeading = page.getByRole('heading', { name: 'Verify email address' });
    this.verificationCodeText = page.getByText('Enter the verification code');
    //this.cancelButton
    this.verifyButton = page.getByRole('button', { name: 'Verify' })
    
    this.closeModalButton = page.getByRole('button', { name: 'Close modal' });
  }

//METHODS

// Open Manage Account from user menu
async openManageProfile() {
  await this.openUserButton.click();
  await this.manageAccountMenuItem.click();
  await this.profileDetailsHeading.waitFor();
}

// Update profile fullname
async updateProfileName(firstName: string, lastName: string) {
  await this.updateProfileButton.click();
  await this.updateProfileHeading.waitFor();
  await this.firstNameTextbox.fill(firstName);
  await this.lastNameTextbox.fill(lastName);
  await this.saveButton.click();
}

// Cancel profile update
async cancelProfileUpdate() {
  await this.updateProfileButton.click();
  await this.cancelButton.click();
}

// Update username
async updateUsername(newUsername: string) {
  await this.updateUsernameButton.click();
  await this.updateUsernameHeading.waitFor();
  await this.usernameTextbox.fill(newUsername);
  await this.saveButton.click();
}

// Trigger email verification
async verifyEmail() {
  await this.openMenuButton.click();
  await this.completeVerificationMenuItem.click();
  await this.verifyEmailHeading.waitFor();
}

  async closeModal() {
    await this.closeModalButton.click();
  }

}
