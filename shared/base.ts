import { test as base, request } from '@playwright/test';
import { LoginPage } from '@pages/signInPage';
import { RegistrationPage } from '@pages/RegistrationPage';



type MyFixtures = {
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
});

export { expect } from '@playwright/test';