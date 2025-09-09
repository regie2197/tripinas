import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
   
    //Locators
    public readonly emailOrUsernameInput: Locator;
    public readonly passwordInput: Locator;
    public readonly continueButton: Locator;
    public readonly pageName: Locator;
    public readonly welcomeMessage: Locator;
    public readonly enterPassword: Locator;
    public readonly errorMessage: Locator;
    
   constructor(public page: Page) {
      this.emailOrUsernameInput = page.getByRole('textbox', { name: 'Email address or username' });
      this.passwordInput = page.getByRole('textbox',{name: 'Password'});
      this.continueButton = page.getByRole('button',{name:'Continue'});
      this.pageName = page.getByRole('heading',{name: 'Dashboard Home'});
      this.welcomeMessage = page.getByRole('heading',{name: 'Welcome to your admin'});
      this.enterPassword = page.getByRole('heading',{name: 'Enter your password'});
      this.errorMessage = page.getByText('Password is incorrect. Try again, or use another method.');
}
//Navigate to login page (method)
     async navigateTo(): Promise<void> {
    await this.page.goto('http://localhost:5173/sign-in');
    
    }

// Login with username or email address
    async login(emailOrUsername: string, password: string): Promise<void> {
        await this.emailOrUsernameInput.fill(emailOrUsername);
        await this.continueButton.click();
        await this.passwordInput.fill(password);
        await this.continueButton.click();
    }

  // Login with invalid password
    async loginFailed(emailOrUsername: string, password: string): Promise<void> {
            await this.emailOrUsernameInput.fill(emailOrUsername);
            await this.continueButton.click();
            await this.passwordInput.fill(password);
            await this.continueButton.click();
        }
    

  async verifyLoginSuccess(): Promise<void> {
    await expect(this.pageName).toBeVisible();
    await expect(this.welcomeMessage).toHaveText('Welcome to your admin dashboard!');
  
  }

 async verifyLoginError(expectedErrorMessage: string): Promise<void> {
        await expect(this.enterPassword).toBeVisible();
        await expect(this.errorMessage).toHaveText(expectedErrorMessage);
    }
}