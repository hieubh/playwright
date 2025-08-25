import {test, expect} from '@playwright/test';

test('handle bootstrap dropdown', async ({page})=>{

    await page.goto('file:///Users/hieu/Desktop/demo1.htm#');


    //click on dropdown
    await page.locator("//div[@class='dropdown mb-3'][3]/button").click();

    //Check on number of options - 1
    // const optionLists = await page.locator("//div[@class='dropdown mb-3'][3]//input");
    // await expect(optionLists).toHaveCount(3); 

    //Check on number of options - 2
    // const optionLists = await page.$$("//div[@class='dropdown mb-3'][3]//input");
    // await expect(optionLists.length).toBe(3);

    //select item in dropbox
    const optionLists = await page.$$("//div[@class='dropdown mb-3'][3]//label");
    for (let option of optionLists)
    {
        const optionValue = await option.textContent();
        console.log(await optionValue);
        if(optionValue.includes('Option A') || optionValue.includes('Option B')){
            //tick
            await option.click();
            //untick
            await option.uncheck();
        }
    }

    await page.waitForTimeout(5000);
})