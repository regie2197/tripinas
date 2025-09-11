import { expect, Locator, Page } from '@playwright/test';

export class ProfilePage {
    // Locators
    public readonly profileHeader: Locator;
    public readonly openUserButton: Locator;
    public readonly manageAccountButton: Locator;
    public readonly signOutButton: Locator;
    public readonly securityButton: Locator;
    public readonly deleteButton: Locator;
    public readonly deleteConfirmText: Locator;
    public readonly updateProfileButton: Locator;
    public readonly saveButton: Locator;
    public readonly exitModal: Locator;
    public readonly updateUsernameButton: Locator;
    public readonly cancelButton: Locator;
    public readonly addEmailButton: Locator;
    public readonly addButton: Locator;
    public readonly updatePasswordButton: Locator;
    public readonly newPasswordInput: Locator;
    public readonly confirmPasswordInput: Locator;
    public readonly newPasswordError: Locator;

    constructor(public readonly page: Page) {
        this.profileHeader = page.getByText('Profile');
        this.openUserButton = page.getByRole('button', { name: 'Open user button' });
        this.manageAccountButton = page.getByRole('menuitem', { name: 'Manage account' });
        this.signOutButton = page.getByRole('menuitem', { name: 'Sign out' });
        this.securityButton = page.getByRole('button', { name: 'Security' });
        this.deleteButton = page.getByRole('button', { name: 'Delete account' }).first();
        this.deleteConfirmText = page.getByRole('textbox', { name: 'Type "Delete account" below' });
        this.updateProfileButton = page.getByRole('button', { name: 'Update profile' });
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.exitModal = page.getByRole('button', { name: 'Close modal' });
        this.updateUsernameButton = page.getByRole('button', { name: 'Update username' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.addEmailButton = page.getByRole('button', { name: 'Add email address' });
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.updatePasswordButton = page.getByRole('button', { name: 'Update password' });
        this.newPasswordInput = page.locator('#newPassword-field');
        this.confirmPasswordInput = page.locator('#confirmPassword-field');
        this.newPasswordError = page.locator('#error-newPassword');
    }

    async clickIcon() {
        await this.openUserButton.click();
    }

    async clickSignOut() {
        await this.signOutButton.click();
    }

    async clickManageAccount() {
        await this.manageAccountButton.click();
    }

    async clickUpdateProfile() {
        await this.updateProfileButton.click();
    }

    async clickUpdateUsername() {
        await this.updateUsernameButton.click();
    }

    async clickSaveButton() {
        await this.saveButton.click();
    }

    async expectSaveButtonDisabled() {
        await expect(this.saveButton).toBeDisabled();
    }

    async clickAddButton() {
        await this.addButton.click();
    }

    async clickCancelButton() {
        await this.cancelButton.click();
    }

    async clickAddEmailButton(){
        await this.addEmailButton.click();
    }

    /**
     * @param newPassword
     * @param confirmPassword
     * @param newPassError
     */

    async isAddedEmailVisibleInModal(email: string): Promise<void>{
        await expect.soft(this.page.getByText(email, { exact: true })).toBeVisible();
    }

    async expectAddButtonDisabled() {
        await expect(this.addButton).toBeDisabled();
    }

    async newPasswordErrorMessage(newPassError: string): Promise<void>{
        await expect(this.newPasswordError).toBeVisible();
        await expect(this.newPasswordError).toContainText(newPassError);
    }

    async confirmPasswordErrorMessage() {
        await expect(this.page.getByText('Passwords don\'t match.')).toBeVisible();
    }

    async clickSecurity() {
        await this.securityButton.click();
    }

    async clickExitModal() {
        await this.exitModal.click();
    }

    async clickUpdatePassword() {
        await this.updatePasswordButton.click();
    }

    async fillPasswordFields(newPassword: string, confirmPassword:string): Promise<void>{
        await this.newPasswordInput.fill(newPassword);
        await this.confirmPasswordInput.fill(confirmPassword);
    }

    async deleteAccount() {
        await this.deleteButton.click();
        await this.deleteConfirmText.fill('Delete account');
        await expect(this.deleteButton).toBeVisible();
        await this.deleteButton.click();

        await this.page.waitForURL('http://localhost:5173/sign-in');
    }
}