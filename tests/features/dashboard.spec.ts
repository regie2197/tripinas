import { test, expect } from '../../shared/base';
import { takeScreenshot } from '../../shared/utils';
import users from '../../test-data/users.json';

const DASHBOARD_HOME_SCREENSHOT = 'screenshots/dashboard-home.png';
const DASHBOARD_USERS_PAGE_SCREENSHOT = 'screenshots/dashboard-users-page.png';
const DASHBOARD_SETTINGS_PAGE_SCREENSHOT = 'screenshots/dashboard-settings-page.png';


test.describe('Dashboard Navigation Tests',
  { tag: ['@Regression', '@Dashboard-Testing'] }, () => {

    test.beforeEach(async ({ loginPage }) => {
      await loginPage.goto();
      await loginPage.loginUsernameCredential(users[0].username, users[0].password);
      await loginPage.verifyLoginSuccess();
    });

    test(' Verify user profile information on dashboard', async ({ dashboardPage }, testInfo) => {
      await dashboardPage.expectUserProfileInfo();
      await dashboardPage.expectAdminWelcome();
      await takeScreenshot(dashboardPage.page, testInfo, DASHBOARD_HOME_SCREENSHOT);
    });

    test(' Navigate through Admin Menu Users and Settings', async ({ dashboardPage }) => {
      await dashboardPage.expectAdminMenu();

    });

    test('Navigate to Users Panel and validate empty state',
      { tag: ['@Regression', '@Dashboard-Testing', '@Settings', '@UI', '@EmptyState'] },
      async ({ dashboardPage }, testInfo) => {
        await dashboardPage.expectUsersPanel();
        await expect(dashboardPage.page.locator('html')).toMatchAriaSnapshot(`- document`);
        await takeScreenshot(dashboardPage.page, testInfo, DASHBOARD_USERS_PAGE_SCREENSHOT);
        //Note: The users page is empty.
      });

    test('Navigate to Settings Panel and validate empty state',
      { tag: ['@Regression', '@Dashboard-Testing', '@Settings', '@UI', '@EmptyState'] },
      async ({ dashboardPage }, testInfo) => {
        await dashboardPage.expectSettingsPanel();
        await expect(dashboardPage.page.locator('html')).toMatchAriaSnapshot(`- document`);
        await takeScreenshot(dashboardPage.page, testInfo, DASHBOARD_SETTINGS_PAGE_SCREENSHOT);
        //Note: The settings page is empty.
      });

    test('Validates Users Menu navigation, profile, and security information', async ({ dashboardPage }) => {
      await dashboardPage.openUserMenu();
      await dashboardPage.navigateOpenUserMenu();

      await dashboardPage.openManageAccount();

      // Verify profile account Information
      await dashboardPage.usersProfileDetails();

      //Verify profile security Information
      await dashboardPage.usersSecuritydetails();
    });
    test('Should be able to sign out', async ({ dashboardPage, loginPage }) => {
      await dashboardPage.openUserMenu();
      await dashboardPage.page.getByRole('menuitem', { name: 'Sign out' }).click();
      await loginPage.isSignInHeadingVisible();
      await expect(dashboardPage.page).toHaveURL('http://localhost:5173/sign-in');
    });
  });