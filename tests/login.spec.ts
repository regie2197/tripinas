// This is the actual test file.
// It now looks much cleaner and beginner-friendly.

import { test, expect } from './fixtures/pagesFixture';
import users from '../test-data/users.json';

// Group tests together
test.describe('Login and Profile Verification', () => {

  // Loop through every user from test-data/users.json
  for (const user of users) {
    test(
      `@smoke should login as ${user.username} and verify profile`,
      async ({ loginPage, profilePage, page }, testInfo) => {

        // 👉 Test annotation: skip Safari (WebKit) for now
        test.skip(testInfo.project.name === 'webkit', 'Login not supported in WebKit yet');

        // 👉 Go to sign-in page
        await loginPage.gotoSignIn();

        // 👉 Perform login
        await loginPage.login(user.email, user.password);

        // 👉 Wait until dashboard loads
        await page.waitForURL('/');

        // 👉 Verify profile info is correct
        await profilePage.expectProfileToMatch(user);

        // 👉 Take screenshot for record
        await page.screenshot({
          path: `screenshots/${user.username}-profile.png`,
          fullPage: true,
        });

        // 👉 Add a tag (custom annotation) for reporting
        testInfo.annotations.push({ type: 'tag', description: 'profileVerification' });
      }
    );
  }

  // Example of a test marked as not ready yet
  test.fixme('Profile picture upload not implemented yet', async () => {
    // This test is skipped until feature is ready
  });
});
