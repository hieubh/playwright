import {test,expect} from '@playwright/test';

test('Working on checkbox',async ({page})=> {

    await page.goto('https://demoqa.com/checkbox');

    //Tick on Home
    const homeChkBox = await page.locator('.rct-checkbox');
    await homeChkBox.check();
    await expect(homeChkBox).toBeChecked();
    //un-check
    await homeChkBox.uncheck();
    await expect(homeChkBox).not.toBeChecked();

    //Click on Dropdown
    const homeDropDownBtn = await page.locator("//li[@class='rct-node rct-node-parent rct-node-collapsed']//button")
    await homeDropDownBtn.click();

    //Check the dropdown list is available
    const homeDropDownList = await page.locator('.rct-text ~ ol');
    await page.waitForSelector('.rct-text ~ ol',{timeout:60000});

    await expect(homeDropDownList).toBeVisible()
    

    //List down all options in the dropdown list
    const desktopChkBox = await page.locator("//label[@for='tree-node-desktop']/span[1]");
    const documentsChkBox = await page.locator("//label[@for='tree-node-documents']/span[1]");
    const downloadsChkBox = await page.locator("//label[@for='tree-node-downloads']/span[1]");

    //tick the home checkbox
    await desktopChkBox.check();
    await expect(desktopChkBox).toBeChecked();

    //the other downloads and documents are un-tick
    await expect(documentsChkBox).not.toBeChecked();
    await expect(downloadsChkBox).not.toBeChecked();


})