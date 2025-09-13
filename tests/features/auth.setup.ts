import { test as setup } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

const STORAGE_STATE = 'auth/user.json';

setup("Authenticate and save storage state", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const email = process.env.TRIPINAS_EMAIL;
  const password = process.env.TRIPINAS_PASSWORD;

if (!email || !password) {
  throw new Error('TRIPINAS_EMAIL and TRIPINAS_PASSWORD must be set in your .env file and loaded correctly.');
}
    await loginPage.goto();
    await loginPage.loginEmailCredential(email, password);
    await loginPage.verifyLoginSuccess();
    await page.context().storageState({ path: STORAGE_STATE });
});