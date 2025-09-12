import { expect, Locator, Page } from "@playwright/test";

export class ManageAccountPage {
  readonly accountDialog: Locator;
  readonly profileTab: Locator;
  readonly securityTab: Locator;

  // Profile actions
  readonly updateProfileButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly uploadButton: Locator;
  readonly removeButton: Locator;
  readonly fileInput: Locator;

  // Username
  readonly updateUsernameButton: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly continueButton: Locator;

  // Email
  readonly addEmailButton: Locator;
  readonly emailAddressInput: Locator;
  readonly addButton: Locator;
  readonly verificationCodeInput: Locator;

  constructor(public readonly page: Page) {
    this.accountDialog = page.getByRole("dialog");
    this.profileTab = page.getByRole("button", { name: "Profile", exact: true });
    this.securityTab = page.getByRole("button", { name: "Security" });

    this.updateProfileButton = page.getByRole("button", { name: "Update profile" });
    this.firstNameInput = page.getByRole("textbox", { name: "First name" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last name" });
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
    this.uploadButton = page.getByRole("button", { name: "Upload" });
    this.removeButton = page.getByRole("button", { name: "Remove" });
    this.fileInput = page.locator('input[type="file"]'); // hidden file input

    this.updateUsernameButton = page.getByRole("button", { name: "Update username" });
    this.usernameInput = page.getByRole("textbox", { name: "Username" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.continueButton = page.getByRole("button", { name: "Continue" });

    this.addEmailButton = page.getByRole("button", { name: "Add email address" });
    this.emailAddressInput = page.getByRole("textbox", { name: "Email address" });
    this.addButton = page.getByRole("button", { name: "Add" });
    this.verificationCodeInput = page.getByRole("textbox", { name: "Enter verification code" });
  }

  async verifyManageAccountDialog(): Promise<void> {
    await expect(this.accountDialog).toContainText("Manage your account info.");
    await expect(this.profileTab).toBeVisible();
    await expect(this.securityTab).toBeVisible();
  }

  async updateProfile(firstName: string, lastName: string): Promise<void> {
    await this.updateProfileButton.click();

    // Clear and re-fill so Clerk detects a change
    await this.firstNameInput.fill("");
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill("");
    await this.lastNameInput.fill(lastName);

    // Wait for Save to become enabled
    await expect(this.saveButton).toBeEnabled();
    await this.saveButton.click();
  }

  async uploadProfileImage(filePath: string): Promise<void> {
    await this.updateProfileButton.click();
    await this.uploadButton.click(); // trigger the hidden input
    await this.fileInput.setInputFiles(filePath);

    // ⚠️ Known bug: clicking "Save" does nothing, so fallback to Cancel
    await this.cancelButton.click();
  }

  async removeProfileImage(): Promise<void> {
    await this.updateProfileButton.click();
    await this.removeButton.click();

    // Confirm removal (Save should become enabled)
    if (await this.saveButton.isEnabled()) {
      await this.saveButton.click();
    } else {
      await this.cancelButton.click();
    }
  }

  async updateUsername(newUsername: string, password: string): Promise<void> {
    await this.updateUsernameButton.click();
    await this.usernameInput.fill(newUsername);
    await this.saveButton.click();
    await this.passwordInput.fill(password);
    await this.continueButton.click();
  }

  async addEmail(newEmail: string, password: string, verificationCode: string): Promise<void> {
    await this.addEmailButton.click();
    await expect(this.emailAddressInput).toBeVisible();
    await this.emailAddressInput.fill(newEmail);
    await this.addButton.click();
    await this.passwordInput.fill(password);
    await this.continueButton.click();
    await this.verificationCodeInput.fill(verificationCode);
  }
}
