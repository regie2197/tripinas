import { test, expect } from "@shared/base";
import users from "../../test-data/users.json";

test.describe("Login and Profile Verification", { tag: ["@RegressionTesting", "@HappyPath", "@Sprint-1"] }, () => {
  

  users.forEach((user) => {
    test(`should login as ${user.username} and verify profile`, async ({loginPage, page }) => {
      
      await test.step("Navigate to Login Page and Verify Page Loaded", async () => {
        await loginPage.navigateTo();
        await loginPage.verifyPageLoaded();
      });
     
      await test.step("Input Credentials and Click Continue", async () => {
        await loginPage.login(user.email, user.password);
      });

      await test.step("Verify Successful Login and Profile Information", async () => {
          await loginPage.verifyLoginSuccessful("http://localhost:5173/dashboard");
          await expect(page.getByTestId("user-fullname")).toContainText(user.fullName);
          await expect(page.getByTestId("user-username")).toContainText(user.username);
          await expect(page.getByTestId("user-email")).toContainText(user.email);
      });
    });
  });
});
