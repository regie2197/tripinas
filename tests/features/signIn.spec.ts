import { test, expect } from '../../shared/signInFixture';

test.describe('Sign In Page Tests', () => {
  test('User can navigate to Sign Up page', async ({ signInPage, page }) => {
    await signInPage.navigateTo();
    await signInPage.goToSignUp();

    await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible;
    await expect(page.getByText('Welcome! Please fill in the details to get started.')).toBeVisible;
  });

  test('User can sign in with valid credentials', async ({ signInPage, page }) => {
    await signInPage.navigateTo();
    await signInPage.signIn('regietest', 'regitest');

    await expect(page).toHaveURL('http://localhost:5173/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard Home' })).toBeVisible();
  });

  test('User can request a new password', async ({ signInPage, page }) => {
    await signInPage.navigateTo();
    await signInPage.requestNewPassword('regietest');

    await expect(page.getByText('First, enter the code sent to your email address.')).toBeVisible();
  });
});
