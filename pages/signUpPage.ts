import { Page, Locator, expect} from '@playwright/test';

export class SignUpPage {
  public page: Page;
  public readonly headingCreate: Locator;
  public readonly textWelcome: Locator;
  public readonly textFirstName: Locator;
  public readonly textOptional1: Locator;
  public readonly textboxFirstName: Locator;
  public readonly textLastName: Locator;
  public readonly textOptional: Locator;
  public readonly textboxLastName: Locator;
  public readonly textUsername: Locator;
  public readonly textboxUsername: Locator;
  public readonly textEmailAdd: Locator;
  public readonly textboxEmailAdd: Locator;
  public readonly textPassword: Locator;
  public readonly textboxPassword: Locator;
  public readonly textYourPaswordMustContain: Locator;
  public readonly buttonContinue: Locator;
  public readonly linkSignIn: Locator;

constructor(page: Page) {
  this.page = page
  this.headingCreate = page.getByRole('heading', { name: 'Create your account' })
  this.textWelcome = page.getByText('Welcome! Please fill in the')
  this.textFirstName = page.getByText('First name')
  this.textOptional1 = page.getByText('Optional').first()
  this.textboxFirstName = page.getByRole('textbox', { name: 'First name' })
  this.textLastName = page.getByText('Last name')
  this.textOptional = page.getByText('Optional').nth(1)
  this.textboxLastName = page.getByRole('textbox', { name: 'Last name' })
  this.textUsername = page.getByText('Username')
  this.textboxUsername = page.getByRole('textbox', { name: 'Username' })
  this.textEmailAdd = page.getByText('Email address')
  this.textboxEmailAdd = page.getByRole('textbox', { name: 'Email address' })
  this.textPassword = page.getByText('Password')
  this.textboxPassword = page.getByRole('textbox', { name: 'Password' })
  this.textYourPaswordMustContain = page.getByText('Your password must contain 8')
  this.buttonContinue = page.getByRole('button', { name: 'Continue' })
  this.linkSignIn = page.getByRole('link', { name: 'Sign in' })
}

async navigateTo(): Promise<void> {
  await this.page.goto('http://localhost:5173/sign-up');
  await this.page.waitForLoadState('domcontentloaded');
}

async enterAccountDetails(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
  ): Promise<void> {
    await this.textboxFirstName.fill(firstName);
    await this.textboxLastName.fill(lastName);
    await this.textboxUsername.fill(username);
    await this.textboxEmailAdd.fill(email);
    await this.textboxPassword.fill(password);
  }

async submitAccountDetails (): Promise<void> {
    await this.buttonContinue.click();
}

async goToSignInInstead (): Promise<void> {
 await this.linkSignIn.click();
 await expect(this.page).toHaveURL('http://localhost:5173/sign-in');
}

};