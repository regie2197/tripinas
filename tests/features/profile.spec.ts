import { test, expect } from '@shared/base';
import users from '../../test-data/users.json';
import baseUser from "../../.auth/baseUser.json";
import { faker } from '@faker-js/faker';

const randomNumber = faker.string.numeric(2);
const newFirstName = faker.person.firstName();
const newLastName = faker.person.lastName();
const newUsernameBase = faker.internet.username({ firstName: `${newFirstName}` }).slice(0, 8).toLowerCase().replace(/[^a-z0-9]/g, '');
const updatedUser = {
  ...baseUser,
  newFirstName: newFirstName,
  newLastName: newLastName,
  newEmail: faker.internet.email({ firstName: `${newFirstName}`, lastName: `${newLastName}` }).toLowerCase(),
  newUsername: `${newUsernameBase}_${randomNumber}`
};

test.describe.serial('Account Management', async () => {
    test.describe('Account Management - UI', {annotation: { type: 'UI', description: 'Tests the presence of UI elements on the Account modal' },
    }, () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('http://localhost:5173/');
        });

        test('Verify Account modal, Profile details and Security sections are visible when Managa Account buton is clicked', {tag: ['@UI', '@modal', '@visual']}, async ({ profilePage, page }) => {
            await test.step('Click the icon in the top-right corner', async () => {
                await profilePage.clickIcon();
            });
            await test.step('Click Manage Account button', async () => {
                await profilePage.clickManageAccount();
            });
            await test.step('Verify Account modal-Profile details section is visible', async () => {
                expect(page.locator('.cl-pageScrollBox')).toBeVisible();
                await expect(page.getByText('AccountManage your account info.ProfileSecuritySecured byDevelopment mode')).toBeVisible();
            });
            await test.step('Take snapshot of Profile details modal', async () => {
                await expect(page).toHaveScreenshot('Account-Profile-modal.png', {
                mask: [
                page.locator('.cl-profileSectionItem__profile'),
                page.locator('.cl-profileSectionItem__username'),
                page.locator('.cl-profileSectionItem__emailAddresses')
                ],
                maxDiffPixelRatio: 0.01
                });
            });
            await test.step('Click Security button', async () => {
                await profilePage.clickSecurity();
            });
            await test.step('Verify Account modal-Security section is visible', async () => {
                expect(page.locator('.cl-pageScrollBox')).toBeVisible();
                await expect(page.getByText('AccountManage your account info.ProfileSecuritySecured byDevelopment mode')).toBeVisible();
            });
            await test.step('Take snapshot of Security modal', async () => {
                await expect(page).toHaveScreenshot('Account-Security-modal.png', {
                    mask: [
                        page.locator('.cl-activeDevice__current')
                    ],
                    maxDiffPixelRatio: 0.01
                });
                await profilePage.clickExitModal();
            });
        });
        test('Verify delete account modal appears correctly', {tag: ['@UI', '@modal', '@visual']}, async ({page, profilePage}) => {
            await test.step('Click the icon in the top-right corner', async () => {
                await profilePage.clickIcon();
            });
            await test.step('Click Manage Account button', async () => {
                await profilePage.clickManageAccount();
            });
            await test.step('Click Security button', async () => {
                await profilePage.clickSecurity();
            });
            await test.step('Click Delete Account nutton', async () => {
                await profilePage.deleteButton.click();
            });
            await test.step('Take snapshot of delete account confirmation modal', async () => {
                await expect(page).toHaveScreenshot('Delete-Account-Confirmation-modal.png', {
                    mask: [
                        page.locator('.cl-activeDevice__current')
                    ],
                    maxDiffPixelRatio: 0.01
                });
                await profilePage.clickExitModal();
            });       
        });
    });

    test.describe.serial('Account Management - Update and Add', {
    annotation: { type: 'functional', description: 'Verify user can update and add profile information' },
    }, () => {

        test.beforeEach(async ({ page }) => {
            await page.goto('http://localhost:5173/');
        });

        test('Verify user can update first and last name', { tag: ['@update', '@HappyPath', '@name'] }, async ({ profilePage, registerPage, loginPage, page }) => {
            await test.step('Click the icon in the top-right corner', async () => {
                await page.goto('http://localhost:5173/');
                await profilePage.clickIcon();
            });
            await test.step('Click Manage Account button', async () => {
                await profilePage.clickManageAccount();
            });
            await test.step('Click Update profile button', async () => {
                await profilePage.clickUpdateProfile();
            });
            await test.step('Update first and last name', async () => {
                await registerPage.fillOptionalFields(updatedUser.newFirstName, updatedUser.newLastName);
                await profilePage.clickSaveButton();
            });
            await test.step('Verify that the Profile section is displayed and shows the updated Full Name', async () => {
                await profilePage.clickExitModal();
                await expect(loginPage.profileFullName).toContainText(updatedUser.newFirstName + ' ' + updatedUser.newLastName);
            });
        });
        test('Should update username successfully and allow login with updated username', { tag: ['@update', '@HappyPath', "@username"] }, async ({ profilePage, registerPage, loginPage }) => {
            await test.step('Click the icon in the top-right corner', async () => {
                await profilePage.clickIcon();
            });
            await test.step('Click Manage Account button', async () => {
                await profilePage.clickManageAccount();
            });
            await test.step('Click Update username button', async () => {
                await profilePage.clickUpdateUsername();
            });
            await test.step('Update username', async () => {
                await registerPage.usernameInput.fill(updatedUser.newUsername);
                await profilePage.clickSaveButton();
            });
            await test.step('Verify that the Profile section is displayed and shows the updated username', async () => {
                await profilePage.clickExitModal();
                await expect(loginPage.profileUsername).toContainText(updatedUser.newUsername);
            });
            await test.step('Logout', async () => {
                await profilePage.clickIcon();
                await profilePage.clickSignOut();
            });
            await test.step('Log in with the updated username', async () => {
                await loginPage.enterEmailOrUsername(updatedUser.newUsername);
                await loginPage.enterPassword(baseUser.password);
                await loginPage.verifyDashboard();
            })
        });
        test('Should be able to add email successfully with valid email', { tag: ['@add', '@HappyPath', '@email'] }, async ({ profilePage, registerPage, loginPage }) => {
            await test.step('Click the icon in the top-right corner', async () => {
                await profilePage.clickIcon();
            });
            await test.step('Click Manage Account button', async () => {
                await profilePage.clickManageAccount();
            });
            await test.step('Click Add email address button', async () => {
                await profilePage.clickAddEmailButton();
            });
            await test.step('Add email', async () => {
                await registerPage.emailInput.fill(updatedUser.newEmail);
                await profilePage.clickAddButton();
            });
            await test.step('Verify that the Profile section is displayed and shows the updated email', async () => {
                await profilePage.isAddedEmailVisibleInModal(updatedUser.newEmail);
                await profilePage.clickExitModal();
                await expect(loginPage.profileEmail).toContainText(updatedUser.newEmail);
            });
        });
        test('Should update password successfully and allow login with updated password', { tag: ['@update', '@HappyPath', '@password']}, async ({ profilePage, registerPage, loginPage }) => {
            await test.step('Click the icon in the top-right corner', async () => {
                await profilePage.clickIcon();
            });
            await test.step('Click Manage Account button', async () => {
                await profilePage.clickManageAccount();
            });
            await test.step('Go to Security tab and click Update password bbutton', async () => {
                await profilePage.clickSecurity();
                await profilePage.clickUpdatePassword();
            });
            await test.step('Fill new password and confirm password field with new password', async () => {
                await profilePage.fillPasswordFields('NewValidP@ss123', 'NewValidP@ss123');
                await profilePage.clickSaveButton();
                await profilePage.clickExitModal();
            });
            await test.step('Logout', async () => {
                await profilePage.clickIcon();
                await profilePage.clickSignOut();
            });
            await test.step('Log in with the new password', async () => {
                await loginPage.enterEmailOrUsername(updatedUser.email);
                await loginPage.enterPassword('NewValidP@ss123');
                await loginPage.verifyDashboard();
                await loginPage.verifyProfileDetails(updatedUser.newFirstName + ' ' + updatedUser.newLastName, updatedUser.newUsername, updatedUser.newEmail);
            });
        });
        // Unhappy path
        test('Verify validation message when updated first and last name exceeds the character limit', { tag: ['@validation', '@max-length', '@name'] }, async ({ registerPage, profilePage }) => {
            await test.step('Click the icon in the top-right corner', async () => {
                await profilePage.clickIcon();
            });
            await test.step('Click Manage Account button', async () => {
                await profilePage.clickManageAccount();
            });
            await test.step('Click Update profile button', async () => {
                await profilePage.clickUpdateProfile();
            });
            await test.step('Update first and last name with more that 256 characters', async () => {
                await registerPage.fillOptionalFields('a'.repeat(257), 'w'.repeat(257));
                await profilePage.clickSaveButton();
            });
            await test.step('Verify that a validation message is displayed', async () => {
                await registerPage.verifyFirstNameErrorMessage();
                await registerPage.verifyLastNameErrorMessage();
            });
            await test.step('Close modal', async () => {
                await profilePage.clickExitModal();
            });
        });
        test('Verify validation message when updated username has invalid format', { tag: ['@validation', '@update', "@username"] }, async ({ registerPage, profilePage }) => {
            await test.step('Click the icon in the top-right corner', async () => {
                await profilePage.clickIcon();
            });
            await test.step('Click Manage Account button', async () => {
                await profilePage.clickManageAccount();
            });
            await test.step('Click Update username button', async () => {
                await profilePage.clickUpdateUsername();
            });        
            await test.step('Update username with invalid characters', async () => {
                await registerPage.usernameInput.fill('John@123!');
                await profilePage.clickSaveButton();
            });
            await test.step('Verify that a validation message is displayed for username', async () => {
                await registerPage.verifyUsernameErrorMessage('Username can only contain letters, numbers and - or _');
                await profilePage.clickCancelButton();
                await profilePage.clickExitModal();
            });
        });
        test('Verify validation message when updated username exceeds the character limit', { tag: ['@update', '@validation', '@max-length', '@username'] }, async ({ registerPage, profilePage }) => {
            await test.step('Click the icon in the top-right corner', async () => {
                await profilePage.clickIcon();
            });
            await test.step('Click Manage Account button', async () => {
                await profilePage.clickManageAccount();
            });
            await test.step('Click Update username button', async () => {
                await profilePage.clickUpdateUsername();
            });
            await test.step('Update username with more than 64 characters', async () => {
                await registerPage.usernameInput.fill('a'.repeat(65));
                await profilePage.clickSaveButton();
            });
            await test.step('Verify that a validation error message is displayed for username', async () => {
                await registerPage.verifyUsernameErrorMessage('Your username must be between 4 and 64 characters long.');
                await profilePage.clickCancelButton();
                await profilePage.clickExitModal();
            });
        });
        test('Verify validation message when updated username is below minimum length', { tag: ['@update', '@validation', '@min-length', '@username'] }, async ({ registerPage, profilePage }) => {
            await test.step('Click the icon in the top-right corner', async () => {
                await profilePage.clickIcon();
            });
            await test.step('Click Manage Account button', async () => {
                await profilePage.clickManageAccount();
            });
            await test.step('Click Update username button', async () => {
                await profilePage.clickUpdateUsername();
            });
            await test.step('Update username with less than 4 characters', async () => {
                await registerPage.usernameInput.fill('a'.repeat(3));
                await profilePage.clickSaveButton();
            });
            await test.step('Verify that a validation error message is displayed for username', async () => {
                await registerPage.verifyUsernameErrorMessage('Your username must be between 4 and 64 characters long.');
                await profilePage.clickCancelButton();
                await profilePage.clickExitModal();
            });
        });
        test('Verify filling username field with blank space displays validation message', { tag: ['@update', '@validation', '@username'] }, async ({ registerPage, profilePage}) => {
            await test.step('Click the icon in the top-right corner', async () => {
                await profilePage.clickIcon();
            });
            await test.step('Click Manage Account button', async () => {
                await profilePage.clickManageAccount();
            });
            await test.step('Click Update username button', async () => {
                await profilePage.clickUpdateUsername();
            });
            await test.step('Fill username with spaces', async () => {
                await registerPage.usernameInput.fill('   ');
                await profilePage.clickSaveButton();
            });
            await test.step('Verify that a validation error message is displayed', async () => {
                await expect.soft(registerPage.errorMessageUsername).toBeVisible();
                await profilePage.clickCancelButton();
                await profilePage.clickExitModal();
            });
        });
        test('Verify validation message when email has multiple "@" sign', { tag: ['@validation', '@add', '@email'] }, async ({ registerPage, profilePage }) => {
            await test.step('Click the icon in the top-right corner', async () => {
                await profilePage.clickIcon();
            });
            await test.step('Click Manage Account button', async () => {
                await profilePage.clickManageAccount();
            });
            await test.step('Click Add email address button', async () => {
                await profilePage.clickAddEmailButton();
            });        
            await test.step('Add email with multiple "@" sign', async () => {
                await registerPage.emailInput.fill('user@@example.com');
                await profilePage.clickAddButton();
            });
            await test.step('Verify that a validation message is displayed for email', async () => {
                await registerPage.isEmailErrorVisible('Email address must be a valid email address.');
                await profilePage.clickCancelButton();
                await profilePage.clickExitModal();
            });
        });     
        test('Verify Add button remains disabled when email field is left blank or contains only spaces', {tag: ['@add', '@UnhappyPath', '@email']}, async ({ profilePage, registerPage }) => {
            await test.step('Click the icon in the top-right corner', async () => {
                await profilePage.clickIcon();
            });
            await test.step('Click Manage Account button', async () => {
                await profilePage.clickManageAccount();
            });
            await test.step('Click Add email address button', async () => {
                await profilePage.clickAddEmailButton();
            });
            await test.step('Fill email field with spaces', async () => {
                await registerPage.emailInput.fill('      ');
            });
            await test.step('Verify Add button is disabled', async () => {
                await profilePage.expectAddButtonDisabled();
                await profilePage.clickCancelButton();
                await profilePage.clickExitModal();
            });
        });
        test('Verify valication message is displayed if confirm password does not match new password', { tag: ['@update', '@UnhappyPath', '@password']}, async ({ profilePage, registerPage, loginPage }) => {
            await test.step('Click the icon in the top-right corner', async () => {
                await profilePage.clickIcon();
            });
            await test.step('Click Manage Account button', async () => {
                await profilePage.clickManageAccount();
            });
            await test.step('Go to Security tab and click Update password bbutton', async () => {
                await profilePage.clickSecurity();
                await profilePage.clickUpdatePassword();
            });
            await test.step('Fill new password and confirm password field with new password', async () => {
                await profilePage.fillPasswordFields('NewValidP@ss123', 'NewValidP@ss12345');
                await profilePage.expectSaveButtonDisabled();
            });
            await test.step('Verify that a validation error message is displayed for confirm password', async () => {
                await profilePage.confirmPasswordErrorMessage();
                await profilePage.clickExitModal();
            });
        });
        test('Verify valication message is displayed if new password is weak', { tag: ['@update', '@UnhappyPath', '@password']}, async ({ profilePage, registerPage, loginPage }) => {
            await test.step('Click the icon in the top-right corner', async () => {
                await profilePage.clickIcon();
            });
            await test.step('Click Manage Account button', async () => {
                await profilePage.clickManageAccount();
            });
            await test.step('Go to Security tab and click Update password bbutton', async () => {
                await profilePage.clickSecurity();
                await profilePage.clickUpdatePassword();
            });
            await test.step('Fill new password and confirm password field with weak password', async () => {
                await profilePage.fillPasswordFields('admin123', 'admin123');
                await profilePage.clickSaveButton();
            });
            await test.step('Verify that a validation error message is displayed for confirm password', async () => {
                await profilePage.newPasswordErrorMessage('This password has been found as part of a breach and can not be used, please try another password instead.');
                await profilePage.clickExitModal();
            });
        });
        test('Verify valication message is displayed if new password is below minimum length', { tag: ['@update', '@UnhappyPath', '@password']}, async ({ profilePage, registerPage, loginPage }) => {
            await test.step('Click the icon in the top-right corner', async () => {
                await profilePage.clickIcon();
            });
            await test.step('Click Manage Account button', async () => {
                await profilePage.clickManageAccount();
            });
            await test.step('Go to Security tab and click Update password bbutton', async () => {
                await profilePage.clickSecurity();
                await profilePage.clickUpdatePassword();
            });
            await test.step('Fill new password and confirm password field with less than 8 characters', async () => {
                await profilePage.fillPasswordFields('Short1', 'Short1');
                await profilePage.clickSaveButton();
            });
            await test.step('Verify that a validation error message is displayed for confirm password', async () => {
                await profilePage.newPasswordErrorMessage('Your password must contain 8 or more characters.');
                await profilePage.clickExitModal();
            });
        });
        // Test using already registered user data
        users.forEach(user => {
            test(`Verify that updating username fails when using an already registered username (${user.username})`, { tag: ['@update','@validation','@UnhappyPath', '@username'] }, async ({ registerPage, profilePage }) => {
                await test.step('Click the icon in the top-right corner', async () => {
                    await profilePage.clickIcon();
                });
                await test.step('Click Manage Account button', async () => {
                    await profilePage.clickManageAccount();
                });
                await test.step('Click Update profile button', async () => {
                    await profilePage.clickUpdateUsername();
                });
                await test.step('Update username with an already registered username', async () => {
                    await registerPage.usernameInput.fill(user.username);
                    await profilePage.clickSaveButton();
                });
                await test.step('Verify that a validation error message is displayed for username', async () => {
                    await registerPage.verifyUsernameErrorMessage('That username is taken. Please try another.');
                    await profilePage.clickCancelButton();
                    await profilePage.clickExitModal();
                });
            });
            test(`Verify that adding email displays validation message when adding an already registered email (${user.username})`, {tag: ['@validation', '@add', '@UnhappyPath', '@email']}, async ({ profilePage, registerPage }) => {
                await test.step('Click the icon in the top-right corner', async () => {
                    await profilePage.clickIcon();
                });
                await test.step('Click Manage Account button', async () => {
                    await profilePage.clickManageAccount();
                });
                await test.step('Click Add email address button', async () => {
                    await profilePage.clickAddEmailButton();
                });
                await test.step('Fill email field with an already registered email address', async () => {
                    await registerPage.emailInput.fill(user.email);
                    await profilePage.clickAddButton();
                });
                await test.step('Verify that a validation error message is displayed for email', async () => {
                    await registerPage.isEmailErrorVisible('That email address is taken. Please try another.');
                    await profilePage.clickCancelButton();
                    await profilePage.clickExitModal();
                });
            });
        });
    });
    test.describe.serial('Account Management - Delete', {
    annotation: { type: 'functional', description: 'Verify user can delete account' },
    }, () => {
        test('Should be able to delete account', {tag: ['@delete', '@HappyPath']}, async ({ loginPage, profilePage, page }) => {
            await test.step('Click the icon in the top-right corner', async () => {
                await page.goto('http://localhost:5173/');
                await profilePage.clickIcon();
            });
            await test.step('Click Manage Account button', async () => {
                await profilePage.clickManageAccount();
            });
            await test.step('Click Security button', async () => {
                await profilePage.clickSecurity();
            });
            await test.step('After Deleting account user should be redirected to login page', async () => {
                await profilePage.deleteAccount();
                await loginPage.verifyLoginPageUI();
            });
        });
        test('Should not be able to login to the deleted account', {tag: ['@delete', '@HappyPath']}, async ({ loginPage }) => {
            await test.step('Log in with the deleted account', async () => {
                await loginPage.navigateToLogin();
                await loginPage.enterEmailOrUsername(updatedUser.email);
                await loginPage.verifyEmailErrorMessage();
            });
        });
    });

    test.describe('Account Management - Issue', () => {
        test.beforeEach(async ({ loginPage, registerPage }) => {
            await loginPage.navigateToLogin();
            await loginPage.clickSignUpLink();
            await registerPage.fillOptionalFields(updatedUser.firstName, updatedUser.lastName);
            await registerPage.fillRequiredFields(updatedUser.email, updatedUser.username, updatedUser.password);
            await loginPage.verifyDashboard();
        });
        test.afterEach(async ({ profilePage }) => {
            await profilePage.clickIcon();
            await profilePage.clickManageAccount();
            await profilePage.clickSecurity();
            await profilePage.deleteAccount();
        });
        test('Verify validation message is displayed when user adds an email in an invalid format', {annotation: { type: 'Issue', description: 'No validation message is displayed for blank/empty spaces'}, tag: ['@add', '@UnhappyPath', '@email', '@issue']}, async ({ profilePage, registerPage }) => {
            await test.step('Click the icon in the top-right corner', async () => {
                await profilePage.clickIcon();
            });
            await test.step('Click Manage Account button', async () => {
                await profilePage.clickManageAccount();
            });
            await test.step('Click Add email address button', async () => {
                await profilePage.clickAddEmailButton();
            });
            await test.step('Add email', async () => {
                await registerPage.emailInput.fill('John');
                await profilePage.clickAddButton();
            });
            await test.step('Verify that a validation error message is displayed', async () => {
                await expect.soft(registerPage.errorMessageEmailSignUp).toBeVisible();
                await profilePage.clickCancelButton();
                await profilePage.clickExitModal();
            });
        });
    });
});