import { test, expect } from '@playwright/test';
import users from '../../test-data/users.json';
import { faker } from '@faker-js/faker';


test.describe('Verify Registration', {
  annotation: {
    type: 'MODULE',
    description: 'Functional testing for registration'
  },
  tag: '@registration'
},
    () => {


  // Test for valid credentials
  test('Verify account registration success with valid data',
    { tag: ["@Registration", "@SmokeTesting" , "@HappyPath"] },


    async ({ page }) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password();


    await page.goto('/sign-up');
    await page.fill('#username-field', firstName);
    await page.fill('#lastName-field', lastName);
    await page.fill('#emailAddress-field', email);
    await page.fill('#password-field', password);
    await page.getByRole('button', { name: 'Continue' }).click();


    await expect(page.locator('h1')).toContainText('Dashboard Home');
    await page.screenshot({ path: `screenshots/reg-success-${Date.now()}.png` });


  });




  // Test for special characters in password
  test('Verify account registration accepts password with special characters',
    { tag: ["@Registration", "@SmokeTesting" , "@SpecialCharacters"]  },


    async ({ page }) => {
    const username = faker.internet.username();
    const email = faker.internet.email();
    const specialPassword = faker.internet.password({
      length: 16,
      memorable: false,
      pattern: /[!@#$%^&*()_+]/,
    });


    await page.goto('/sign-up');
    await page.fill('#username-field', username);
    await page.fill('#emailAddress-field', email);
    await page.fill('#password-field', specialPassword);
   
    await page.getByRole('button', { name: 'Continue' }).click();


   
    await expect(page.locator('h1')).toContainText('Dashboard Home');    
    await page.screenshot({ path: `screenshots/reg-special-char-pass-${Date.now()}.png` });
  });


//   Test for invalid email format


  test('Verify account registration fails for invalid email format',
    { tag: ["@Registration", "@NegativeTesting" , "@Email"] },


    async ({ page }) => {
    const username = faker.internet.username();
    const email = 'invalid-email-format';
    const password = faker.internet.password();


    await page.goto('/sign-up');
    await page.fill('#username-field', username);
    await page.fill('#emailAddress-field', email);
    await page.fill('#password-field', password);
    await page.getByRole('button', { name: 'Continue' }).click();


    // Assert that the registration page is still visible
    await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();    
    await expect(page.locator('#emailAddress-field')).toBeVisible();
    await page.screenshot({ path: `screenshots/reg-invalid-email-${Date.now()}.png` });
  });




  // Test for duplicate username
  test('Verify account registration fails with duplicate username',
    { tag: ["@Registration", "@FunctionalTesting" , "@Username"] },
   
    async ({ page }) => {
    const user = users[0];
   
    await page.goto('/sign-up');
    await page.fill('#username-field', user.username);
    await page.fill('#emailAddress-field', `new_${Date.now()}@example.com`);
    await page.fill('#password-field', 'UniquePass123!');
    await page.getByRole('button', { name: 'Continue' }).click();


    await expect(page.getByText('That username is taken. Please try another.')).toBeVisible();
    await page.screenshot({ path: `screenshots/reg-duplicate-username-${Date.now()}.png` });
  });




  // Test for duplicate email
  test('Verify account registration fails for duplicate email',
    { tag: ["@Registration", "@FunctionalTesting" , "@Email"] },


    async ({ page }) => {
    const user = users[0];
   
    await page.goto('/sign-up');
    await page.fill('#username-field', `newUser_${Date.now()}`);
    await page.fill('#emailAddress-field', user.email);
    await page.fill('#password-field', 'AnotherPass123!');
    await page.getByRole('button', { name: 'Continue' }).click();


    await expect(page.locator('text=That email address is taken')).toBeVisible();
    await page.screenshot({ path: `screenshots/reg-duplicate-email-${Date.now()}.png` });
  });


});
