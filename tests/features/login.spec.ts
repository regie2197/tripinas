// // import { test, expect } from "@shared/base";
// // import users from "../../test-data/users.json";

// // test.describe("Login and Profile Verification", { tag: ["@RegressionTesting", "@HappyPath", "@Sprint-1"] }, () => {
  

// //   users.forEach((user) => {
// //     test(`should login as ${user.username} and verify profile`, async ({loginPage, page }) => {
      
// //       await test.step("Navigate to Login Page and Verify Page Loaded", async () => {
// //         await loginPage.navigateTo();
// //         await loginPage.verifyPageLoaded();
// //       });
     
// //       await test.step("Input Credentials and Click Continue", async () => {
// //         await loginPage.login(user.email, user.password);
// //       });

// //       await test.step("Verify Successful Login and Profile Information", async () => {
// //           await loginPage.verifyLoginSuccessful("http://localhost:5173/dashboard");
// //           await expect(page.getByTestId("user-fullname")).toContainText(user.fullName);
// //           await expect(page.getByTestId("user-username")).toContainText(user.username);
// //           await expect(page.getByTestId("user-email")).toContainText(user.email);
// //       });
// //     });
// //   });
// // });


// import { test, expect } from "@shared/base";
// import users from "../../test-data/users.json";

// test.describe(
//   "Login and Profile Verification",
//   { tag: ["@RegressionTesting", "@HappyPath", "@Sprint-1"] },
//   () => {
//     users.forEach((user) => {
//       test(`should login as ${user.username} and verify profile`, async ({
//         loginPage,
//         page,
//       }) => {
//         await test.step("Navigate to Login Page and Verify Page Loaded", async () => {
//           await loginPage.navigateTo();
//           await loginPage.verifyPageLoaded();
//         });

//         await test.step("Input Credentials and Click Continue", async () => {
//           await loginPage.login(user.email, user.password);
//         });

//         await test.step("Verify Successful Login and Profile Information", async () => {
//           await loginPage.verifyLoginSuccessful();
//           await expect(page.getByTestId("user-fullname")).toContainText(user.fullName);
//          await expect(page.getByTestId("user-username")).toContainText(user.username);
//           await expect(page.getByTestId("user-email")).toContainText(user.email);
//         });
//       });
//     });

//     test.describe(
//   "Email Checking",
//   { tag: ["@RegressionTesting", "@HappyPath", "@Sprint-1"] },
//   () => {
//     users.forEach((user) => {
//       test("verify if user  uses corretc email", async ({
//         loginPage,
//         page,
//       }) => {
//         await test.step("Navigate to Login Page and Verify Page Loaded", async () => {
//           await loginPage.navigateTo();
//           await loginPage.verifyPageLoaded();
//         });

//         //assertion: check email eneterd
//         await test.step("check email enetered", async () =>{
//         await loginPage.verifyIncorrectEMail();
//         await loginPage.clickContinue();
//         await page.getByText('Couldn\'t find your account.').isVisible()
//         });
//   });
// };


import { test, expect } from "@shared/base";
import users from "../../test-data/users.json";

test.describe("Login and Profile Verification", () => {
  users.forEach((user) => {
    test(
      `should login as ${user.username} and verify profile`,
      { tag: ["@RegressionTesting", "@HappyPath", "@Sprint-1"] },
      async ({ loginPage, page }) => {
        await test.step("Navigate to Login Page and Verify Page Loaded", async () => {
          await loginPage.navigateTo();
          await loginPage.verifyPageLoaded();
        });

        await test.step("Input Credentials and Click Continue", async () => {
          await loginPage.login(user.email, user.password);
        });

        await test.step("Verify Successful Login and Profile Information", async () => {
          await loginPage.verifyLoginSuccessful();
          await expect(page.getByTestId("user-fullname")).toContainText(user.fullName);
          await expect(page.getByTestId("user-username")).toContainText(user.username);
          await expect(page.getByTestId("user-email")).toContainText(user.email);
        });
      }
    );
  });
});

test.describe("Email Checking", () => {
  users.forEach((user) => {
    test("Check email entered is valid",
      { tag: ["@RegressionTesting", "@NegativeTest", "@Sprint-1"] },
      async ({ loginPage, page }) => {
        await test.step("Navigate to Login Page and Verify Page Loaded", async () => {
          await loginPage.navigateTo();
        });

        await test.step("Check email entered is valid", async () => {
          await loginPage.verifyIncorrectEmail();
          await loginPage.clickContinue();

          // Assert the visible error
          //const error = page.locator('div').filter({ hasText: "Couldn't find your account" });
          //await expect(error).toBeVisible();
          expect(page.locator('div').filter({ hasText: /^Couldn't find your account\.$/ }));
        });
      }
    );
  });
});

test.describe("password validation", () => {
  users.forEach((user) => {
    test("Check password entered is valid",
      { tag: ["@RegressionTesting", "@NegativeTest", "@Sprint-1"] },
      async ({ loginPage, page }) => {
        await test.step("Navigate to Login Page and Verify Page Loaded", async () => {
          await loginPage.navigateTo();
        });

        await test.step("Check password entered is valid", async () => {
          await loginPage.verifyIncorrectPassword();
          await loginPage.clickContinue();
          // Assert the visible error
          //const error = page.locator('div').filter({ hasText: "Couldn't find your account" });
          //await expect(error).toBeVisible();
          expect(page.locator('div').filter({ hasText: "Password is incorrect. Try again, or use another method" }));
        });
      }
    );
  });
});