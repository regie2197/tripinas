// This file defines a "ProfilePage" class.
// It helps us check that the profile page shows the correct info.

import { Page, expect } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Check that the profile info on the page matches the user data
  async expectProfileToMatch(user: { fullName: string; username: string; email: string }) {
    await expect(this.page.getByTestId('user-fullname')).toContainText(user.fullName);
    await expect(this.page.getByTestId('user-username')).toContainText(user.username);
    await expect(this.page.getByTestId('user-email')).toContainText(user.email);
  }
}
