import { test as setup } from "@playwright/test";
import { STORAGE_STATE } from "../../playwright.config";
import { LoginPage } from "@pages/LoginPage";
import { RegisterPage } from "../../pages/RegisterPage";
import { generateTestUser } from '../../shared/fakerUtils';
import fs from "fs";
import path from "path";
//npx playwright test auth.setup.ts --repeat-each=100 --workers=10 -x

/**
 * This is a setup file for the profile test. It will register a user
 */

const userInfoPath = path.join(__dirname, "../../.auth/baseUser.json");
setup("Do Register", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const testUser = generateTestUser();

    await loginPage.navigateToLogin();
    await loginPage.clickSignUpLink();
    await registerPage.fillOptionalFields(testUser.firstName, testUser.lastName);
    await registerPage.fillRequiredFields(testUser.email, testUser.username, testUser.password);
    await loginPage.verifyDashboard();

    await page.context().storageState({ path: STORAGE_STATE });

    // Save base user info for profile tests
    fs.writeFileSync(userInfoPath, JSON.stringify(testUser, null, 2));
});