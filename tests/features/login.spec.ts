import { test, expect } from "@shared/base";
import users from "../../test-data/users.json";
import { attachScreenshot } from "@shared/helpers";

const LOGIN_SUCCESS_SCREENSHOT = "login_success_screenshot";
const LOGIN_FAILURE_SCREENSHOT = "login_failure_screenshot";

test.describe(
  "Login and Profile Verification",
  {
    annotation: {
      type: "MODULE",
      description: "Functional testing for login",
    },
    tag: "@Login",
  },
  () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/sign-in");
    });

    users.forEach((user) => {
      // ✅ Successful login + logout
      test(
        `should login as ${user.username} and verify profile`,
        { tag: ["@Login", "@SmokeTesting", "@HappyPath"] },
        async ({ page }, testInfo) => {
          await page.getByRole("textbox", { name: "Username" }).fill(user.username);
          await page.getByRole("button", { name: "Continue" }).click();
          await page.getByRole("textbox", { name: "Password" }).fill(user.password);
          await page.getByRole("button", { name: "Continue" }).click();
          await page.waitForURL("/dashboard");

          await expect(page.getByTestId("user-fullname")).toContainText(user.fullName);
          await expect(page.getByTestId("user-username")).toContainText(user.username);
          await expect(page.getByTestId("user-email")).toContainText(user.email);

          // Logout
          await page.getByRole("button", { name: "Open user button" }).click();
          await page.getByRole("menuitem", { name: "Sign out" }).click();
          await expect(page).toHaveURL("/sign-in");

          // ✅ Attach screenshot to report
          await test.step("Take and attach screenshot", async () => {
            await attachScreenshot(page, testInfo, LOGIN_SUCCESS_SCREENSHOT);
          });
        }
      );

      // ✅ Invalid password
      test(
        `should fail login with invalid password for ${user.username}`,
        { tag: ["@Login", "@NegativeTesting", "@InvalidPassword"] },
        async ({ page }, testInfo) => {
          await page.getByRole("textbox", { name: "Email address or username" }).fill(user.email);
          await page.getByRole("button", { name: "Continue" }).click();
          await page.getByRole("textbox", { name: "Password" }).fill("invalid-password");
          await page.getByRole("button", { name: "Continue" }).click();

          await expect(page.getByText("Password is incorrect. Try")).toBeVisible();
          await expect(page.locator("#error-password")).toContainText("Password is incorrect. Try");

          // ✅ Attach screenshot to report
          await test.step("Take and attach screenshot", async () => {
            await attachScreenshot(page, testInfo, LOGIN_FAILURE_SCREENSHOT);
          });
        }
      );

      // ✅ Invalid username/email
      test(
        `should fail login with invalid username/email for ${user.username}`,
        { tag: ["@Login", "@NegativeTesting", "@InvalidUsername"] },
        async ({ page }, testInfo) => {
          await page.getByRole("textbox", { name: "Email address or username" }).fill("invalid_username");
          await page.getByRole("button", { name: "Continue" }).click();

          await expect(page.getByText("Couldn't find your account.")).toBeVisible();

          await test.step("Take and attach screenshot", async () => {
            await attachScreenshot(page, testInfo, LOGIN_FAILURE_SCREENSHOT);
          });
        }
      );

      // ✅ Empty username/email
      test(
        `should fail login with empty username/email for ${user.username}`,
        { tag: ["@Login", "@NegativeTesting", "@EmptyUsername"] },
        async ({ page }, testInfo) => {
          await page.getByRole("textbox", { name: "Email address or username" }).fill("");
          await page.getByRole("button", { name: "Continue" }).click();

          // Assert login page is still visible
          await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
          await expect(page.locator("#identifier-field")).toBeEmpty();

          await test.step("Take and attach screenshot", async () => {
            await attachScreenshot(page, testInfo, LOGIN_FAILURE_SCREENSHOT);
          });
        }
      );

      // ✅ Empty password
      test(
        `should fail login with empty password for ${user.username}`,
        { tag: ["@Login", "@NegativeTesting", "@EmptyPassword"] },
        async ({ page }, testInfo) => {
          await page.getByRole("textbox", { name: "Email address or username" }).fill(user.email);
          await page.getByRole("button", { name: "Continue" }).click();
          await page.getByRole("textbox", { name: "Password" }).fill("");
          await page.getByRole("button", { name: "Continue" }).click();

          await expect(page.getByText("Enter password.")).toBeVisible();
          await expect(page.locator("#error-password")).toContainText("Enter password.");

          await test.step("Take and attach screenshot", async () => {
            await attachScreenshot(page, testInfo, LOGIN_FAILURE_SCREENSHOT);
          });
        }
      );
    });
  }
);
