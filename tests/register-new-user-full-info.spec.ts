import { test } from '@playwright/test'

test('Register new user with full info', async({page})=> {
    await test.step('Access the webpage', async() => {
        await page.goto('https://material.playwrightvn.com/');
    })

    await test.step('Click on Register Page', async() => {
        await page.getByRole('link', { name : /Register Page \(có đủ các element\)/}).click();
    })

    await test.step('Input all field then check on new created user', async() => {
        const userInfo = {
            username: 'this a test username',
            email: 'test@email.com',
            gender: 'male',
            hobbies: ['reading', 'traveling']
        }
        //input user
        await page.locator("input[id='username']").fill(userInfo.username);
        //input email
        await page.locator("input[id='email']").fill(userInfo.email);
        //tick on gender
        await page.locator(`input[value='${userInfo.gender}']`).check();
        //tick on hobbies
        await page.locator(``)
    })

})