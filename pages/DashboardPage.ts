import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
  // Headings
  readonly dashboardHeader: Locator;
  readonly profileHeader: Locator;

  // Profile info
  readonly userFullname: Locator;
  readonly userUsername: Locator;
  readonly userEmail: Locator;

  // Navigation
  readonly dashboardLink: Locator;
  readonly usersLink: Locator;
  readonly settingsLink: Locator;

  // User menu
  readonly openUserButton: Locator;
  readonly userPopover: Locator;
  readonly manageAccountItem: Locator;
  readonly signOutItem: Locator;

  constructor(public readonly page: Page) {
    this.dashboardHeader = page.getByRole("heading", { name: "Dashboard Home" });
    this.profileHeader = page.getByRole("heading", { name: "Profile" });
    this.userFullname = page.getByTestId("user-fullname");
    this.userUsername = page.getByTestId("user-username");
    this.userEmail = page.getByTestId("user-email");

    this.dashboardLink = page.getByRole("link", { name: "Dashboard" });
    this.usersLink = page.getByRole("link", { name: "Users" });
    this.settingsLink = page.getByRole("link", { name: "Settings" });

    this.openUserButton = page.getByRole("button", { name: "Open user button" });
    this.userPopover = page.getByLabel("User button popover");
    this.manageAccountItem = page.getByRole("menuitem", { name: "Manage account" });
    this.signOutItem = page.getByRole("menuitem", { name: "Sign out" });
  }

  async navigateTo(): Promise<void> {
    await this.page.goto("http://localhost:5173/dashboard");
  }

  async verifyDashboardVisible(): Promise<void> {
    await expect(this.dashboardHeader).toBeVisible();
    await expect(this.profileHeader).toBeVisible();
  }

  async verifyUserProfile(fullName: string, username: string, email: string): Promise<void> {
    await expect(this.userFullname).toContainText(fullName);
    await expect(this.userUsername).toContainText(username);
    await expect(this.userEmail).toContainText(email);
  }

  async openUserMenu(): Promise<void> {
    await this.openUserButton.click();
    await expect(this.userPopover).toBeVisible();
  }

  async verifyUserMenu(fullName: string, username: string): Promise<void> {
    await expect(this.userPopover).toContainText(fullName);
    await expect(this.userPopover).toContainText(username);
    await expect(this.manageAccountItem).toBeVisible();
    await expect(this.signOutItem).toBeVisible();
  }

  async signOut(): Promise<void> {
    await this.signOutItem.click();
  }

  async verifySignedOut(): Promise<void> {
    await expect(this.page).toHaveURL("http://localhost:5173/sign-in");
    await expect(this.page.getByRole("heading", { name: "Sign in to Tripinas" })).toBeVisible();
  }
}
