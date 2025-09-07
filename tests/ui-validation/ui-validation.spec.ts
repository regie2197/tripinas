import { test, expect } from '@playwright/test';

test('Verify that user is able to sign out and redirects to sign-in', async ({ page }) => {
  await page.goto('http://localhost:4173/sign-in');
  await page.getByRole('textbox', { name: 'Email address or username' }).fill('regietest21');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('regietest');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Open user button' }).click();
  await page.getByRole('menuitem', { name: 'Sign out' }).click();
  await page.waitForURL('http://localhost:4173/sign-in');
  await expect(page).toHaveURL('http://localhost:4173/sign-in');
//  await page.goto('http://localhost:4173/dashboard');
//   await expect(page.getByTestId('already-signed-out')).toBeVisible();
//   await expect(page.getByTestId('already-signed-out')).toHaveCSS('text-align', 'center');
//   await expect(page.getByTestId('already-signed-out')).toHaveCSS('margin-top', '32px'); 
});