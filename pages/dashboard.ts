import { Page, Locator } from '@playwright/test';

export class Dashboard {
  public page: Page;
  public headingAdmin: Locator;
  public linkDashboard: Locator;
  public linkUsers: Locator;
  public linkSettings: Locator;
  public headingDashboard: Locator;
  public headingProfile: Locator;
  public textName: Locator;
  public idUserFullName: Locator;
  public textUsername: Locator;
  public idUsername: Locator;
  public textEmail: Locator;
  public idEmail: Locator;
  public headingWelcome: Locator;
  public textManageUsers: Locator;
  public buttonUserButton: Locator;
  public menuItemManageProfile: Locator;
  public buttonProfile: Locator;
  public headingProfileDetails: Locator;
  public buttonSecurity: Locator;
  public headingSecurity: Locator;
  public menuItemSignOut: Locator;

  constructor(page: Page) {
  this.page = page
  this.headingAdmin = (page.getByRole('heading', { name: 'Admin', exact: true }))
  this.linkDashboard = page.getByRole('link', { name: 'Dashboard' })
  this.linkUsers = page.getByRole('link', { name: 'Users' })
  this.linkSettings = page.getByRole('link', { name: 'Settings' })
  this.headingDashboard = page.getByRole('heading', { name: 'Dashboard Home' })
  this.headingProfile = page.getByRole('heading', { name: 'Profile' })
  this.textName = page.getByTestId('user-fullname').getByText('Name:')
  this.idUserFullName = page.getByTestId('user-fullname')
  this.textUsername = page.getByText('Username:')
  this.idUsername = page.getByTestId('user-username')
  this.textEmail = page.getByText('Email:')
  this.idEmail = page.getByTestId('user-email')
  this.headingWelcome = page.getByRole('heading', { name: 'Welcome to your admin' })
  this.textManageUsers = page.getByText('Here you can manage users,')
  this.buttonUserButton = page.getByRole('button', { name: 'Open user button' })
  this.menuItemManageProfile = page.getByRole('menuitem', { name: 'Manage account' })
  this.buttonProfile = page.getByRole('button', { name: 'Profile', exact: true })
  this.headingProfileDetails = page.getByRole('heading', { name: 'Profile details' })
  this.buttonSecurity = page.getByRole('button', { name: 'Security' })
  this.headingSecurity = page.getByRole('heading', { name: 'Security' })
  this.menuItemSignOut = page.getByRole('menuitem', { name: 'Sign out' })
}

async navigateTo(): Promise<void> {
  await this.page.goto('http://localhost:5173/dashboard');
  await this.page.waitForLoadState('domcontentloaded');
}

async goToManageProfile(): Promise<void> {
  await this.buttonUserButton.click();
  await this.menuItemManageProfile.click();
  await this.buttonProfile.click();
  await this.headingProfileDetails.waitFor();
}

async goToManageSecurity(): Promise<void> {
  await this.buttonUserButton.click();
  await this.menuItemManageProfile.click();
  await this.buttonSecurity.click();
  await this.headingSecurity.waitFor();

}

async signOut(): Promise<void> {
    await this.buttonUserButton.click();
    await this.menuItemSignOut.click()
}

}
