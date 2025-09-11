import { chromium, FullConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import { signInPage } from './pages/signInPage';

dotenv.config();

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await signInPage.navigateTo();
  await signInPage.signIn(process.env.USERNAME!, process.env.PASSWORD!);

  // Save storage state
  await page.context().storageState({ path: process.env.STORAGE_STATE });

  await browser.close();
}

export default globalSetup;