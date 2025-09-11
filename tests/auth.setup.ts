import { test as setup } from "@playwright/test";
import { STORAGE_STATE } from "../playwright.config";
import { LoginPage } from "@pages/LoginPage";


setup("Authenticate and save storage state", async ({ page }) => {
  const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginEmailCredential(process.env.TEST_EMAIL!, process.env.TEST_PASSWORD!);
    await loginPage.verifyLoginSuccess();
    await page.context().storageState({ path: STORAGE_STATE });
});