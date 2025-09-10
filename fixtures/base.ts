import { Page, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo() {
    await this.page.goto("http://localhost:5173/login");
  }

  async verifyPageLoaded() {
    await expect(this.page.getByTestId("login-title")).toBeVisible();
  }

  async login(email: string, password: string) {
    await this.page.getByTestId("email-input").fill(email);
    await this.page.getByTestId("password-input").fill(password);
    await this.page.getByTestId("login-button").click();
  }

  async verifyLoginSuccessful(expectedUrl: string) {
    await expect(this.page).toHaveURL(expectedUrl);
  }
}
