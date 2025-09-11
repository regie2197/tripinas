import { test, expect } from '../../shared/signInFixture';
import { SignUpPage } from '../../pages/signUpPage';
import { faker } from '@faker-js/faker';
import { generateInvalidEmail } from '../../shared/invalidEmailMaker'

test.describe('Sign Up Tests', () => {
  let signUpPage: SignUpPage;

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    await signUpPage.navigateTo();
  });

  test('Verify that user can navigate to Sign Up page', { tag: ['@Happy Path'] }, async ({ page }) => {
    await signUpPage.navigateTo();

    await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();
    await expect(page.getByText('Welcome! Please fill in the details to get started.')).toBeVisible();
  });

  test('Verify that user can register with valid details', { tag: ['@HappyPath', '@Smoke', '@faker-js'] }, async () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    // Generate username with only letters, numbers, "-" and "_"
    let rawUsername = faker.internet.userName({ firstName, lastName }).toLowerCase();
    let username = rawUsername.replace(/[^a-z0-9-_]/g, '_');

    const email = faker.internet.email({ firstName, lastName }).toLowerCase();
    const password = faker.internet.password({ length: 12, memorable: true }) + '!'; // strong password

    await signUpPage.enterAccountDetails(firstName, lastName, username, email, password);
    await signUpPage.submitAccountDetails();

    await expect(signUpPage.page).toHaveURL('http://localhost:5173/dashboard');
  });

  test('Verify that user can navigate back to Sign In page', { tag: ['@HappyPath', '@Smoke'] }, async () => {
    await signUpPage.goToSignInInstead();
  });

  test('Verify that user cannot register with missing username, wrong email, or weak password', { tag: ['@UnhappyPath', '@faker-js'] }, async () => {
  // 1. Missing username
  await signUpPage.enterAccountDetails(
    '', // no first name for brevity
    '', // no last name for brevity
    '', // no username  for brevity
    faker.internet.email(),
    faker.internet.password({ length: 10 })
  );
  await signUpPage.submitAccountDetails();

  const usernameInput = signUpPage.page.locator('input[name="username"]');
  await expect(usernameInput).toHaveJSProperty('validationMessage', 'Please fill out this field.', );


  // 2. Wrong email format
  await signUpPage.enterAccountDetails(
    '', // no first name
    '', // no last name
    faker.internet.userName().replace(/[^a-z0-9-_]/gi, '_'),
    generateInvalidEmail(), // invalid email
    faker.internet.password({ length: 8 })
  );
  await signUpPage.submitAccountDetails();
  await signUpPage.submitAccountDetails();

  const emailInput = signUpPage.page.getByRole('textbox', { name: 'Email address' })
  await expect(emailInput).toHaveJSProperty('validationMessage', 'Please match the requested format.');


  // 3. Weak password
  await signUpPage.enterAccountDetails(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.internet.userName().replace(/[^a-z0-9-_]/gi, '_'),
    faker.internet.email(),
    '1234' // too weak
  );
  await signUpPage.submitAccountDetails();

  await expect(signUpPage.page.getByText(/Your password must contain 8 or more characters/i)).toBeVisible();
});
});