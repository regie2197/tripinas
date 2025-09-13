import { test, expect } from '../../shared/base';
import { attachScreenshot } from '../../shared/helpers';

const STORAGE_STATE = 'auth/user.json';

const DASHBOARD_DELETE_EMAIL_ATTEMPT_SCREENSHOT = 'screenshots/delete-email-attempt.png';

test.describe("Dashboard E2E Workflow",
  { tag: ['@Regression', '@Dashboard-Testing'] }, async () => {
  
    test('Should be able to update Profile Name', async ({ dashboardPage } , testInfo) => {
      //Arrange
      await dashboardPage.goto();
      await dashboardPage.openUserMenu();
      await dashboardPage.openManageAccount();
      //Act
      await dashboardPage.selectUpdateProfile();
      //Assert
      await dashboardPage.updateUsersProfileInformation('MarianneG', 'Cecilio');
      await attachScreenshot(dashboardPage.page, testInfo, 'screenshots/update-profile-name.png');
    });
    // '@Regression', save button interface is not separated with Cancel button.
    // await this.page.screenshot({ path: 'update-profile-ui-defect.png', fullPage: true });

    test('Should able to Upload and remove Profile Photo', async ({ dashboardPage }, ) => {
      await dashboardPage.goto();
      await dashboardPage.openUserMenu();
      await dashboardPage.openManageAccount();
      await dashboardPage.selectUpdateProfile();
      //upload photo
      await dashboardPage.uploadProfilePhoto('tests/assets/profile-photo.png');

      //remove photo
      await dashboardPage.removeProfilePhoto();
    });

    test('Username change password requirement workflow', async ({ dashboardPage, page, users }) => {
      await dashboardPage.goto();
      // First change: should require password
      await dashboardPage.openUserMenu();
      await dashboardPage.openManageAccount();
      await dashboardPage.selectUpdateUsername();
      await dashboardPage.changeUsername('new_username_1');
      await expect(page.getByRole('heading', { name: 'Verification required' })).toBeVisible();
      await page.getByRole('textbox', { name: 'Password' }).fill(users[0].password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await expect(page.getByText('new_username_1')).toBeVisible();

      // Second change: should NOT require password
      await dashboardPage.changeUsername('new_username_2');
      await expect(page.getByText('new_username_2')).toBeVisible();

      // Navigate away and back to settings
      await page.goto('http://localhost:5173/dashboard');
      await dashboardPage.openUserMenu();
      await dashboardPage.openManageAccount();
      await dashboardPage.selectUpdateUsername();

      // Third change: should require password again
      await dashboardPage.changeUsername('new_username_3');
      await expect(page.getByRole('heading', { name: 'Verification required' })).toBeVisible();
      await page.getByRole('textbox', { name: 'Password' }).fill(users[0].password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await expect(page.getByText('new_username_3')).toBeVisible();
    });
    // Note: Username change requires password verification. Subsequent changes within the same session do not require password until navigating away and back to settings.

    test('Should able to add email address with valid verification code', async ({ dashboardPage }) => {
      await dashboardPage.goto();
      await dashboardPage.openUserMenu();
      await dashboardPage.openManageAccount();

      await dashboardPage.changeEmail('mariannegracececilio.talentpop@gmail.com');
      await dashboardPage.verifyAddedEmail();
      await dashboardPage.enterVerificationCode();
      await dashboardPage.confirmEmailAdded();
    });
    // Note: Verification code is hardcoded as "660415" for testing purposes.
    // Note: Email addition requires password verification.

    test('Delete added email address', async ({ dashboardPage }, testInfo) => {
      await dashboardPage.goto();
      await dashboardPage.openUserMenu();
      await dashboardPage.openManageAccount();
      
      // Delete the added email address
      await dashboardPage.removeEmailOption();
      await dashboardPage.accessRemoveEmailOption();
      await dashboardPage.removeEmailAddress();
      await dashboardPage.confirmRemoveEmail();
      await dashboardPage.errorRemovingOnlyVerifiedEmail();
      await attachScreenshot(dashboardPage.page, testInfo, DASHBOARD_DELETE_EMAIL_ATTEMPT_SCREENSHOT);
      // Note: Cannot delete the email address as it is the only verified email linked to the account.
    });

    test('Delete unverified email address', async ({ dashboardPage }) => {
      await dashboardPage.goto();
      await dashboardPage.openUserMenu();
      await dashboardPage.openManageAccount();
   
      // Add another email address but do not verify it
      await dashboardPage.changeEmail('unverified_email@example.com');

      // Delete the unverified email address
      await dashboardPage.removeEmailOption();
      await dashboardPage.accessRemoveEmailOption();
      await dashboardPage.removeEmailAddress();
      await dashboardPage.confirmRemoveEmail();
      // Note: Successfully deleted the unverified email address.
    });
    test('Should be able to change password, and sign out other devices with old password, then save', async ({ dashboardPage, users }) => {
      await dashboardPage.goto();
      await dashboardPage.openUserMenu();
      await dashboardPage.openManageAccount();
      await dashboardPage.selectSecurityUpdate();
      await dashboardPage.changePassword(users[0].password, 'mgctest_test12');
      await dashboardPage.confirmPasswordChange('mgctest_test12');

      // Sign out other devices with old password and save
      await dashboardPage.signOutOtherDevices();
    });

    test('Should be able to singout all active devices', async ({ dashboardPage, loginPage, page }) => {
      await dashboardPage.goto();
      await dashboardPage.openUserMenu();
      await dashboardPage.openManageAccount();
      await dashboardPage.selectSecurityUpdate();

      await dashboardPage.signOutActiveDevices();
    });

    test('Delete account button is visible and able to cancel account deletion', async ({ dashboardPage }) => {
      await dashboardPage.goto();
      await dashboardPage.openUserMenu();
      await dashboardPage.openManageAccount();
      await dashboardPage.selectSecurityUpdate();
      
      await dashboardPage.deleteAccount();
      await dashboardPage.initiateAccountDeletion();
      await dashboardPage.cancelAccountDeletion();
    });
    
    test('Should be able to sign out', async ({ dashboardPage, loginPage }) => {
      await dashboardPage.goto();
      await dashboardPage.openUserMenu();
      await dashboardPage.page.getByRole('menuitem', { name: 'Sign out' }).click();
      await loginPage.isSignInHeadingVisible();
      await expect(dashboardPage.page).toHaveURL('http://localhost:5173/sign-in');
    });
  });
   // Note: @Regression: Test is flaky and needs stabilization with URL http://localhost:5173/dashboard (Error: waiting for navigation to "http://localhost:5173/dashboard" until "load")