import { Page } from '@playwright/test';
import path from 'path';
import fs from 'fs';

// Use absolute Windows path
const DEFAULT_SCREENSHOT_DIR = path.resolve(
  'C:/Users/MPMRHM/STaA2/tripinas/test-screenshots/'
);

console.log('[Screenshot Utils] Saving screenshots to:', DEFAULT_SCREENSHOT_DIR);

/**
 * Takes a screenshot with a dynamic name based on the test case name and current date.
 */
export async function takeScreenshot(
  page: Page,
  testCaseName: string
): Promise<Buffer> {
  const now = new Date();
  const timestamp = now
    .toISOString()
    .replace(/[:.]/g, '-') // safe for filenames
    .replace('T', '_')
    .replace('Z', '');

  const sanitizedTestCaseName = testCaseName.replace(/[^a-zA-Z0-9]/g, '_');
  const screenshotName = `${sanitizedTestCaseName}_${timestamp}.png`;

  // Ensure dir exists
  if (!fs.existsSync(DEFAULT_SCREENSHOT_DIR)) {
    fs.mkdirSync(DEFAULT_SCREENSHOT_DIR, { recursive: true });
  }

  const screenshotPath = path.join(DEFAULT_SCREENSHOT_DIR, screenshotName);

  console.log(`[Screenshot Utils] Writing: ${screenshotPath}`);

  const screenshotBuffer = await page.screenshot({
    path: screenshotPath,
    fullPage: true,
  });

  return screenshotBuffer;
}

/**
 * Reads the latest screenshot file into a Buffer.
 */
export function readLatestScreenshot(testCaseName: string): Buffer {
  const sanitizedTestCaseName = testCaseName.replace(/[^a-zA-Z0-9]/g, '_');

  const screenshotFiles = fs
    .readdirSync(DEFAULT_SCREENSHOT_DIR)
    .filter((file) => file.startsWith(sanitizedTestCaseName))
    .sort(
      (a, b) =>
        fs.statSync(path.join(DEFAULT_SCREENSHOT_DIR, b)).mtimeMs -
        fs.statSync(path.join(DEFAULT_SCREENSHOT_DIR, a)).mtimeMs
    );

  if (screenshotFiles.length === 0) {
    console.warn(`No screenshots found for test case: ${testCaseName}`);
    return Buffer.alloc(0);
  }

  const latestScreenshot = screenshotFiles[0];
  return fs.readFileSync(path.join(DEFAULT_SCREENSHOT_DIR, latestScreenshot));
}
