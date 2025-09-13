import { test } from '../../shared/base';
import { attachScreenshot } from '../../shared/helpers';

const REGISTRATION_SUCCESS_SCREENSHOT = 'screenshots/registration-success.png';
const REGISTRATION_USERNAMETAKEN_SCREENSHOT = 'screenshots/registration-username-taken.png';
const REGISTRATION_EMAILTAKEN_SCREENSHOT = 'screenshots/registration-email-taken.png';
const REGISTRATION_PASSWORD_SCREENSHOT = 'screenshots/registration-password-error.png';
const REGISTRATION_SEQUENTIALPASSWORD_SCREENSHOT = 'screenshots/registration-sequential-password-error.png';
const REGISTRATION_REPEATINGDIGITSPASSWORD_SCREENSHOT = 'screenshots/registration-repeatingdigits-password-error.png';
const REGISTRATION_COMMONPASSWORD_SCREENSHOT = 'screenshots/registration-common-password-error.png';

test.describe('Registration Test Suite',
  { tag: ["@Regression", "@Registration-Testing", "@Happypath"] }, () => {

    test.beforeEach(async ({ registrationPage }) => {
      await registrationPage.gotoSignUp();
    });
    // UI Elements go to Sign in url first before you can Sign up

    test('Should be able to register with valid credentials', async ({ registrationPage }, testInfo) => {
      //arrange
      await registrationPage.fillRegistrationForm('Marianne', 'Cecilio', 'usernametest_0812', 'username0812@test.com', 'mgctest0812');
      //act
      await registrationPage.clickContinue();
      //assert
      await registrationPage.verifyRegistrationSuccess();
      await attachScreenshot(registrationPage.page, testInfo, REGISTRATION_SUCCESS_SCREENSHOT);
    });

    test('Should not be able to register with username already taken', async ({ registrationPage }, testInfo) => {
      await registrationPage.UsernameTaken('Marianne', 'Cecilio', 'usernametest_0812', 'username03@test.com', 'mgctest0812');
      await registrationPage.clickContinue();

      await registrationPage.expectUsernameTakenError('That username is taken. Please try another.');
      await attachScreenshot(registrationPage.page, testInfo, REGISTRATION_USERNAMETAKEN_SCREENSHOT);
    });

    test('Should not be able to register with email already taken', async ({ registrationPage }, testInfo) => {
      await registrationPage.EmailTaken('Marianne', 'Cecilio', 'usernametest_03', 'username0812@test.com', 'mgctest0812');
      await registrationPage.clickContinue();

      await registrationPage.expectEmailTakenError('That email address is taken. Please try another.');
      await attachScreenshot(registrationPage.page, testInfo, REGISTRATION_EMAILTAKEN_SCREENSHOT);
    });

    test('Should not be able to register with password less than 8 character password', async ({ registrationPage }, testInfo) => {
      await registrationPage.registerWithShortPassword('Marianne', 'Cecilio', 'usernametest_04', 'username04@test.com', 'mgctest');
      await registrationPage.clickContinue();

      await registrationPage.expectShortenedPasswordError('Your password must contain 8 or more characters.');
      await attachScreenshot(registrationPage.page, testInfo, REGISTRATION_PASSWORD_SCREENSHOT);
    });

    test('Should not be able to register and displays error for sequential password', async ({ registrationPage }, testInfo) => {
      await registrationPage.fillRegistrationForm('Marianne', 'Cecilio', 'usernametest_04', 'username04@test.com', '12345678');
      await registrationPage.clickContinue();

      await registrationPage.expectSequentialPasswordError('This password has been found as part of a breach and can not be used, please try another password instead.');
      await attachScreenshot(registrationPage.page, testInfo, REGISTRATION_SEQUENTIALPASSWORD_SCREENSHOT);
    });
    test('Should not be able to register and displays error for repeating digits password', async ({ registrationPage }, testInfo) => {
      await registrationPage.registerWithRepeatingDigitsPassword('Marianne', 'Cecilio', 'usernametest_04', 'username04@test.com', '11223344');
      await registrationPage.clickContinue();

      await registrationPage.expectRepeatingDigitsPasswordError('This password has been found as part of a breach and can not be used, please try another password instead.');
      await attachScreenshot(registrationPage.page, testInfo, REGISTRATION_REPEATINGDIGITSPASSWORD_SCREENSHOT);
    });

    test('Should not be able to register and displays error for common password', async ({ registrationPage }, testInfo) => {
      await registrationPage.registerWithCommonPassword('Marianne', 'Cecilio', 'usernametest_04', 'username04@test.com', 'password123');
      await registrationPage.clickContinue();

      await registrationPage.expectCommonPasswordError('This password has been found as part of a breach and can not be used, please try another password instead.');
      await attachScreenshot(registrationPage.page, testInfo, REGISTRATION_COMMONPASSWORD_SCREENSHOT);
    });
  });