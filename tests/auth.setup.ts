import { test as setup } from "@playwright/test";

import { STORAGE_STATE } from "../playwright.config";
import { LoginPage } from "@pages/LoginPage";


setup("Authenticate and save storage state", async ({ page }) => {
  const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.loginAuth;
    //await loginPage.verifyLoginSuccessful();
    await page.context().storageState({ path: STORAGE_STATE });
    console.log("Authentication successful, storage state saved.");
});