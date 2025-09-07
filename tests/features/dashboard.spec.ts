import { test, expect } from '@playwright/test';
import { Dashboard } from '../pages/dashboard';

test('verify dashboard elements', async ({ page }) => {
  const dashboard = new Dashboard(page);

  await dashboard.goto();

  await expect(dashboard.dashboardHomeHeading).toBeVisible();
  await expect(dashboard.profileHeading).toBeVisible();
  await expect(dashboard.userFullname).toBeVisible();
  await expect(dashboard.userUsername).toBeVisible();
  await expect(dashboard.userEmail).toBeVisible();
});
