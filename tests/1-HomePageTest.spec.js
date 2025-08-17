import { test, expect } from '@playwright/test';

test('Home Page', async ({page})=> {

    await page.goto('https://demoblaze.com/');

    const pageTitle = page.title('STORE');
    await expect(page).toHaveURL('https://demoblaze.com/')
    await expect(page).toHaveTitle('STORE');

    page.close();
})