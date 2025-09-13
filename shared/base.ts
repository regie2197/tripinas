import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { DashboardPage } from '../pages/DashboardPage';
import fs from 'fs';
import path from 'path';


type MyFixtures = {
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
  dashboardPage: DashboardPage;
  users: Array<{ username: string; email: string; password: string; fullName: string }>;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  users: async ({}, use) => {
    const usersFilePath = path.resolve(__dirname, '../test-data/users.json');
    const usersData = fs.readFileSync(usersFilePath, 'utf-8');
    const users = JSON.parse(usersData);
    await use(users);
  },
});

export { expect } from '@playwright/test';