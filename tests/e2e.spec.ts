import { test, expect } from "@playwright/test";
import users from "../test-data/users.json";

test("should show dashboard URL and verify user info", async ({ page }) => {
  
  const authUser = users[0];  

  await page.goto("/dashboard");
  await expect(page).toHaveURL("http://localhost:5173/dashboard");
  await expect(page.getByTestId("user-fullname")).toContainText(authUser.fullName);
  await expect(page.getByTestId("user-username")).toContainText(authUser.username);
  await expect(page.getByTestId("user-email")).toContainText(authUser.email);
});