import { test, expect, type Page } from '@playwright/test';

const loginUrl = 'https://parabank.parasoft.com/parabank/index.htm';
const loginError = 'The username and password could not be verified.';
const validUsername = process.env.PARABANK_USERNAME;
const validPassword = process.env.PARABANK_PASSWORD;

if (!validUsername || !validPassword) {
  throw new Error(
    'ParaBank credentials are missing. Set PARABANK_USERNAME and PARABANK_PASSWORD in the project root .env file.',
  );
}

async function login(page: Page, username: string, password: string) {
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="password"]').fill(password);
  await page.getByRole('button', { name: 'Log In' }).click();
}

test.describe('ParaBank login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(loginUrl);
  });

  test('valid credentials show the Accounts Overview heading', async ({ page }) => {
    await login(page, validUsername, validPassword);

    await expect(page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();
  });

  test('correct username with an incorrect password shows the login error', async ({ page }) => {
    await login(page, validUsername, 'wrong-password');

    await expect(page.getByText(loginError)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Accounts Overview' })).not.toBeVisible();
  });

  test('incorrect username with the correct password shows the login error', async ({ page }) => {
    await login(page, 'wrong-user', validPassword);

    await expect(page.getByText(loginError)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Accounts Overview' })).not.toBeVisible();
  });

  test('incorrect username and password show the login error', async ({ page }) => {
    await login(page, 'wrong-user', 'wrong-password');

    await expect(page.getByText(loginError)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Accounts Overview' })).not.toBeVisible();
  });
});
