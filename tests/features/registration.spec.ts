import { test, expect } from '@shared/base';
import { generateTestUser } from '../../shared/fakerUtils';
import users from '../../test-data/users.json';

const passwordErrorMessage = "Your password must contain 8 or more characters.";
const passwordWeakErrorMessage = "This password has been found as part of a breach and can not be used, please try another password instead.";
const testUser = generateTestUser();
test.describe('Registration UI', {
    annotation: { type: 'UI', description: 'Tests the presence of UI elements on the registration page' } 
}, async () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateToLogin();
    });
    test('Verify all fields are present on the registration page', { tag: ['@UI'] }, async ({ loginPage, registerPage, page }) => {
        await test.step('Click "Sign up" link', async () => {
            await loginPage.clickSignUpLink();
        });
        await test.step('Verify fields are present on the registration page', async () => {
            await registerPage.verifySignUpPageUI();
            await expect(page).toHaveScreenshot('registration-UI.png');
        });
    });
    test('Verify optional and required fields on Sign Up page', { tag: ['@UI'] }, async ({ loginPage, registerPage }) => {
        await test.step('Click "Sign up" link', async () => {
            await loginPage.clickSignUpLink();
        });
        await test.step('Verify that First Name and Last Name fields are marked as optional', async () => {
            await registerPage.isFieldOptional();
        });
        await test.step('Verify that Email, Username, and Password are not marked as optional', async () => {
            await registerPage.isFieldNotOptional();
        });
        await test.step('Leave required fields blank and click "Continue" button', async () => {
            await registerPage.fillOptionalFields("", "");
            await registerPage.fillRequiredFields("", "", "");
        });
        await test.step('Verify user stays in registration page and fields show error message except optional fields', async () => {
            await registerPage.verifySignUpPageUI();
            await loginPage.verifyPasswordErrorMessage(passwordErrorMessage);
        });
    });
});
test.describe('Registration - Field Validation', {
  annotation: { type: 'validation', description: 'Verify input validation for username, names, and password fields' }
}, async () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateToLogin();
        await loginPage.clickSignUpLink();
    });

        test('Verify validation message when username exceeds the character limit', { tag: ['@validation', '@max-length'] }, async ({ registerPage, page }) => {
            await test.step('Fill username with more than 64 characters', async () => {
                await registerPage.usernameInput.fill('a'.repeat(65));
            });
            await test.step('Fill email and password with valid values', async () => {
                await registerPage.emailInput.fill(testUser.email);
                await registerPage.registerPasswordInput.fill(testUser.password);
                await registerPage.continueButton.click();
            });
            await test.step('Verify that a validation message "Your username must be between 4 and 64 characters long." is displayed', async () => {
                await registerPage.verifyUsernameErrorMessage('Your username must be between 4 and 64 characters long.');
                await expect(page).toHaveScreenshot('registration-error-styling.png', {
                    mask: [
                        page.locator('#emailAddress-field'),
                    ]
                });
            });
        });
        test('Verify validation message when username is below minimum length', { tag: ['@validation', '@min-length'] }, async ({ registerPage }) => {
            await test.step('Fill username with less than 4 characters', async () => {
                await registerPage.usernameInput.fill('abc');
            });
            await test.step('Fill email and password with valid values', async () => {
                await registerPage.emailInput.fill(testUser.email);
                await registerPage.registerPasswordInput.fill(testUser.password);
                await registerPage.continueButton.click();
            });
            await test.step('Verify that a validation message "Your username must be between 4 and 64 characters long." is displayed', async () => {
                await registerPage.verifyUsernameErrorMessage('Your username must be between 4 and 64 characters long.');
            });
        });
        test('Verify validation message when username has invalid format', { tag: ['@validation'] }, async ({ registerPage }) => {
            await test.step('Fill username with invalid characters', async () => {
                await registerPage.usernameInput.fill('John@123!');
            });
            await test.step('Fill email and password with valid values', async () => {
                await registerPage.emailInput.fill(testUser.email);
                await registerPage.registerPasswordInput.fill(testUser.password);
                await registerPage.continueButton.click();
            });
            await test.step('Verify that a validation message "Username can only contain letters, numbers and - or _" is displayed', async () => {
                await registerPage.verifyUsernameErrorMessage('Username can only contain letters, numbers and - or _');
            });
        });
        test('Verify validation message when email has multiple "@" sign', { tag: ['@validation'] }, async ({ registerPage }) => {
            await test.step('Fill email with multiple "@" sign', async () => {
                await registerPage.emailInput.fill('user@@example.com');
            });
            await test.step('Fill username and password with valid values', async () => {
                await registerPage.usernameInput.fill(testUser.username);
                await registerPage.registerPasswordInput.fill(testUser.password);
                await registerPage.continueButton.click();
            });
            await test.step('Verify that a validation message "Email address must be a valid email address." is displayed', async () => {
                await registerPage.isEmailErrorVisible('Email address must be a valid email address.');
            });
        });        
        test('Verify validation message when first name exceeds the character limit', { tag: ['@validation', '@max-length'] }, async ({ registerPage }) => {
            await test.step('Fill first name with more than 256 characters', async () => {
                await registerPage.firstNameInput.fill('a'.repeat(257));
            });
            await test.step('Fill email, username and password with valid values', async () => {
                await registerPage.fillRequiredFields(testUser.email, testUser.username, testUser.password);
            });
            await test.step('Verify that a validation message "First name should not exceed 256 characters." is displayed', async () => {
                await registerPage.verifyFirstNameErrorMessage();
            });
        });
        test('Verify validation message when last name exceeds the character limit', { tag: ['@validation', '@max-length'] }, async ({ registerPage }) => {
            await test.step('Fill last name with more than 256 characters', async () => {
                await registerPage.lastNameInput.fill('a'.repeat(257));
            });
            await test.step('Fill email, username and password with valid values', async () => {
                await registerPage.fillRequiredFields(testUser.email, testUser.username, testUser.password);
            });
            await test.step('Verify that a validation message "Last name should not exceed 256 characters." is displayed', async () => {
                await registerPage.verifyLastNameErrorMessage();
            });
        });
        test('Verify validation message when password is below minimum length', { tag: ['@validation', '@min-length'] }, async ({ registerPage, loginPage }) => {
            await test.step('Fill password with less than 8 characters', async () => {
                await registerPage.registerPasswordInput.fill('Short1');
            });
            await test.step('Fill email, username and first name with valid values', async () => {
                await registerPage.usernameInput.fill(testUser.username);
                await registerPage.emailInput.fill(testUser.email);
                await registerPage.continueButton.click();
            });
            await test.step('Verify that a validation message "Password must be at least 8 characters long." is displayed', async () => {
                await loginPage.verifyPasswordErrorMessage(passwordErrorMessage);
            });
        });
        test('Verify validation message when password is weak', { tag: ['@validation', '@weak-password'] }, async ({ registerPage, loginPage, page }) => {
            await test.step('Fill password with less than 8 characters', async () => {
                await registerPage.registerPasswordInput.fill('admin123');
            });
            await test.step('Fill email, username and first name with valid values', async () => {
                await registerPage.usernameInput.fill(testUser.username);
                await registerPage.emailInput.fill(testUser.email);
                await registerPage.continueButton.click();
            });
            await test.step('Verify that a validation message "Password must be at least 8 characters long." is displayed', async () => {
                await loginPage.verifyPasswordErrorMessage(passwordWeakErrorMessage);
                await page.screenshot({ path: 'test-screenshot/unsuccessful-registration.png', fullPage: true })        
            });
        });
        test('Verify filling required fields with blank spaces displays validation message', {annotation: { type: 'Issue', description: 'No validation message is displayed for blank spaces', }
        }, async ({ registerPage }) => {
            await test.step('Fill email and username with spaces', async () => {
                await registerPage.fillRequiredFields('   ', '   ', testUser.password);
            });
            await test.step('Verify that a validation error message is displayed', async () => {
                await expect.soft(registerPage.errorMessageUsername).toBeVisible();
                await expect.soft(registerPage.errorMessageEmailSignUp).toBeVisible();
            });
        });
    users.forEach(user => {
        test(`Verify that registration fails when using an already registered email (${user.username})`, { tag: '@UnhappyPath' }, async ({ registerPage }) => {
            await test.step('Fill email with an already registered email', async () => {
                await registerPage.emailInput.fill(user.email);
            });
            await test.step('Fill username and password with valid values', async () => {
                await registerPage.usernameInput.fill(testUser.username);
                await registerPage.registerPasswordInput.fill(testUser.password);
                await registerPage.continueButton.click();
            });
            await test.step('Verify that a validation error message is displayed for email', async () => {
                await registerPage.isEmailErrorVisible('That email address is taken. Please try another.');
            });
        });
        test(`Verify that registration fails when using an already registered username (${user.username})`, { tag: '@UnhappyPath' }, async ({ registerPage }) => {
            await test.step('Fill email with an already registered email', async () => {
                await registerPage.usernameInput.fill(user.username);
            });
            await test.step('Fill username and password with valid values', async () => {
                await registerPage.emailInput.fill(testUser.email);
                await registerPage.registerPasswordInput.fill(testUser.password);
                await registerPage.continueButton.click();
            });
            await test.step('Verify that a validation error message is displayed for username', async () => {
                await registerPage.verifyUsernameErrorMessage('That username is taken. Please try another.');
            });
        });
    });
});
test.describe('Registration - Successful flow', {
  annotation: { type: 'functional', description: 'Verify user can successfully register with valid data' },
}, async () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateToLogin();
        await loginPage.clickSignUpLink();
    });
    test.afterEach(async ({ profilePage }) => {
        await profilePage.clickIcon();
        await profilePage.clickManageAccount();
        await profilePage.clickSecurity();
        await profilePage.deleteAccount();
    });
    test('Verify that registration completes and redirects to dashboard', { tag: ['@HappyPath'] }, async ({ registerPage, loginPage, page }) => {
        await test.step('Fill in all fields', async () => {
            await registerPage.fillOptionalFields(testUser.firstName, testUser.lastName);
            await registerPage.fillRequiredFields(testUser.email, testUser.username, testUser.password);
        });
        await test.step('Verify user is redirected to dashboard after successful registration', async () => {
            await loginPage.verifyDashboard();
        });
        await test.step('Verify user profile displays correct information', async () => {
            await loginPage.verifyProfileDetails(testUser.firstName + ' ' + testUser.lastName, testUser.username, testUser.email);
            await page.screenshot({ path: 'test-screenshot/successful-registraion.png', fullPage: true })        
        });
    });
    test('Verify First Name accepts valid characters', { tag: ['@validation', '@HappyPath'] }, async ({ loginPage, registerPage }) => {
        await test.step('Fill First Name with alphabetic characters/names with hyphens/apostrophes', async () => {
            await registerPage.firstNameInput.fill('John-Doe');
        });
        await test.step('Fill email, username and password with valid values', async () => {
            await registerPage.fillRequiredFields(testUser.email, testUser.username, testUser.password);
        });
        await test.step('Verify no validation message is displayed for First Name field and it is submitted successfully', async () => {
            await loginPage.verifyDashboard();
            await loginPage.verifyProfileDetails(`John-Doe`, testUser.username, testUser.email);
        });
    });
    test('Verify First Name rejects invalid characters', {
    annotation: { type: 'Issue', description: 'User can successfully register with invalid characters'}, tag: ['@issue', '@UnhappyPath'] 
    }, async ({ registerPage }) => {
        await test.step('Fill First Name with numbers and special characters', async () => {
            await registerPage.firstNameInput.fill('J0hn@23');
        });
        await test.step('Fill email, username and password with valid values', async () => {
            await registerPage.fillRequiredFields(testUser.email, testUser.username, testUser.password);
        });
        await test.step('Verify that a validation message is displayed for First Name field', async () => {
            await registerPage.isFirstNameErrorVisible();
        });
    });
    test('Verify Last Name accepts valid characters', { tag: ['@validation', '@HappyPath'] }, async ({ loginPage, registerPage }) => {
        await test.step('Fill Last Name with alphabetic characters/names with hyphens/apostrophes', async () => {
            await registerPage.lastNameInput.fill('Doe-John');
        });
        await test.step('Fill email, username and password with valid values', async () => {
            await registerPage.fillRequiredFields(testUser.email, testUser.username, testUser.password);
        });
        await test.step('Verify account is created successfully', async () => {
            await loginPage.verifyDashboard();
            await loginPage.verifyProfileDetails(`Doe-John`, testUser.username, testUser.email);
        });
    });
    test('Verify Last Name rejects invalid characters', {
    annotation: { type: 'Issue', description: 'User can successfully register with invalid characters'}, tag: ['@issue', '@UnhappyPath']
    }, async ({ registerPage }) => {
        await test.step('Fill Last Name with numbers and special characters', async () => {
            await registerPage.lastNameInput.fill('D0e-J0hn@23');
        });
        await test.step('Fill email, username and password with valid values', async () => {
            await registerPage.fillRequiredFields(testUser.email, testUser.username, testUser.password);
        });
        await test.step('Verify that a validation message is displayed for Last Name field', async () => {
            await registerPage.isLastNameErrorVisible();
        });
    });
    test('Verify that leaving optional fields blank does not show an error', { tag: ['@input-handling', '@HappyPath'] }, async ({ registerPage, loginPage }) => {
        await test.step('Leave optional fields blank', async () => {
            await registerPage.fillOptionalFields('', '');
        });
        await test.step('Fill required fields with valid values', async () => {
            await registerPage.fillRequiredFields(testUser.email, testUser.username, testUser.password);
        });
        await test.step('Verify no validation message is displayed for optional fields', async () => {
            await expect.soft(registerPage.errorMessageFirstName).not.toBeVisible();
            await expect.soft(registerPage.errorMessageLastName).not.toBeVisible();
        });
        await test.step('Verify account is created successfully', async () => {
            await loginPage.verifyDashboard();
            await loginPage.verifyProfileDetails(``, testUser.username, testUser.email);
        });
    });
    test('Verify that leading and trailing spaces are trimmed from input fields', { tag: ['@input-handling', '@HappyPath'] }, async ({ registerPage, loginPage }) => {
        await test.step('Fill First Name with leading and trailing spaces', async () => {
            await registerPage.firstNameInput.fill('   John   ');
        });
        await test.step('Fill Last Name with leading and trailing spaces', async () => {
            await registerPage.lastNameInput.fill('   Doe   ');
        });
        await test.step('Fill email, username and password with valid values', async () => {
            await registerPage.fillRequiredFields('   test@example.com   ', '   testuser098   ', testUser.password);
        });
        await test.step('Verify submitted values are trimmed', async () => {
            await loginPage.verifyDashboard();
            await loginPage.verifyProfileDetails(`John`, 'testuser', 'test@example.com');
        });
    });
});