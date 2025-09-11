import { test as base, expect, request } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ProfilePage } from '../pages/ProfilePage';

// This file is used to set up the base test environment
// It will be used to create a custom test fixture that can be reused across tests
// For example, it can be used to create a login page fixture that can be reused across tests

type MyFixtures = {
    loginPage: LoginPage;
    registerPage: RegisterPage;
    profilePage: ProfilePage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    profilePage: async ({ page }, use) => {
        await use(new ProfilePage(page));
    },
    // Can add more fixtures here as needed
});

export { expect } from '@playwright/test';