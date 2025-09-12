import { test } from "@shared/base";
import { attachScreenshot } from "@shared/helpers";
import users from "../../test-data/users.json";
import { ManageAccountPage } from "@pages/ManageAccountPage";
import { DashboardPage } from "@pages/DashboardPage";

const UPLOAD_SCREENSHOT = "upload_profile_photo";
const REMOVE_SCREENSHOT = "remove_profile_photo";
const UPDATE_NAME_SCREENSHOT = "update_profile_name";

test.describe(
  "Manage Account Test Suite",
  {
    annotation: {
      type: "MODULE",
      description: "Functional testing for manage account",
    },
    tag: "@ManageAccount",
  },
  () => {
    const authUser = users[0];
    let dashboardPage: DashboardPage;
    let manageAccountPage: ManageAccountPage;

    test.beforeEach(async ({ page }) => {
      // Login
      await page.goto("/sign-in");
      await page.getByRole("textbox", { name: "Email address or username" }).fill(authUser.email);
      await page.getByRole("button", { name: "Continue" }).click();
      await page.getByRole("textbox", { name: "Password" }).fill(authUser.password);
      await page.getByRole("button", { name: "Continue" }).click();

      // Go to Dashboard
      dashboardPage = new DashboardPage(page);
      await dashboardPage.verifyDashboardVisible();

      // Open Manage Account dialog
      await dashboardPage.openUserMenu();
      await dashboardPage.manageAccountItem.click();

      manageAccountPage = new ManageAccountPage(page);
      await manageAccountPage.verifyManageAccountDialog();
    });

    // ✅ Test 1: Update first/last name
    test(
      "Should update first and last name",
      { tag: ["@ManageAccount", "@ProfileUpdate"] },
      async ({ page }, testInfo) => {
        await manageAccountPage.updateProfile("JeniUpdated", "GoUpdated");

        await test.step("Attach screenshot after name update", async () => {
          await attachScreenshot(page, testInfo, UPDATE_NAME_SCREENSHOT);
        });
      }
    );

    // ✅ Test 2: Upload profile photo
    test(
      "Should upload profile photo",
      { tag: ["@ManageAccount", "@UploadPhoto"] },
      async ({ page }, testInfo) => {
        await manageAccountPage.uploadProfileImage("test-data/hass.png");

        await test.step("Attach screenshot after upload", async () => {
          await attachScreenshot(page, testInfo, UPLOAD_SCREENSHOT);
        });
      }
    );

    // ✅ Test 3: Remove profile photo
    test(
      "Should remove profile photo",
      { tag: ["@ManageAccount", "@RemovePhoto"] },
      async ({ page }, testInfo) => {
        await manageAccountPage.removeProfileImage();

        await test.step("Attach screenshot after removal", async () => {
          await attachScreenshot(page, testInfo, REMOVE_SCREENSHOT);
        });
      }
    );
  }
);
