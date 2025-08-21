import {test,expect} from '@playwright/test'

test('handle multi-select dropdown', async ({page})=> {
    
    await page.goto('https://testautomationpractice.blogspot.com/');

    // await page.selectOption('#colors',['Red', 'Yellow', 'Blue']);

    //Assertions
    //Number of options in dropdown
    // const colorOptions = await page.locator('#colors option');
    // await expect(colorOptions).toHaveCount(7);

    //check number of options by using JS array
    // const colorOptions = await page.$$('#colors option');
    // await expect(colorOptions.length).toBe(7); 

    //check the present of the dropdown value
    const colorOptions = await page.locator('#colors').textContent();
    await expect(colorOptions.includes('Blue')).toBeTruthy();
    await expect(colorOptions.includes('Black')).toBeFalsy();


    await page.waitForTimeout(5000);

})