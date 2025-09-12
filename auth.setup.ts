import { test as setup } from '@playwright/test';
import fs from 'fs';
import { signInPage } from './pages/signInPage';

const STORAGE_STATE = 'storageState.json';

setup('authenticate', async ({ page }) => {
  // ✅ Skip if state already exists locally
  if (!process.env.CI && fs.existsSync(STORAGE_STATE)) {
    console.log(`⚡ Skipping auth.setup.ts — using existing ${STORAGE_STATE}`);
    return;
  }

  console.log('🔑 Running authentication setup...');

  const signIn = new signInPage(page);
  await signIn.navigateTo();
  await signIn.signIn(process.env.IDENTIFIER!, process.env.PASSWORD!);

  // Save new storage state
  await page.context().storageState({ path: STORAGE_STATE });

  console.log(`✅ Saved fresh ${STORAGE_STATE}`);
});