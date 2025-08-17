import {test,expect} from '@playwright/test';

test('Locators', async ({page}) => {
    await page.goto('https://demoblaze.com/');

    //Click on Login button
    await page.click('#login2');

    //Input username
    await page.fill('#loginusername','hieu12');

    //input password
    await page.fill('#loginpassword','abc123');

    //Click on Login button
    await page.click("//button[text()='Log in']");

    //validate Logout btn once login successfully
    expect(page.locator("//a[text()='Log out']")).toBeVisible;

    //wait for Welcome user text to be visible
    await page.waitForSelector('#nameofuser', {timeout: 6000})
    expect(page.locator('#nameofuser')).toContainText('Welcome '+ 'hieu12');


    //close browser
    await page.close();
})