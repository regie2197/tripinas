
# ⊹ ࣪ ˖ Playwright Test Automation – 2025 ˖ ࣪ ⊹
### Start of Amazing Journey

---

## 💡Quick Start Guide
***Please do this after forking and cloning the Repository:***

**📜Initial Setup**
#### 📜Installation of Playwright & Other Dependencies

```bash
npm install
```

#### 📜Install Dependencies and Run Frontend for Testing (Open another terminal)

```bash
cd frontend

npm install

npm run dev
```

**⚡ Setup for Profile Tests**

***The Profile test suite depends on an existing user.***
***We handle this with a dedicated auth.setup.ts file that:***
- Registers a new user with Faker.js
- Saves the credentials in .auth/baseUser.json
- Stores a storage state (.auth/user.json) so profile tests can skip login

#### ▶ Run Setup (Register a User First)
```bash
npx playwright test tests/features/auth.setup.ts --project setup
```
***Or***
```bash
npm run auth-setup
```

**🌍 Project & Config Setup**
***Playwright config ensures setup runs before profile:***
```ts
projects: [
  {
    name: "setup",
    testMatch: "**/*.setup.ts",
  },
  {
    name: "profile",
    dependencies: ["setup"],
    testMatch: "tests/features/profile.spec.ts",
    use: {
      storageState: STORAGE_STATE,
      ...devices["Desktop Chrome"],
      launchOptions: {
        args: ["--start-maximized"],
      },
    },
  },
];
```

**📸 Visual Regression & Screenshots**
- Added .toHaveScreenshot() across Login, Registration, and Profile
- Used masking for dynamic data (e.g., Faker names/usernames/emails) → prevents false diffs
- Configured screenshots to save only on failed tests in playwright.config.ts
**Captures:**
 - ✅ Successful & failed Login
 - ✅ Login UI
 - ✅ Successful & failed Registration
 - ✅ Registration UI
 - ✅ Profile modals

**🧪 Example Spec Files**
#### ▶ Run Login & Registration Suites
***These can be run anytime since they have/create their own users:***
```bash
npx playwright test tests/features/login.spec.ts
npx playwright test tests/features/registration.spec.ts
```
***Or***
```bash
npm run login
npm run register
```

#### ▶ Run Profile Suite (Depends on Setup)
```bash
npx playwright test tests/features/profile.spec.ts --project profile
```
***Or***
```bash
npm run profile-test
```
***⚠️ Running profile.spec.ts without auth.setup.ts will fail because no user exists in .auth/baseUser.json.**

**📊 Test Reporting**
- Default Playwright HTML report → run with:
```bash
npx playwright show-report
```
- Screenshots & traces attached automatically for failed runs

**🔧 Utilities**
***Faker.js User Generator***
- All test data is generated dynamically.
- This ensures unique test users each run and avoids conflicts.

#### 🔑 Key Features
- Page Object Model (POM): Keeps code reusable and organized.
- Faker.js Integration: Generates random users for each run.
- Storage State: Skips re-login for profile tests, speeds up execution.
- Visual Regression Testing: .toHaveScreenshot used with masking to ignore dynamic data.
- Serial Execution for Profile: Ensures tests run in logical order (update name → username → email → password).
- Screenshots on Failure: Automatically saved for easier debugging.

---

### 📄 Overview###
***This suite covers Login, Registration, and Profile Management workflows, including happy paths, unhappy paths, validations, and visual regression tests.***

#### 🔐 1. Login Tests##
***Description: Validates user authentication flows.***

**✅ Successful Login**
- User can log in with valid credentials.
- Dashboard is displayed after login.
- Screenshot is captured for visual regression.

**❌ Negative Cases**
- Invalid username/email → error message displayed.
- Wrong password → error message displayed.
- Empty fields → validation error displayed.

#### 🆕 2. Registration Tests##
***Description: Validates new user registration using Faker.js for unique data.***

**✅ Successful Registration**
- User can register with unique username, email, and password.
- Dashboard is displayed after registration.
- Screenshot comparison run with masked fields (dynamic data masked to prevent false failures).

**❌ Negative Cases**
- Existing email and username → error message.
- Exceedung character limit for names and username → validation error.
- Below minimum length/Weak/invalid password → validation error.
- Empty required fields → validation error.

#### 👤 3. Profile Management Tests##
***Description: Validates user profile updates and deletion. Requires auth setup to create a base user before execution.***

**✅ Positive Flow (executed in .serial order)**
- Update First & Last Name → verify changes reflect.
- Update Username → log out, re-login with updated username.
- Add Email → verify additional email is saved.
- Update Password → log out, log in with new password.
- Account can be deleted

**❌ Negative Cases**
- Invalid email format → validation error.
- Too short/Too long name/username → error displayed.
- Wrong old password during password update → error displayed.
- Adding already registered email/username