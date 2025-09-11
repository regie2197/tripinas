import { test, expect } from '../../shared/signInFixture';

test.describe('Sign In Page Tests', () => {

  test('Verify that user can sign in with valid credentials', {tag: ['@Happy Path']}, async ({ signInPage, page }) => {
    await signInPage.navigateTo();
    await signInPage.signIn('regietest', 'regietest');

    await expect(page).toHaveURL('http://localhost:5173/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard Home' })).toBeVisible();
  });

  test('Verify that user will be asked for OTP they request for a new password', {tag: ['@Happy Path']}, async ({ signInPage, page }) => {
    await signInPage.navigateTo();
    await signInPage.requestNewPassword('regietest');

    await expect(page.getByText('First, enter the code sent to')).toBeVisible();
  });

    test('Verify that correct error arises when user uses wrong identifier', {tag: ['@Unhappy Path']}, async ({ signInPage, page }) => {
    await signInPage.navigateTo();
    await signInPage.enterIdentifier('ganda');

    await expect(page.getByText('Couldn\'t find your account.')).toBeVisible();
  });

    test('Verify that correct error arises when user uses wrong password', {tag: ['@Unhappy Path']}, async ({ signInPage, page }) => {
    await signInPage.navigateTo();
    await signInPage.enterPassword('regietest','cypress')

    await expect(page.getByText('Password is incorrect. Try')).toBeVisible();
  });
});
