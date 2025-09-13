# 🚐 Tripinas E2E Test Automation Portfolio

![Playwright](https://img.shields.io/badge/Playwright-Testing-green?logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-Strong-blue?logo=typescript)
![CI/CD](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-blue?logo=githubactions)
![Data Driven Testing](https://img.shields.io/badge/Data%20Driven-Testing-orange?logo=json)

---

## 📦 Project Overview

**Tripinas** is a Shopee-like van rental web application.  
This portfolio showcases my automated end-to-end (E2E) tests for Tripinas using [Playwright](https://playwright.dev/), focusing on realiable UI, functional, and data-driven testing practices. It also covers everything I learned from Testing Automation PH and Code Blossom.

---

## 🧪 Test Suite Highlights

### 🔑 **Authentication & Storage State**

- **Setup Authentication**:  
  Automated login using environment credentials and Playwright's storage state.  
  Ensures all tests start with a valid, authenticated session for speed and reliability.

---

### 🗂️ **Data-Driven Testing**

- **users.json**:  
  Test scenarios are powered by a reusable `users.json` file:
  - Valid user credentials
  - Username/email already taken
  - Edge case passwords (short, sequential, repeating, common)
- **Flexible test coverage**:  
  Easily add or modify scenarios by updating the data file.

---

### 🧩 **Page Object Model (POM)**

- **Encapsulated Page Classes for:**
  - Registration
  - Login
  - Dashboard
- **Benefits:**
  - Clean tests: Use page methods like `loginPage.loginUsernameCredential()` and `dashboardPage.updateUsersProfileInformation()`
  - Easy maintenance: Update selectors/actions in one place

---

### 🏁 **End-to-End Dashboard Workflow**

- **Flows Tested:**
  - Login (username/email)
  - Update profile name/photo
  - Change username (with password verification)
  - Add/remove email addresses
  - Change password and sign out other devices
  - Delete/cancel account deletion
  - Sign out

---

### 🖼️ **Test Reporting & Screenshots**

- **Screenshots on key actions and assertions**
- **HTML and GitHub Actions reporting for CI visibility**
- **Traces & snapshots for debugging flaky tests**

---

## 🚀 How It Works

1. **Auth Setup**  
   - Logs in and saves session state for fast, reliable testing

2. **Data-Driven Specs**  
   - Loads test users from `users.json` for flexible scenario coverage

3. **Page Object Model**  
   - Each page interaction is abstracted for readability and maintainability

4. **E2E Tests**  
   - Comprehensive dashboard workflows automated from login to account deletion

---

## ⚙️ Technologies Used

- [Playwright](https://playwright.dev/) ![Playwright Icon](https://playwright.dev/img/playwright-logo.svg)
- TypeScript
- GitHub Actions
- JSON for test data
- HTML reports

---

## 📁 Example File Structure

```plaintext
tripinas-e2e/
├── tests/
│   ├── authsetup.ts           # Auth storage state setup script
│   ├── e2e.spec.ts            # Dashboard end-to-end workflow tests
│   ├── dashboard.spec.ts      # Dashboard navigation and interaction tests
│   ├── login.spec.ts          # Login page tests
│   ├── registration.spec.ts   # Registration page tests
├── shared/
│   ├── base.ts                # Playwright fixtures and global test setup
│   ├── helpers.ts             # Custom helper functions (e.g., screenshots)
│   ├── utils.ts               # Utility functions
├── pages/
│   ├── DashboardPage.ts       # Dashboard page object model
│   ├── LoginPage.ts           # Login page object model
│   ├── RegistrationPage.ts    # Registration page object model
├── config.ts                  # Playwright test configuration
├── auth/
│   └── user.json              # Storage state file (logged-in session data)
├── test-data/
│   └── users.json             # Data-driven user scenarios
└── README.md                  # Project documentation
```

---

## 📝 Sample users.json

```json
[
  { "fullName": "Marianne Cecilio", "username": "usernametest_01", "email": "username@test.com", "password": "mgctest0812" },
  { "fullName": "Marianne Cecilio", "username": "mgctest_test1282", "email": "testing1982@test.com", "password": "mgctest0812" },
  // ...edge cases for negative testing
]
```

---

## 💡 Key Takeaways

- **Scalable:** Add new test cases by updating data files, not test logic
- **Maintainable:** Page objects centralize locators and actions
- **Comprehensive:** Covers all major dashboard functionalities in production-like flows
- **CI Ready:** Automated reports and screenshots for every run

---

## 👩‍💻 Author

**Marianne Cecilio**  
_E2E Automation Engineer, Tripinas Project_  
[GitHub Profile](https://github.com/mgc1282)

---

## 📬 Contact

Want to know more or see a live demo?  
**Email:** mariannegcecilio@gmail.com
**GitHub:** [@mgc1282](https://github.com/mgc1282)

---

![Van Icon](https://img.icons8.com/external-wanicon-flat-wanicon/64/000000/external-van-delivery-wanicon-flat-wanicon.png)

