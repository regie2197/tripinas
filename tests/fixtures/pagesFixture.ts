// This file sets up "fixtures".
// A fixture is like a ready-to-use helper we can inject into tests.

import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';

// Define what extra fixtures we want
type MyFixtures = {
  loginPage: LoginPage;
  profilePage: ProfilePage;
};

// Extend the default test to include our fixtures
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage); // make it available to the test
  },

  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);
    await use(profilePage);
  },
});

// Re-export expect so we can use it in our tests
export { expect } from '@playwright/test';
