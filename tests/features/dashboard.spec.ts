import { test, expect } from '@playwright/test';
import { Dashboard } from '../../pages/dashboard';

test.describe('Dashboard Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    const dashboard = new Dashboard(page);
    await dashboard.navigateTo();
  });

  test('Navigate to Dashboard and verify that all headings and contents are visible', {tag: ['@Happy Path']}, async ({ page }) => {
    const dashboard = new Dashboard(page);

    await expect(dashboard.headingAdmin).toBeVisible();
    await expect(dashboard.headingDashboard).toBeVisible();
    await expect(dashboard.headingWelcome).toBeVisible();
    await expect(dashboard.headingProfile).toBeVisible();
    await expect(dashboard.idUserFullName).toBeVisible();
    await expect(dashboard.idUsername).toBeVisible();
    await expect(dashboard.idEmail).toBeVisible;
  });

  test('Verify that Manage Profile navigation works', {tag: ['@Happy Path']}, async ({ page }) => {
    const dashboard = new Dashboard(page);

    await dashboard.goToManageProfile();
    await expect(dashboard.headingProfileDetails).toBeVisible();
  });

  test('Verify that Manage Security navigation works', {tag: ['@Happy Path']}, async ({ page }) => {
    const dashboard = new Dashboard(page);

    await dashboard.goToManageSecurity();
    await expect(dashboard.headingSecurity).toBeVisible();
  });

  test('Verify that user can sign out', {tag: ['@Happy Path']}, async ({ page }) => {
    const dashboard = new Dashboard(page);

    await dashboard.signOut();
    await expect(page).toHaveURL('http://localhost:5173/sign-in');
  });

  // Unhappy Path Tests
  test('Verify that wrong dashboard URL shows error', {tag: ['@Unhappy Path']}, async ({ page }) => {
    await page.goto('http://localhost:5173/dashboards'); // typo on purpose
    await expect(page.getByText('Page not found')).toBeVisible(); // adjust based on your app
  });

  test('Verify that Profile heading is not visible without navigation', {tag: ['@Unhappy Path']}, async ({ page }) => {
    const dashboard = new Dashboard(page);

    // try to check headingProfileDetails without going through Manage Profile
    await expect(dashboard.headingProfileDetails).not.toBeVisible();
  });

  test('Verify that Security heading not visible without navigation', {tag: ['@Unhappy Path']}, async ({ page }) => {
    const dashboard = new Dashboard(page);

    // try to check headingSecurity without clicking Security
    await expect(dashboard.headingSecurity).not.toBeVisible();
  });

  test('Verify that user cannot sign out if menu is not opened', {tag: ['@Unhappy Path']}, async ({ page }) => {
    const dashboard = new Dashboard(page);

    // directly expect sign out button (not opened yet)
    await expect(dashboard.menuItemSignOut).not.toBeVisible();
  });

});
