import {test,expect} from '@playwright/test';

test('Handle Dropdown', async({page})=> {

    await page.goto('https://testautomationpractice.blogspot.com/');

    //Multiple way to select options from Dropdown
    // await page.locator('#country').selectOption({label:'India'}); //label visible text
    // await page.locator('#country').selectOption('India'); //visible text
    // await page.locator('#country').selectOption({value:'uk'}); //value attribute
    // await page.locator('#country').selectOption({index:2}); //index
    // await page.selectOption('#country','India'); //using locator in selectoption

    //Assertion
    //1: number of options in the dropdown - approach 1
    // const countryOptions = await page.locator('#country option');
    // await expect(countryOptions).toHaveCount(10);

    //2: number of options in the dropdown - approach 2
    // const countryOptions = await page.$$('#country option');
    // // console.log(countryOptions.length);
    // await expect(countryOptions.length).toBe(10);

    // //check the presence of value in dropdown - Approach 1
    // const content = await page.locator('#country').textContent();
    // await expect(content.includes('Germany')).toBeTruthy();

    //check the presence of value in dropdown using loop - Approach 2
    const options = await page.$$('#country option');
    let status = false;
    for (const option of options) {
        let value = await option.textContent();
        if(value.includes('Germany')){
            status = true;
            break;
        }
    }

    await expect(status).toBeTruthy();



    await page.waitForTimeout(5000)
})