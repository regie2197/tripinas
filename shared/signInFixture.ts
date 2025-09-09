import { test as base } from '@playwright/test';
import { signInPage } from '../pages/sign-inPage';

type MyFixtures = {
  signInPage: signInPage;
};

export const test = base.extend<MyFixtures>({
  signInPage: async ({ page }, use) => {
    const signIn = new signInPage(page);
    await use(signIn);
  },
});

export { expect } from '@playwright/test';