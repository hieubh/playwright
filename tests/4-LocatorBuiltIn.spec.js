import {test,expect} from '@playwright/test';

test('Locator Built-In', async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    
    //check the logo is visible or not by using AltText
    const companyLogo = await page.getByAltText('company-branding');
    await expect(companyLogo).toBeVisible();

    //Locate username and password by using placeholder
    const userName = await page.getByPlaceholder('Username').fill('Admin');
    const password = await page.getByPlaceholder('Password').fill('admin123');

    //Locate login button by using get by role
    const loginBtn = await page.getByRole('button', {type: 'submit'}).click();

    //Locate the text after user login in the upper right left
    const adminName = await page.locator('.oxd-userdropdown-name').textContent();
    await expect(await page.getByText(adminName)).toBeVisible();
})