import { test, expect } from '@playwright/test';

test.describe('Playground', () => {
  test('basic test', async ({ page }) => {
    await page.goto('/play');
    const editor = page.locator('div[role="textbox"] p');
    await editor.type('Hello World');
    await page.click('button:has-text("submit")');
    // await expect(title).toHaveText('Playwright');
  });
});
