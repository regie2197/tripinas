import { Page, Locator } from '@playwright/test';

export class Dashboard {
  public page: Page;
  public signInLink: Locator;
  public dashboardHomeHeading: Locator;
  public profileHeading: Locator;
  public userFullname: Locator;
  public userUsername: Locator;
  public userEmail: Locator;
  public welcomeHeading: Locator;
  public manageUsersText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInLink = page.getByRole('link', { name: 'Sign in' });
    this.dashboardHomeHeading = page.getByRole('heading', { name: 'Dashboard Home' });
    this.profileHeading = page.getByRole('heading', { name: 'Profile' });
    this.userFullname = page.getByTestId('user-fullname');
    this.userUsername = page.getByTestId('user-username');
    this.userEmail = page.getByTestId('user-email');
    this.welcomeHeading = page.getByRole('heading', { name: 'Welcome to your admin' });
    this.manageUsersText = page.getByText('Here you can manage users,');
  }

  async goto() {
    await this.page.goto('http://localhost:5173/dashboard');
  }
}
