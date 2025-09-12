import { test, expect } from '@playwright/test';
import { ManageSecurity } from '../../pages/manageSecurity';
import { signInPage } from '../../pages/signInPage';

test.describe('Manage Security Tests', () => {
  test.beforeEach(async ({ page }) => {
    const signIn = new signInPage(page);
    await signIn.navigateTo();
    await signIn.signIn(process.env.IDENTIFIER!, process.env.PASSWORD!);
  });

  test('Verify that user can navigate to Security section', async ({ page }) => {
    const security = new ManageSecurity(page);

    await security.navigateToSecurity();
    await expect(security.securityHeading).toBeVisible();
  });

  test.skip('Verify that user can update password successfully and sign out of other devices', async ({ page }) => {
    const security = new ManageSecurity(page);

    await security.navigateToUpdatePassword();
    await security.enterNewPassword('ValidPassword123!', 'ValidPassword123!');
    await security.clickSavePassword();

    // Example: check for success toast/notification
    await expect(page.getByText('Password updated successfully')).toBeVisible();
  });

  test.skip('Verify that user can update password without signing out of other devices', async ({ page }) => {
    const security = new ManageSecurity(page);

    await security.navigateToUpdatePassword();
    await security.uncheckSignoutCheckbox();
    await security.enterNewPassword('ValidPassword123!', 'ValidPassword123!');
    await security.clickSavePassword();

    await expect(page.getByText('Password updated successfully')).toBeVisible();
  });

  test('Verify that user can cancel password update', async ({ page }) => {
    const security = new ManageSecurity(page);

    await security.navigateToUpdatePassword();
    await security.cancelUpdatePassword();

    await expect(security.updatePasswordHeading).not.toBeVisible();
  });

  test('Verify that user can close update password', async ({ page }) => {
    const security = new ManageSecurity(page);

    await security.navigateToUpdatePassword();
    await security.closeModal();

    await expect(security.updatePasswordHeading).not.toBeVisible();
  });

  test('Verify that user cannot update password with mismatched confirmation', async ({ page }) => {
    const security = new ManageSecurity(page);

    await security.navigateToUpdatePassword();
    await security.enterNewPassword('ValidPassword123!', 'WrongPassword456!');

    await expect(page.getByText('Passwords don\'t match.')).toBeVisible();
  });

  test('Verify that user cannot update password with empty fields', async ({ page }) => {
    const security = new ManageSecurity(page);

    await security.navigateToUpdatePassword();
    await security.enterNewPassword('', '');

    await expect(page.getByText('Your password must contain 8')).toBeVisible();
  });

  test('Verify that user cannot update password with weak password', async ({ page }) => {
    const security = new ManageSecurity(page);

    await security.navigateToUpdatePassword();
    await security.enterNewPassword('123', '123');

    await expect(page.getByText('Your password must contain 8')).toBeVisible();
  });

});