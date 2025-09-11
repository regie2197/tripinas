import { Page, expect, Locator } from '@playwright/test';
import { error } from 'console';

export class DashboardPage {
    readonly page: Page;
    readonly fullNameDisplay: Locator;
    readonly usernameDisplay: Locator;
    readonly emailDisplay: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly updateUsernameButton: Locator;
    readonly usernameInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fullNameDisplay = page.getByTestId('user-fullname');
        this.usernameDisplay = page.getByTestId('user-username');
        this.emailDisplay = page.getByTestId('user-email');
        this.firstNameInput = page.getByRole('textbox', { name: 'First name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last name' });
        this.updateUsernameButton = page.getByRole('button', { name: 'Update username' });
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    }

    async goto(): Promise<void> {
        await this.page.goto('http://localhost:5173/dashboard');
        await this.page.waitForLoadState('networkidle');
        await expect(this.page.getByRole('heading', { name: 'Dashboard Home' })).toBeVisible();
    }

    async expectUserProfileInfo() {
        await expect(this.page.getByTestId('user-fullname')).toBeVisible();
        await expect(this.page.getByTestId('user-username')).toBeVisible();
        await expect(this.page.getByTestId('user-email')).toBeVisible();
    }

    async expectAdminWelcome() {
        await expect(this.page.getByRole('heading', { name: 'Welcome to your admin' })).toBeVisible();
    }

    async expectAdminMenu() {
        await expect(this.page.getByRole('heading', { name: 'Admin', exact: true })).toBeVisible({ timeout: 5000 });
        await expect(this.page.getByRole('link', { name: 'Users' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Settings' })).toBeVisible();
    }
    async expectUsersPanel() {
        await expect(this.page.getByRole('link', { name: 'Users' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Users' }).click();
        await this.page.goto('http://localhost:5173/users');
    }

    async expectSettingsPanel() {
        await expect(this.page.getByRole('link', { name: 'Settings' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Settings' }).click();
        await this.page.goto('http://localhost:5173/settings');
    }

    async openUserMenu() {
        await expect(this.page.getByRole('button', { name: 'Open user button' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Open user button' }).click();
    }

    async openManageAccount() {
        await expect(this.page.getByRole('menuitem', { name: 'Manage account' })).toBeVisible();
        await this.page.getByRole('menuitem', { name: 'Manage account' }).click();
        await expect(this.page.getByRole('heading', { name: 'Account' })).toBeVisible();
        await expect(this.page.getByText('Manage your account info.')).toBeVisible();
    }

    async navigateOpenUserMenu() {
        await expect(this.page.getByText('Marianne Cecilio', { exact: true })).toBeVisible();
        await expect(this.page.getByText('mgctest_test012', { exact: true })).toBeVisible();
        await expect(this.page.getByRole('menuitem', { name: 'Manage account' })).toBeVisible();
        await expect(this.page.getByLabel('User button popover').getByRole('img', { name: 'Marianne Cecilio\'s logo' })).toBeVisible();
        await expect(this.page.getByRole('menuitem', { name: 'Sign out' })).toBeVisible();
    }

    async usersProfileDetails() {
        await expect(this.page.getByRole('button', { name: 'Profile', exact: true })).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Profile details' })).toBeVisible();
        await expect(this.page.getByText('Marianne CecilioUpdate profileProfile')).toBeVisible();
        await expect(this.page.getByText('mgctest_test012Update usernameUsername')).toBeVisible();
        await expect(this.page.locator('.cl-profileSection.cl-profileSection__emailAddresses')).toBeVisible();
    }

    async usersSecuritydetails() {
        await this.page.getByRole('button', { name: 'Security' }).click();
        await expect(this.page.getByRole('button', { name: 'Security' })).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Security' })).toBeVisible();
        await expect(this.page.getByText('••••••••••Update passwordPassword')).toBeVisible();
        await expect(this.page.locator('.cl-profileSection.cl-profileSection__activeDevices')).toBeVisible();
        await expect(this.page.getByText('Delete accountDelete account')).toBeVisible();
    }
    /*Perform update information with provided last name
    * @param lastName - The new last name to be used for User profile information
    * @param username - The new username to be changed from the recent username
    */
    async updateUsersProfileInformation(firstName: string, lastName: string): Promise<void> {
        await this.page.getByRole('textbox', { name: 'First name' }).fill(firstName, { timeout: 60000 });
        await this.page.getByRole('textbox', { name: 'Last name' }).fill(lastName, { timeout: 60000 });
        await this.page.getByRole('button', { name: 'Save' }).click();
    }
    async uploadProfilePhoto(photoPath: string): Promise<void> {
        await this.page.getByRole('menuitem', { name: 'Manage account' }).click();
        await this.page.getByRole('button', { name: 'Update profile' }).click();
        await this.page.getByRole('button', { name: 'Upload' }).click();
        await this.page.getByRole('button', { name: 'Upload' }).setInputFiles(photoPath);
        await this.page.getByText('SaveCancel').click();
    }
    async removeProfilePhoto(): Promise<void> {
        await this.page.getByRole('button', { name: 'Close modal' }).click();
        await this.page.getByRole('button', { name: 'Open user button' }).click();
        await this.page.getByRole('menuitem', { name: 'Manage account' }).click();
        await this.page.getByRole('button', { name: 'Update profile' }).click();
        await this.page.getByRole('button', { name: 'Remove' }).click();
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }
    async changeUsername(newUsername: string): Promise<void> {
        await this.page.getByRole('menuitem', { name: 'Manage account' }).click();
        await this.page.getByRole('heading', { name: 'Profile details' }).click();
        await this.page.getByRole('button', { name: 'Update username' }).click();
        await expect(this.page.getByRole('heading', { name: 'Update username' })).toBeVisible();
        await this.page.getByRole('textbox', { name: 'Username' }).fill(newUsername);
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async changeEmail(newEmail: string): Promise<void> {
        await expect(this.page.getByText('mgctest@test.comPrimaryUnverifiedAdd email addressEmail addresses')).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Add email address' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Add email address' }).click();
        await expect(this.page.getByRole('heading', { name: 'Add email address' })).toBeVisible();
        await expect(this.page.getByText('You\'ll need to verify this')).toBeVisible();
        await expect(this.page.getByRole('dialog')).toContainText('You\'ll need to verify this email address before it can be added to your account.');

        await this.page.getByRole('textbox', { name: 'Email address' }).fill(newEmail);
        await expect(this.page.getByRole('button', { name: 'Add' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Add' }).click();
    }

    async verifyAddedEmail(): Promise<void> {
        await expect(this.page.getByRole('heading', { name: 'Verification required' })).toBeVisible();
        await this.page.getByRole('textbox', { name: 'Password' }).fill('mgctest0812');
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }

    async enterVerificationCode(): Promise<void> {  
        await expect(this.page.getByText('Enter the verification code')).toBeVisible();
        await expect(this.page.locator('div').filter({ hasText: /^Didn't receive a code\? Resend \(11\)$/ })).toBeVisible();
        await this.page.getByRole('textbox', { name: 'Enter verification code' }).click();
        await this.page.getByRole('textbox', { name: 'Enter verification code' }).fill('660415');
    }

    async confirmEmailAdded(): Promise<void> {
        await expect(this.page.getByText('Success')).toBeVisible();
        await expect(this.page.locator('.cl-profileSection.cl-profileSection__emailAddresses')).toBeVisible();
        await this.page.screenshot({ path: 'add-email-success.png', fullPage: true });
    }

    async removeEmailOption(): Promise<void> {
        await expect(this.page.getByRole('button', { name: 'Open menu' }).first()).toBeVisible();
        await this.page.getByRole('button', { name: 'Open menu' }).first().click();
    }

    async accessRemoveEmailOption(): Promise<void> {
        await expect(this.page.getByRole('menuitem', { name: 'Remove email' })).toBeVisible();
        await this.page.getByRole('menuitem', { name: 'Remove email' }).click();
    }

    async removeEmailAddress(): Promise<void> {
        await expect(this.page.getByRole('heading', { name: 'Remove email address' })).toBeVisible();
        await expect(this.page.getByText('mariannegracececilio.talentpop@gmail.com will be removed from this account.')).toBeVisible();
        await expect(this.page.getByRole('dialog')).toContainText('mariannegracececilio.talentpop@gmail.com will be removed from this account.');
        await expect(this.page.getByRole('button', { name: 'Remove' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Remove' }).click();
    }

    async confirmRemoveEmail(): Promise<void> {
        // Password verification required to remove email address
        await expect(this.page.getByRole('heading', { name: 'Verification required' })).toBeVisible();
        await this.page.getByRole('textbox', { name: 'Password' }).fill('mgctest0812');
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }

    async errorRemovingOnlyVerifiedEmail() : Promise<void> {
        await expect(this.page.getByText('You are required to maintain')).toBeVisible();
        await expect(this.page.getByRole('dialog')).toContainText('You are required to maintain at least one email address in your account at all times');
        await this.page.getByRole('button', { name: 'Remove' }).click();        
    }

    async signOut() {
        await this.page.getByRole('menuitem', { name: 'Sign out' }).click();
        await expect(this.page).toHaveURL('http://localhost:5173/sign-in');
    }
}
