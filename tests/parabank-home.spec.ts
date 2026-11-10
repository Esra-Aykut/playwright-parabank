import { test, expect } from '@playwright/test';


test('has title', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page).toHaveTitle('ParaBank | Welcome | Online Banking');
   // await expect(page).toHaveTitle(/ParaBank/);

});

test('register link opens sign-up page', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.getByRole('link', { name: 'register' }).click();
    await expect(page.getByRole('heading', { name: 'Signing up is easy!' })).toBeVisible();
});