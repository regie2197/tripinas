import { test, expect } from '../../shared/signInFixture';

test.describe('Sign In Page Tests', () => {
  test('User can navigate to Sign Up page', {tag: ['@Happy Path']}, async ({ signInPage, page }) => {
    await signInPage.navigateTo();
    await signInPage.goToSignUp();

    await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible;
    await expect(page.getByText('Welcome! Please fill in the details to get started.')).toBeVisible;
  });

  test('User can sign in with valid credentials', {tag: ['@Happy Path']}, async ({ signInPage, page }) => {
    await signInPage.navigateTo();
    await signInPage.signIn('regietest', 'regietest');

    await expect(page).toHaveURL('http://localhost:5173/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard Home' })).toBeVisible();
  });

  test('User can request a new password', {tag: ['@Happy Path']}, async ({ signInPage, page }) => {
    await signInPage.navigateTo();
    await signInPage.requestNewPassword('regietest');

    await expect(page.getByText('First, enter the code sent to')).toBeVisible();
  });

    test('Correct error arises when user uses wrong identifier', {tag: ['@Unhappy Path']}, async ({ signInPage, page }) => {
    await signInPage.navigateTo();
    await signInPage.enterIdentifier('ganda');

    await expect(page.getByText('Couldn\'t find your account.')).toBeVisible();
  });

    test('Correct error arises when user uses wrong password', {tag: ['@Unhappy Path']}, async ({ signInPage, page }) => {
    await signInPage.navigateTo();
    await signInPage.enterPassword('regietest','cypress')

    await expect(page.getByText('Password is incorrect. Try')).toBeVisible();
  });
});
