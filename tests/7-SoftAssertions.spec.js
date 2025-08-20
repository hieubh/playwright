import {test,expect} from '@playwright/test';

test('Soft Assertions',async ({page}) => {

    await page.goto('https://demoblaze.com/');

    //Hard Assertions
    // await expect(page).toHaveTitle('STORE123');
    // await expect(page).toHaveURL('https://demoblaze.com/');

    // const pageLogo = await page.locator('.navbar-brand');
    // await expect(pageLogo).toBeVisible();

    //Soft Assertions
    await expect.soft(page).toHaveTitle('STORE123');
    await expect(page).toHaveURL('https://demoblaze.com/');

    const pageLogo = await page.locator('.navbar-brand');
    await expect(pageLogo).toBeVisible();
})