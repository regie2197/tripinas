import { test, expect } from '@shared/base';
import users from '../../test-data/users.json';

const passwordErrorMessage = 'Password is incorrect. Try again, or use another method.';
const passwordEmptyErrorMessage = 'Enter password.';

test.describe('Login and Profile Verification', {
    annotation: { type: 'login', description: 'Tests login functionality with valid and invalid credentials' }
}, () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLogin();
  });
  users.forEach(user => {
    test(`Should login as ${user.username} and verify profile`, { tag: "@HappyPath" }, async ({ loginPage, page }) => {
      await test.step('Enter a valid email address or username', async () => {
        await loginPage.enterEmailOrUsername(user.email);
      });
      await test.step('Enter a valid password', async () => {
        await loginPage.enterPassword(user.password);
      });
      await test.step('Verify successful login and redirection to dashboard', async () => {
        await loginPage.verifyDashboard();
        await expect.soft(page).toHaveScreenshot('dashboard-UI.png', { maxDiffPixelRatio: 0.01 });
      });
      await test.step('Verify that the Profile section is displayed and shows the correct: Full Name, Username, Email address', async () => {
        await loginPage.verifyProfileDetails(user.fullName, user.username, user.email);
        await page.screenshot({ path: 'test-screenshot/successful-login.png', fullPage: true })
      });
    });
    test(`Should login using valid email and password (${user.username})`, { tag: "@HappyPath" }, async ({ loginPage }) => {
      await test.step('Enter a valid email address', async () => {
        await loginPage.enterEmailOrUsername(user.email);
      });
      await test.step('Enter a valid password', async () => {
        await loginPage.enterPassword(user.password);
      });
      await test.step('Verify successful login and redirection to dashboard', async () => {
        await loginPage.verifyDashboard();
      });
    });
    test(`Should login using valid username and password (${user.username})`, { tag: "@HappyPath" }, async ({ loginPage }) => {
      await test.step('Enter a valid username', async () => {
        await loginPage.enterEmailOrUsername(user.username);
      });
      await test.step('Enter a valid password', async () => {
        await loginPage.enterPassword(user.password);
      });
      await test.step('Verify successful login and redirection to dashboard', async () => {
        await loginPage.verifyDashboard();
      });
    });
    test(`Verify that user is not able to login with invalid username/email address (${user.username})`, { tag: "@UnHappyPath" }, async ({ loginPage }) => {
      await test.step('Enter an invalid email address or username', async () => {
        await loginPage.enterEmailOrUsername('invalid@example.com');
      });
      await test.step('Verify error "Couldn\'t find your account" is visible', async () => {
        await loginPage.verifyEmailErrorMessage();
      });
    });
    test(`Verify that user is not able to login with valid email address and invalid password (${user.username})`, { tag: "@UnHappyPath" }, async ({ loginPage, page }) => {
      await test.step('Enter a valid email address', async () => {
        await loginPage.enterEmailOrUsername(user.email);
      });
      await test.step('Enter an invalid password', async () => {
        await loginPage.enterPassword('invalidpassword');
      });
      await test.step('Verify error "Password is incorrect. Try again, or use another method." is visible', async () => {
        await loginPage.verifyPasswordErrorMessage(passwordErrorMessage);
        await page.screenshot({ path: 'test-screenshot/unsuccessful-login.png', fullPage: true })
      });
    });
    test(`Verify that validation message gets displayed when password field is left blank (${user.username})`, { tag: "@UnHappyPath" }, async ({ loginPage }) => {
      await test.step('Enter a valid email address', async () => {
        await loginPage.enterEmailOrUsername(user.email);
      });
      await test.step('Leave password field blank', async () => {
        await loginPage.enterPassword('');
      });
      await test.step('Verify error "Enter password" is visible', async () => {
        await loginPage.verifyPasswordErrorMessage(passwordEmptyErrorMessage);
      });
    });
  });
});
test.describe('Case Sensitivity Behavior', { 
  annotation: { type: 'validation', description: 'Tests case sensitivity rules for login fields' } 
}, async () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLogin();
  });
  users.forEach(user => {
    test(`Verify username is case-insensitive (${user.username})`, { tag: ["@Validation", "@Case-Sensitivity"] }, async ({ loginPage }) => {
      await test.step('Enter a valid username with different casing', async () => {
        await loginPage.enterEmailOrUsername(user.username.toUpperCase());
      });
      await test.step('Enter a valid password', async () => {
        await loginPage.enterPassword(user.password);
      });
      await test.step('Verify successful login and redirection to dashboard', async () => {
        await loginPage.verifyDashboard();
      });
      await test.step('Verify that the Profile section is displayed and shows the correct: Full Name, Username, Email address', async () => {
        await loginPage.verifyProfileDetails(user.fullName, user.username, user.email);
      });
    });
    test(`Verify email address is case-insensitive (${user.username})`, { tag: ["@Validation", "@Case-Sensitivity"] }, async ({ loginPage }) => {
      await test.step('Enter a valid email address with different casing', async () => {
        await loginPage.enterEmailOrUsername(user.email.toUpperCase());
      });
      await test.step('Enter a valid password', async () => {
        await loginPage.enterPassword(user.password);
      });
      await test.step('Verify successful login and redirection to dashboard', async () => {
        await loginPage.verifyDashboard();
      });
      await test.step('Verify that the Profile section is displayed and shows the correct: Full Name, Username, Email address', async () => {
        await loginPage.verifyProfileDetails(user.fullName, user.username, user.email);
      });
    });
    test(`Verify password is case-sensitive (${user.username})`, { tag: ["@Validation", "@Case-Sensitivity"] }, async ({ loginPage }) => {
      await test.step('Enter a valid email address/username with different casing', async () => {
        await loginPage.enterEmailOrUsername(user.email.toUpperCase());
      });
      await test.step('Enter a valid password with different casing', async () => {
        await loginPage.enterPassword(user.password.toUpperCase());
      });
      await test.step('Verify error "Password is incorrect. Try again, or use another method." is visible', async () => {
        await loginPage.verifyPasswordErrorMessage(passwordErrorMessage);
      });
    });
  });
});
test.describe('Login UI and Navigation', {
    annotation: { type: 'navigation', description: 'Tests login screen UI elements and navigation links' }
}, async () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLogin();
  });
  users.forEach(user => {
    test(`Verify login screen UI and navigation flow (${user.username})`, {tag: ["@Navigation", "@UI"]}, async ({ loginPage, page }) =>{
      await test.step('Verify login page UI elements are visible', async () => {
        await loginPage.verifyLoginPageUI();
        await expect(page).toHaveScreenshot('login-UI.png');
      });
      await test.step('Enter a valid email address/username', async () => {
        await loginPage.enterEmailOrUsername(user.email);
      });
      await test.step('Verify enter password page UI elements are visible', async () => {     
        await loginPage.verify2ndLoginPageUI();
        await expect(page).toHaveScreenshot('login-UI2.png', {
          mask: [
            page.locator('.cl-internal-1389xgv')
          ]
        });
      });
      await test.step('Enter a valid password', async () => {
        await loginPage.enterPassword(user.password);
      });
      await test.step('Verify successful login and redirection to dashboard', async () => {
        await loginPage.verifyDashboard();
      });
    });
    test(`Verify "Forgot Password?" link navigation and UI (${user.username})`, { tag: ["@Navigation", "@UI"] }, async ({ loginPage, page }) => {
      await test.step('Enter a valid email address/username', async () => {
        await loginPage.enterEmailOrUsername(user.email);
      });
      await test.step('Click "Forgot Password?" link', async () => {
        await loginPage.clickForgotPassword();
      });
      await test.step('Verify user is navigated to Forgot Password page and UI elements are visible', async () => {
        await loginPage.verifyForgotPasswordPageUI();
      });
      await test.step('Click "Reset your password" button', async () => {
        await loginPage.clickResetPassword();
      });
      await test.step('Verify user is navigated to Reset Password page and UI elements are visible', async () => {
        await loginPage.verifyResetPasswordPageUI();
        await expect(page).toHaveScreenshot('ForgotPassword-UI.png', {
          mask: [
            page.locator('.cl-internal-1389xgv')
          ]
        });
      });
    });
    test(`Verify "Back" link navigation from Forgot Password page (${user.username})`, { tag: ["@Navigation"] }, async ({ loginPage }) => {
      await test.step('Enter a valid email address/username', async () => {
        await loginPage.enterEmailOrUsername(user.email);
      });
      await test.step('Click "Forgot Password?" link', async () => {
        await loginPage.clickForgotPassword();
      });
      await test.step('Click "Back" link', async () => {
        await loginPage.clickBackLink();
      });
      await test.step('Verify user is navigated back to Login page and UI elements are visible', async () => {
        await loginPage.verify2ndLoginPageUI();
      });
    });
    test(`Verify "Get Help" link navigation from Login page (${user.username})`, { tag: ["@Navigation", "@UI"] }, async ({ loginPage, page }) => {
      await test.step('Enter a valid email address/username', async () => {
        await loginPage.enterEmailOrUsername(user.email);
      });
      await test.step('Click "Get Help" link', async () => {
        await loginPage.clickGetHelpLink();
      });
      await test.step('Verify user is navigated to Get Help page and UI elements are visible', async () => {
        await loginPage.verifyGetHelpPageUI();
        await expect(page).toHaveScreenshot('GetHelp-UI.png');
      });
    });
    test(`Verify "Back" link navigation from Get help page (${user.username})`, { tag: ["@Navigation"] }, async ({ loginPage }) => {
      await test.step('Enter a valid email address/username', async () => {
        await loginPage.enterEmailOrUsername(user.email);
      });
      await test.step('Click "Get help" link', async () => {
        await loginPage.clickGetHelpLink();
      });
      await test.step('Click "Back" link', async () => {
        await loginPage.clickBackLink();
      });
      await test.step('Verify user is navigated back to Login page and UI elements are visible', async () => {
        await loginPage.verify2ndLoginPageUI();
      });
    });
    test(`Verify navigation from Login page to Registration page (${user.username})`, { tag: ["@Navigation"] }, async ({ loginPage, registerPage }) => {
      await test.step('Click "Sign Up" link', async () => {
        await loginPage.clickSignUpLink();
      });
      await test.step('Verify user is navigated to Registration page and UI elements are visible', async () => {
        await registerPage.verifySignUpPageUI();
      });
    });
    test(`Verify navigation from Registration page back to Login page (${user.username})`, { tag: ["@Navigation"] }, async ({ loginPage, registerPage }) => {
      await test.step('Click "Sign Up" link', async () => {
        await loginPage.clickSignUpLink();
      });
      await test.step('Verify user is navigated to Registration page and UI elements are visible', async () => {
        await registerPage.verifySignUpPageUI();
      });
      await test.step('Click "Sign in" link', async () => {
        await registerPage.clickSignInLink();
      });
      await test.step('Verify user is navigated back to Login page and UI elements are visible', async () => {
        await loginPage.verifyLoginPageUI();
      });
    });
  });
});
test.describe.serial('Session Handling', {annotation: { type: 'session', description: 'Tests session behavior when navigating back or logging out' }
}, async () => {
  users.forEach(user => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.navigateToLogin();
    });
    test(`Verify that once logged in, clicking back button doesn\'t logout user (${user.username})`, async ({ loginPage }) => {
      await test.step('Login to account', async () => {
        await loginPage.enterEmailOrUsername(user.email);
        await loginPage.enterPassword(user.password);
        await loginPage.verifyDashboard();
      });
      await test.step('Click the browser back button', async () => {
        await loginPage.browserBackButton();
      });
      await test.step('Verify user is still on the dashboard', async () => {
        await loginPage.verifyDashboard();
      });
    });
    test(`Should be able to logout account (${user.username})`, async ({ loginPage, profilePage }) => {
      await test.step('Login to account', async () => {
        await loginPage.enterEmailOrUsername(user.email);
        await loginPage.enterPassword(user.password);
        await loginPage.verifyDashboard();
      });
      await test.step('Click the icon in the top-right corner', async () => {
        await profilePage.clickIcon();
      });
      await test.step('Click "Sign out" button', async () => {
        await profilePage.clickSignOut();
      });
      await test.step('Verify user is redirected to login page', async () => {
        await loginPage.verifyLoginPageUI();
      });
    });
    test(`Verify that once logged out, clicking back button doesn\'t login user (${user.username})`, async ({ loginPage, profilePage }) => {
      await test.step('Login to account', async () => {
        await loginPage.enterEmailOrUsername(user.email);
        await loginPage.enterPassword(user.password);
        await loginPage.verifyDashboard();
      });
      await test.step('Click the icon in the top-right corner', async () => {
        await profilePage.clickIcon();
      });
      await test.step('Click "Sign out" button', async () => {
        await profilePage.clickSignOut();
      });
      await test.step('Verify user is redirected to login page', async () => {
        await loginPage.verifyLoginPageUI();
      });
      await test.step('Click the browser back button', async () => {
        await loginPage.browserBackButton();
      });
      await test.step('Verify user is still on the login page', async () => {
        await loginPage.verifySignedOut();
      });
    });
  });
});