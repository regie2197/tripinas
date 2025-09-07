import { test, expect } from '@playwright/test';
import users from '../../test-data/users.json';

test.describe('Login and Profile Verification', () => {

  users.forEach(user => {
    test(`should login as ${user.username} and verify profile`, async ({ page }) => {
      await page.goto('http://localhost:5173/sign-in');

      await page.getByRole('textbox', { name: 'Email address or username' }).fill(user.email);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill(user.password);
      await page.getByRole('button', { name: 'Continue' }).click();

      // Wait for navigation to dashboard
      await page.waitForURL('http://localhost:5173/');

      await expect(page.getByTestId('user-fullname')).toContainText(user.fullName);
      await expect(page.getByTestId('user-username')).toContainText(user.username);
      await expect(page.getByTestId('user-email')).toContainText(user.email);
    });
  });
});

/*import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/dashboard');
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByRole('textbox', { name: 'Email address or username' }).fill('regietest');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('regietest21');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Show password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
});*/