import { test as base, request } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { LoginPage } from '../pages/LoginPage';


type MyFixtures = {
  registrationPage: RegistrationPage;
  loginPage: LoginPage;

};

export const test = base.extend<MyFixtures>({
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
  loginPage: async ({page}, use) => {
    await use(new LoginPage(page));
    },
});

export { expect } from '@playwright/test';