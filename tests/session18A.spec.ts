/* Activity: Apply data-driven testing in API

session18A.spec.ts
1. Using customers.json to excecute registration.spec.ts (I made a new test para hindi na Parabank)

session18B.spec.ts
2. Using faker-js to generate random user data for registration
   Remember to install faker with npm i @faker-js/faker
   To execute: reun server first
      cd backend
      node server.js
   Then run user-api-test

HW for weekdays: Study product-details-ve-spec.ts in automation exercise.com
*/

import { test, expect } from '@playwright/test';
import fs from 'fs';
const customers = JSON.parse(fs.readFileSync('test data/customers.json', 'utf-8'));

test.describe('Register on Demo QA with multiple customers', () => {
  for (const customer of customers) {
    test(`Register ${customer.firstName} ${customer.lastName}`, async ({ page }) => {
      await page.goto('https://demoqa.com/automation-practice-form');

      await page.getByRole('textbox', { name: 'First Name' }).fill(customer.firstName);
      await page.getByRole('textbox', { name: 'Last Name' }).fill(customer.lastName);
      await page.getByRole('textbox', { name: 'name@example.com' }).fill(customer.email);
      await page.getByText(customer.gender, { exact: true }).click();
      await page.getByRole('textbox', { name: 'Mobile Number' }).fill(customer.mobile);
      await page.getByRole('textbox', { name: 'Current Address' }).fill(customer.address);

      await page.locator('#state svg').click();
      await page.getByText(customer.state, { exact: true }).click();

      await page.locator('.css-tlfecz-indicatorContainer').click();
      await page.getByText(customer.city, { exact: true }).click();

      await page.getByRole('button', { name: 'Submit' }).click();

      await expect(page.getByText('Thanks for submitting the form')).toBeVisible();
    });
  }
});