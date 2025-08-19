import {test,expect} from '@playwright/test';
import { type } from 'os';

test('Assertions', async({ page}) => {
    //open url
    await page.goto('https://demo.nopcommerce.com/register?returnUrl=%2F');

    //Page has url
    await expect(page).toHaveURL('https://demo.nopcommerce.com/register?returnUrl=%2F');

    //Page has title
    await expect(page).toHaveTitle('nopCommerce demo store. Register');

    //Element is visible
    const logo = await page.getByAltText('nopCommerce demo store');
    await expect(logo).toBeVisible({timeout:6000});

    //Control is Enable
    const searchBar = await page.getByLabel('Search store');
    await expect(searchBar).toBeEnabled();

    //Radio is checked
    const maleOption = await page.locator('#gender-male');
    await maleOption.click();
    await expect(maleOption).toBeChecked();

    //Check box is checked
    const newsletterCheckBox = await page.locator('#Newsletter');
    await expect(newsletterCheckBox).toBeChecked

    //Checked by default -> try to click on the box to uncheck
    await newsletterCheckBox.click();
    await expect(newsletterCheckBox).not.toBeChecked();

    //Element to have attribute
    const registerBtn = await page.locator('#register-button');
    await expect(registerBtn).toHaveAttribute('type','submit'); 

    //Element has text
    const pageTitle = await page.locator('.page-title');
    await expect(pageTitle).toHaveText('Register');

    //Element contains text
    await expect(pageTitle).toContainText('ster');

    //Input has a value
    const emailTextBox = await page.locator('#Email');
    await emailTextBox.fill('test@email.com');
    await expect(emailTextBox).toHaveValue('test@email.com');


})