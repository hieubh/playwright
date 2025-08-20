import {test,expect} from '@playwright/test';

test('handle radio button',async ({page})=>{

    await page.goto('https://demo.nopcommerce.com/');

    //check availability for voting part
    const votingOptions = await page.locator('.poll-options li');
    expect(votingOptions).toHaveCount(4);  

    //list down all options
    const excellentOption = await page.locator('.poll-options li:nth-child(1) input');
    const goodOption = await page.locator('.poll-options li:nth-child(2) input');
    const poorOption = await page.locator('.poll-options li:nth-child(3) input');
    const veryBadOption = await page.locator('.poll-options li:nth-child(4) input');

    //check on good option
    await goodOption.check();
    //validate checked status
    await expect(goodOption).toBeChecked();
    await expect(goodOption.isChecked()).toBeTruthy();

    //once checked on good option, other should be empty
    await expect(excellentOption).not.toBeChecked();
    await expect(await excellentOption.isChecked()).toBeFalsy();

    await expect(poorOption).not.toBeChecked();
    await expect(await poorOption.isChecked()).toBeFalsy();

    await expect(veryBadOption).not.toBeChecked();
    await expect(await veryBadOption.isChecked()).toBeFalsy();


    await page.waitForTimeout(5000);


})