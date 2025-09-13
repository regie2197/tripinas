import { attachScreenshot, generateRandomCode } from '../../shared/helpers';
import { test, expect } from '../../shared/base';
import users from '../../test-data/users.json';


const LOGIN_USERNAME_SUCCESS_SCREENSHOT = 'screenshots/login-username-success.png';
const LOGIN_EMAIL_SUCCESS_SCREENSHOT = 'screenshots/login-email-success.png';
const LOGIN_PASSWORD_INCORRECT_SCREENSHOT = 'screenshots/login-password-incorrect.png';
const LOGIN_ENTER_CODE_SCREENSHOT = 'screenshots/login-enter-code.png';
const LOGIN_TOO_MANY_REQUESTS_SCREENSHOT = 'screenshots/login-too-many-requests.png';

test.describe('Login Test Suite',
    { tag: ["@Regression", "@Login-Testing", "@Happypath"] },
    () => {

        test.beforeEach(async ({ loginPage }) => {
            for (const user of users) {
                await loginPage.goto();
            }
        });

        test('Login page Title Tripinas should be visible', async ({ loginPage }) => {
            await loginPage.isSignInHeadingVisible();
        });

        test('Login with valid Username credentials and confirm profile information on Dashboard',
            { tag: ['@Login-Testing', '@Happypath'] }, async ({ loginPage }, testInfo) => {

                //arrange
                await loginPage.loginUsernameCredential(users[1].username, users[1].password);
                //act
                await loginPage.clickLoginContinueButton();
                //assert
                await loginPage.page.waitForURL('http://localhost:5173/dashboard');
                await expect(loginPage.page.getByRole('heading', { name: 'Dashboard Home' })).toBeVisible();
                await attachScreenshot(loginPage.page, testInfo, LOGIN_USERNAME_SUCCESS_SCREENSHOT);
            });

        test('Login with valid email credentials and confirm profile information on Dashboard',
            { tag: ['@Login-Testing', '@Happypath'] }, async ({ loginPage }, testInfo) => {

                await loginPage.loginEmailCredential(users[1].email, users[1].password);
                await loginPage.clickLoginContinueButton();

                await loginPage.page.waitForURL('http://localhost:5173/dashboard');
                await expect(loginPage.page.getByRole('heading', { name: 'Dashboard Home' })).toBeVisible();
                await attachScreenshot(loginPage.page, testInfo, LOGIN_EMAIL_SUCCESS_SCREENSHOT);
            });

        test('Should not be able login with invalid password',
            { tag: ['@Login-Testing'] }, async ({ loginPage }, testInfo) => {

                await loginPage.isSignInHeadingVisible();
                await loginPage.loginWithWrongPassword(users[1].username, "wrongpassword");

                const errorMessage = loginPage.page.getByText(/incorrect/i, { exact: false });
                await expect(errorMessage).toBeVisible({ timeout: 10000 });
                await expect(errorMessage).toContainText('Password is incorrect. Try again, or use another method');
                await attachScreenshot(loginPage.page, testInfo, LOGIN_PASSWORD_INCORRECT_SCREENSHOT);
            });

        test.fixme('Forgot Password flow with incorrect code and too many attempts',
            { tag: ['@Regression', '@Login-Testing'] }, async ({ loginPage }, testInfo) => {
                let i = 5;
                console.log(i);; // Define the number of attempts
                for (let attempt = 1; attempt <= i; attempt++) {

                test.step(`Attempt ${attempt}: Login with incorrect password and proceed to Forgot Password flow`, async () => { });
                    // Start from login page for each attempt
                    await loginPage.goto();
                    await loginPage.isSignInHeadingVisible();
                    await loginPage.loginWithWrongPassword(users[1].username, "wrongpassword");
                    // Assert the incorrect password error message
                    await expect(loginPage.page.getByText(/incorrect/i, { exact: false })).toBeVisible({ timeout: 10000 });
                    await expect(loginPage.page.getByText(/incorrect/i, { exact: false })).toContainText('Password is incorrect. Try again, or use another method');
                    await attachScreenshot(loginPage.page, testInfo, LOGIN_PASSWORD_INCORRECT_SCREENSHOT);
                }
                test.step('Proceed to Forgot Password flow', async () => { });

                    await loginPage.requestPasswordReset();
                    await loginPage.assertPasswordResetPage('t**********@t***.com'); //masked email

                    // Simulate entering incorrect verification codes
                    const code = generateRandomCode();
                    await loginPage.verificationCodeInput.fill(code);
                    await loginPage.continueButton.click();

                    const errorMessage = loginPage.page.getByText(/incorrect code/i, { exact: false });
                    await expect(errorMessage).toBeVisible({ timeout: 10000 });
                    await expect(errorMessage).toContainText('Incorrect code');
                    await attachScreenshot(loginPage.page, testInfo, LOGIN_PASSWORD_INCORRECT_SCREENSHOT);


                test.step('Assert "Enter Code" error is visible and timer countdown is working', async () => {
                    const errorMessage = loginPage.page.getByText(/enter code/i, { exact: false });
                    await expect(errorMessage).toBeVisible({ timeout: 10000 });
                    await expect(errorMessage).toContainText('Enter code');

                    const timerLocator = loginPage.page.locator('.timer'); // Replace '.timer' with the actual selector for the timer element
                    const initialText = await timerLocator.textContent();
                    await loginPage.page.waitForTimeout(2000); // wait 2 seconds

                    const updatedText = await timerLocator.textContent();
                    expect(initialText).not.toBe(updatedText);
                    await attachScreenshot(loginPage.page, testInfo, LOGIN_ENTER_CODE_SCREENSHOT);
                });

                test.step('Trigger "Too many attempts" error after multiple incorrect code submissions', async () => {
                    // Input new code after timer
                    await loginPage.inputNewCode(generateRandomCode());

                    // Assert the "Too many attempts" error is visible, on the 5th attempt

                    let isLastAttempt = (i === 5);
                    const errorMessage = loginPage.page.getByText('Too many requests. Please try again in a bit.', { exact: false });
                    await expect(errorMessage).toBeVisible({ timeout: 10000 });
                    await expect(errorMessage).toContainText('Too many requests. Please try again in a bit.');
                    await attachScreenshot(loginPage.page, testInfo, LOGIN_TOO_MANY_REQUESTS_SCREENSHOT);
                });
            });
        // Note: @Regression: Test is flaky and needs stabilization with URL http://localhost:5173/dashboard (Error: waiting for navigation to "http://localhost:5173/dashboard" until "load")
        // A new error message is displayed after multiple failed attempts.
        // The timer countdown testing makes slow and created timeout issues, so it was only tested for 2 seconds for each attempt.
    }
);

// End of Login Test Suite