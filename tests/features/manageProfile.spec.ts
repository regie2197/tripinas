import { test, expect } from '@playwright/test';
import { ManageProfile } from '../../pages/manageProfile';
import { faker } from '@faker-js/faker';
import { signInPage } from '../../pages/signInPage';
import { takeScreenshot } from '../../shared/screenshotUtils';

test.describe('Manage Profile Tests', () => {
  let manageProfile: ManageProfile;
  let fullName: string;
  let newFirstName: string;
  let newLastName: string;

test.beforeAll(() => {
  newFirstName = faker.person.firstName();
  newLastName = faker.person.lastName();
  fullName = `${newFirstName} ${newLastName}`;
});

  test.beforeEach(async ({ page }) => {
    const signIn = new signInPage(page);
    manageProfile = new ManageProfile(page);

    await signIn.navigateTo();
    await signIn.signIn(process.env.IDENTIFIER!, process.env.PASSWORD!);

    await manageProfile.openManageProfile();
  });

  test('Verify that user can update First & Last names with valid details', { tag: ['@Happy Path'] }, async ( {page} ) => {
    await manageProfile.updateProfileName(`${newFirstName}`, `${newLastName}`);

    await page.goto('http://localhost:5173/dashboard');
    await expect(page.getByTestId('user-fullname')).toHaveText(`Name: ${fullName}`);
  });

  test('Verify that user can cancel profile change', { tag: ['@Happy Path'] }, async () => {
    await manageProfile.cancelProfileUpdate();
    await expect(manageProfile.profileDetailsHeading).toBeVisible();
  });

  test.skip('Verify that user can update username with valid value', { tag: ['@Happy Path'] }, async ({ page }) => {
    const newUsername = faker.internet.userName();
    await manageProfile.updateUsername(newUsername);

    await expect(page.getByRole('heading', { name: 'Verification required' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Password' }).fill('regietest');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(manageProfile.usernameText).toHaveText(newUsername);
  });

  test('Verify that email verification will be triggered when user wants to confirm email', { tag: ['@Happy Path'] }, async () => {
    await manageProfile.verifyEmail();
    await expect(manageProfile.verificationCodeText).toBeVisible();
    await expect(manageProfile.verifyButton).toBeVisible();
  });

  test('Verify that user can sign out', { tag: ['@Happy Path'] }, async ( {page} ) => {
    await manageProfile.closeModal();
    await manageProfile.openUserButton.click();
    await page.getByRole('menuitem', { name: 'Sign out' }).click();
    await expect(manageProfile.page).toHaveURL('http://localhost:5173/sign-in');
  });

test('Verify that user can upload a new profile photo', async ({ page }, testInfo) => {
  const manageProfile = new ManageProfile(page);
  const testImagePath = 'test-data/profile-pic.png';

  try {
    await manageProfile.updateProfileButton.click();
    await manageProfile.uploadInput.setInputFiles(testImagePath);
    await page.getByRole('button', { name: 'Upload' }).click();
    await page.getByRole('button', { name: 'Cancel' }).click();

    // Force failure to test screenshots
    await expect(page.getByRole('dialog').getByRole('img', { name: `WRONG NAME` }))
      .toBeVisible();

  } catch (err) {
    console.log(`❌ Test "${testInfo.title}" failed → taking screenshot`);
    await takeScreenshot(page, testInfo.title);
    throw err;
  }
});

  test.skip('Verify that invalid username format will be rejected', { tag: ['@Unhappy Path'] }, async () => {
    await manageProfile.updateUsername('!@#invalid');
    await expect(manageProfile.usernameTextbox).toHaveAttribute('aria-invalid', 'true');
  });
});