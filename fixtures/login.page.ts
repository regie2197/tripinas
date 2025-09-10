// // // import { Page } from '@playwright/test';

// // // export async function loginAs(page: Page, baseUrl: string, email: string, password: string) {
// // //   await page.goto(`${baseUrl}/sign-in`);
// // //   await page.getByRole('textbox', { name: /email/i }).fill(email);
// // //   await page.getByRole('button', { name: /continue/i }).click();
// // //   await page.getByRole('textbox', { name: /password/i }).fill(password);
// // //   await page.getByRole('button', { name: /continue/i }).click();

// // import { test, expect,Page } from '@playwright/test';

// //  // declaring  app error
// //   const INLINE_EMAIL_ERROR_TEXT = /^Couldn't find your account\.$/;
// //   const Pass_error = /^Password is incorrect. Try again, or use another method\.$/;

// //   const NEGATIVE_CASES = [
// //     { name: 'unknown email', email: 'nope+doesnotexist@example.com', inline: false },
// //     { name: 'wrong password',email: 'regietest21', password: 'DefinitelyWrong!', inline: false },
// //     { name: 'empty email', email: '', password: undefined, inline: true },
// //     { name: 'invalid email format', email: 'not-an-email', password: undefined, inline: true },
// //   ];

// //   export async function loginAs(page: Page, baseUrl: string, email: string, password: string) {
// //   await page.goto(`${baseUrl}/sign-in`);
// //   await page.getByRole('textbox', { name: 'Email address or username' }).fill(email);
// //    await page.getByRole('button', { name: 'Continue' }).click();
// //   await page.getByRole('textbox', { name: 'Password' }).fill('password');
// //   await page.getByRole('textbox', { name: 'Password' }).click();
  


// //   };


// import { test, expect,Page } from '@playwright/test';
// import users from '../test-data/users.json';

// // Reusable error patterns (export if you’ll reuse them in specs)
// export const INLINE_EMAIL_ERROR_TEXT = /^Couldn't find your account\.$/;
// export const PASSWORD_ERROR_TEXT = /^Password is incorrect\. Try again, or use another method\.$/;

// export type NegativeCase = {
//   name: string;
//   email: string;
//   password?: string; // undefined means stop at step 1 (email only)
//   inline: boolean;   // true = expect inline validation at step 1
// };

// export const NEGATIVE_CASES: NegativeCase[] = [
//   { name: 'unknown email', email: '1111', password: 'SomePass123', inline: false },
//   { name: 'wrong password', email: 'regietest21', password: 'DefinitelyWrong!', inline: false },
//   { name: 'empty email', email: '', inline: true },
//   { name: 'invalid email format', email: 'not-an-email', inline: true },
// ];

// // small utility to avoid double slashes
// function joinUrl(base: string, path: string) {
//   const u = new URL(base);
//   // ensure trailing slash then resolve relative path
//   return new URL(path.replace(/^\//, ''), u).toString();
// }

// export async function loginAs(page: Page, baseUrl: string, email: string, password: string) {
//   await page.goto(joinUrl(baseUrl, '/sign-in'));

// }
// // For negative flows where you might stop at step 1
// export async function attemptLogin(page: Page, baseUrl: string, email: string, password?: string) {
//   await page.goto(joinUrl(baseUrl, '/sign-in'));

//   users.forEach(user => {
//   const emailBox =  await page.getByRole('textbox', { name: 'Email address or username' }).fill(`${user.username}`);
  
//   if (emailBox = (`${user.username}`){
//     await page.getByRole('button', { name: 'Continue' }).click();
//   }

// else {
//       ( INLINE_EMAIL_ERROR_TEXT)
//     };
//   });
// };


// //   if (password !== undefined) {
// //     const pwdBox = page.getByRole('textbox', { name: 'Password' })
// //     await pwdBox.fill(password);
// //      await page.getByRole('button', { name: 'Continue' }).click();
// //   };

// // };

import { Page, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo() {
    await this.page.goto("http://localhost:5173/login");
  }

  async verifyPageLoaded() {
    await expect(this.page.getByTestId("login-title")).toBeVisible();
  }

  async login(email: string, password: string) {
    await this.page.getByTestId("email-input").fill(email);
    await this.page.getByTestId("password-input").fill(password);
    await this.page.getByTestId("login-button").click();
  }

  async verifyLoginSuccessful(expectedUrl: string) {
    await expect(this.page).toHaveURL(expectedUrl);
  }
}
