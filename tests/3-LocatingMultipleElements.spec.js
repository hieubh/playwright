import {test,expect} from '@playwright/test';

test('Locating multiple elements', async({page}) => {
    await page.goto('https://demoblaze.com/');

    //locate all text from left bar
    // page.waitForSelector('a#itemc', {timeout: 6000})
    // const leftBarItems = await page.$$('a#itemc');
    // for(const leftBarItem of leftBarItems){
    //     const leftBarText = await leftBarItem.textContent();
    //     console.log(leftBarText);
    // }

    //locate all text of the products
    await page.waitForSelector('div>h4>a', {timeout: 6000})
    const prodItems = await page.$$('div>h4>a')
    for(const prodItem of prodItems){
        const itemText = await prodItem.textContent();
        console.log(itemText);
    }
})