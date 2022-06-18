import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`${process.env.BASE_URL}/auth/sign-in`);
  const inputUserName = page.locator('input[name="username"]');
  await inputUserName.type(process.env.TEST_USER_ID);
  const inputPassword = page.locator('input[name="password"]');
  await inputPassword.type(process.env.HASURA_EVENT_SECRET);
  await page.click('form > button:has-text("submit")');
  // await page.waitForURL('*/redirecting');
  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;
