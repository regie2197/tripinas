import { expect, Locator, Page } from '@playwright/test';

export class DashboardPage {

    //Locators
       public readonly pageHeading : Locator;
       public readonly nameInput : Locator;
       public readonly usernameInput : Locator;
       public readonly emailInput : Locator;


    
   constructor(public page: Page) {
      this.pageHeading = page.getByRole('heading', { name: 'Profile' });
      this.nameInput = page.getByTestId('user-fullname');
      this.nameInput = page.getByTestId('user-username');
      this.nameInput = page.getByTestId('user-email');

      

}}