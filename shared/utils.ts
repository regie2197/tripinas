import { Page, TestInfo } from '@playwright/test';
import path from 'path';
import fs from 'fs';

/**
 * Takes a screenshot with a dynamic name based on the test case name and current date.
 * @param page - The Playwright Page object.
 * @param testInfo - The Playwright TestInfo object.
 * @param screenshotDir - The directory where screenshots will be saved (default: 'screenshots').
 * @returns {Promise<Buffer>} - The screenshot as a Buffer.
 */
export async function takeScreenshot(page: Page, testInfo: TestInfo, screenshotDir: string = 'screenshots'): Promise<Buffer> {
  // Generate a human-readable timestamp for the screenshot name
  const now = new Date();
  const timestamp = now.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).replace(/[/,:]/g, '-').replace(/\s/g, '_');

  // Use testInfo.title for the test case name
  const sanitizedTestCaseName = testInfo.title.replace(/[^a-zA-Z0-9]/g, '_');
  const screenshotName = `${sanitizedTestCaseName}_${timestamp}.png`;

  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const screenshotPath = path.join(screenshotDir, screenshotName);
  const screenshotBuffer = await page.screenshot({
    path: screenshotPath,
    fullPage: true,
  });
  return screenshotBuffer;
}
