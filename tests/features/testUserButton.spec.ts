import { test, expect } from '@playwright/test';
import { signInPage } from '../../pages/signInPage';

test.beforeEach (async ({ page }) => {
  const signIn = new signInPage(page);
  await signIn.navigateTo();
  await signIn.signIn(process.env.IDENTIFIER!, process.env.PASSWORD!);
})

test('Verify that user Button is visible', async ({ page }) => {
  await page.goto('http://localhost:5173/dashboard/');
  await expect(page.getByRole('button', { name: 'Open user button' })).toBeVisible();
});

