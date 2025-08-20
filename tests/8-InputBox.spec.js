import {test,expect} from '@playwright/test';

test('inputbox',async ({page}) => {
    
    await page.goto('https://demo.nopcommerce.com/register?returnUrl=%2F');

    //check input box
    const firstNameTextBox = await page.locator('#FirstName');
    expect(firstNameTextBox).toBeVisible();
    expect(firstNameTextBox).toBeEditable();
    expect(firstNameTextBox).toBeEmpty();
    expect(firstNameTextBox).toBeEnabled();

    await firstNameTextBox.fill('Hieu');
    await page.waitForTimeout(5000); //wait for maximum 5 second

})