import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Boundary Testing for Registration', {
  annotation: {
    type: 'MODULE',
    description: 'Boundary testing for registration'
  },
  tag: '@registration'
}, 
    () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/sign-in');
    });

  // Test for long username
  test('Verify account registration fails for long username (256 chars)', 
    { tag: ["@Registration", "@BoundaryTesting" , "@Username"] },

    async ({ page }) => {
    const longUsername = faker.string.alphanumeric(256);
    const email = faker.internet.email();
    const password = faker.internet.password();

    await page.goto('/sign-up');
    await page.fill('#username-field', longUsername);
    await page.fill('#emailAddress-field', email);
    await page.fill('#password-field', password);
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByText('Your username must be between 4 and 64 characters long.')).toBeVisible();
    await page.screenshot({ path: `screenshots/reg-long-username-${Date.now()}.png` });
  });

  // Test for short username
  test('Verify account registration fails with too short username (3 char)', 
    { tag: ["@Registration", "@BoundaryTesting" , "@Username"] },
    async ({ page }) => {
    const shortUsername = faker.string.alphanumeric(3);
    const email = faker.internet.email();
    const password = faker.internet.password();

    await page.goto('/sign-up');
    await page.fill('#username-field', shortUsername);
    await page.fill('#emailAddress-field', email);
    await page.fill('#password-field', password);
   
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByText('Your username must be between 4 and 64 characters long.')).toBeVisible();
    await page.screenshot({ path: `screenshots/reg-short-username-${Date.now()}.png` });
  });

  // Test for long password
  test('Verify account registration fails for extremely long password (72 chars)', 
    { tag: ["@Registration", "@BoundaryTesting" , "@Password"] },

    async ({ page }) => {
    const username = faker.internet.username();
    const email = faker.internet.email();
    const longPassword = faker.internet.password({ length: 72 });

    await page.goto('/sign-up');
    await page.fill('#username-field', username);
    await page.fill('#emailAddress-field', email);
    await page.fill('#password-field', longPassword);
    
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByText('Your password must contain less than 72 characters.')).toBeVisible();
    await page.screenshot({ path: `screenshots/reg-long-password-${Date.now()}.png` });

  });

  // Test for short password
  test('Verify account registration fails for extremely short password (7 char)', 
    { tag: ["@Registration", "@BoundaryTesting" , "@Password"] },

    async ({ page }) => {
    const username = faker.internet.username();
    const email = faker.internet.email();
    const shortPassword = faker.internet.password({ length: 7 });

    await page.goto('/sign-up');
    await page.fill('#username-field', username);
    await page.fill('#emailAddress-field', email);
    await page.fill('#password-field', shortPassword);
    
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.locator('#error-password')).toContainText('Your password must contain 8 or more characters.');
    await expect(page.locator('#error-password')).toBeVisible();
    await page.screenshot({ path: `screenshots/reg-short-password-${Date.now()}.png` });
  });


  // Test for overly long email
  test('Verify account registration fails for overly long email', 
    { tag: ["@Registration", "@BoundaryTesting" , "@Email"] },
    async ({ page }) => {
    const longEmail = faker.string.alphanumeric(100) + '@example.com';
    const username = faker.internet.username();
    const password = faker.internet.password();

    await page.goto('/sign-up');
    await page.fill('#username-field', username);
    await page.fill('#emailAddress-field', longEmail);
    await page.fill('#password-field', password);
  
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.locator('#error-emailAddress')).toContainText('Email address must be a valid email address.');
    await page.screenshot({ path: `screenshots/reg-long-email-${Date.now()}.png` });
  });

  // Test for empty password on sign-up
test('Verify account registration fails for empty password', 
  { tag: ["@Registration", "@NegativeTesting" , "@Password"] }, 

  async ({ page }) => {
  const username = faker.internet.username();
  const email = faker.internet.email();

  await page.goto('/sign-up');
  await page.fill('#username-field', username);
  await page.fill('#emailAddress-field', email);
  await page.fill('#password-field', ''); // Empty password

  await page.getByRole('button', { name: 'Continue' }).click();
  // Assert that the registration page is still visible
  await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();
  // Optionally, check that the password field is still empty
  await expect(page.locator('#password-field')).toBeEmpty();

  await page.screenshot({ path: `screenshots/reg-empty-password-${Date.now()}.png` });
});


// Test for empty username on sign-up

test('Verify account registration fails for empty username', 
  { tag: ["@Registration", "@NegativeTesting" , "@Username"] }, 
  
  async ({ page }) => {
  const email = faker.internet.email();
  const password = faker.internet.password({ length: 8 }); 

  await page.goto('/sign-up');
  await page.fill('#username-field', ''); // Empty username
  await page.fill('#emailAddress-field', email);
  await page.fill('#password-field', password);
  await page.getByRole('button', { name: 'Continue' }).click();


  // Assert that the page is still on sign-up (e.g., heading is still visible)
  await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();
  // Optionally, check that the username field is still empty
  await expect(page.locator('#username-field')).toBeEmpty();
  await page.screenshot({ path: `screenshots/reg-empty-username-${Date.now()}.png` });

  });

});