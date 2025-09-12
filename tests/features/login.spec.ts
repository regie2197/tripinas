import { test } from "../../shared/base";
import { attachScreenshot } from "../../shared/helpers";
import users from "../../test-data/users.json";

const LOGIN_SUCCESS_SCREENSHOT = "login_success_screenshot";
const LOGIN_FAILURE_SCREENSHOT = "login_failure_screenshot";
const LOGIN_ERROR_MESSAGE = "Password is incorrect. Try again, or use another method.";

test.describe("Login Test Suite", { tag: ["@Smoke-Testing", "@Sprint-1"] }, () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateTo();
    });

    for (const user of users) {
        test(`Should login successfully as ${user.email || user.username}`, { tag: "@HappyPath" }, async ({ loginPage }, testInfo) => {
            await test.step("Login with valid credentials", async () => {
                // Use email if available, otherwise use username
                const emailOrUsername = user.email ? user.email : user.username;
                await loginPage.login(emailOrUsername, user.password);
            });
            await test.step("Verify login success", async () => {
                await loginPage.verifyLoginSuccess();
            });

            await test.step("Validate profile details", async () => {
                await loginPage.validateProfile(user.fullName, user.username, user.email);
            });

            await test.step("Take and attach screenshot", async () => {
                await attachScreenshot(
                    loginPage.page,
                    testInfo,
                    LOGIN_SUCCESS_SCREENSHOT
                );
            });
        });

        test(`Should fail to login with invalid password for ${user.email || user.username}`, async ({ loginPage }, testInfo) => {
            await test.step("Attempt login with invalid password", async () => {
                const emailOrUsername = user.email || user.username;
                // Use a wrong password
                await loginPage.loginFailed(emailOrUsername, "wrong_password");
            });
            await test.step("Verify login error message", async () => {
                await loginPage.verifyLoginError(LOGIN_ERROR_MESSAGE);
            });
            await test.step("Take and attach screenshot", async () => {
                await attachScreenshot(
                    loginPage.page,
                    testInfo,
                    LOGIN_FAILURE_SCREENSHOT
                );
            });
        }); 
    }  
});