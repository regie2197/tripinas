import { Page, TestInfo } from '@playwright/test';
import { takeScreenshot } from './utils';

const SCREENSHOT_DIR = 'screenshots';

export function generateRandomCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Attaches a screenshot to the Playwright test report.
 * @param page - The Playwright Page object.
 * @param testInfo - The Playwright TestInfo object.
 * @param screenshotName - The name to be used for the screenshot attachment.
 */
export async function attachScreenshot(
  page: Page,
  testInfo: TestInfo,
  screenshotName: string
): Promise<void> {
  await takeScreenshot(page, testInfo, SCREENSHOT_DIR);
}
