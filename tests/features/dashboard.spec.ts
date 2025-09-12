import { test, expect } from "@playwright/test";
import users from "../../test-data/users.json";
import { attachScreenshot } from "@shared/helpers";

const DASHBOARD_SCREENSHOT = "dashboard_verification_screenshot";

test.describe(
  "Dashboard Test Suite",
  { tag: ["@RegressionTesting", "@SmokeTesting", "@Sprint-2"] },
  () => {
    users.forEach((user) => {
      test(
        `Should login as ${user.username} and display dashboard contents`,
        async ({ page }, testInfo) => {
          // --- Login ---
          await test.step("Sign in", async () => {
            await page.goto("http://localhost:5173/sign-in");
            await page.getByRole("textbox", { name: "Email address or username" }).fill(user.email);
            await page.getByRole("textbox", { name: "Password" }).fill(user.password);
            await page.getByRole("button", { name: "Continue" }).click();
          });

          // --- Dashboard verification ---
          await test.step("Verify dashboard is visible", async () => {
            await expect(page.getByRole("heading", { name: "Dashboard Home" })).toBeVisible();
            await expect(page.locator("h1")).toContainText("Dashboard Home");

            await expect(page.getByRole("heading", { name: "Profile" })).toBeVisible();
            await expect(page.getByTestId("user-profile").getByRole("heading")).toContainText("Profile");

            // ✅ Dynamic values
            await expect(page.getByTestId("user-fullname")).toContainText(`Name: ${user.fullName}`);
            await expect(page.getByTestId("user-username")).toContainText(`Username: ${user.username}`);
            await expect(page.getByTestId("user-email")).toContainText(`Email: ${user.email}`);

            await expect(page.getByRole("heading", { name: "Welcome to your admin" })).toBeVisible();
            await expect(page.locator("#root")).toContainText("Welcome to your admin dashboard!");
            await expect(page.getByText("Here you can manage users,")).toBeVisible();
            await expect(
              page.getByText("Here you can manage users, view analytics, and configure settings.")
            ).toBeVisible();

            await expect(page.getByRole("link", { name: "Dashboard" })).toBeVisible();
            await expect(page.getByRole("link", { name: "Users" })).toBeVisible();
            await expect(page.getByRole("link", { name: "Settings" })).toBeVisible();
          });

          // --- Attach screenshot ---
          await test.step("Take and attach screenshot", async () => {
            await attachScreenshot(page, testInfo, `${DASHBOARD_SCREENSHOT}_${user.username}`);
          });
        }
      );
    });
  }
);
