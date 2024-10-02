import { expect, test } from '@playwright/test'

test('register new user', async({page}) => {
    await test.step('Step 1 : Truy cap webiste', async() => {
        await page.goto('https://material.playwrightvn.com/');
    }) 

    await test.step('Step 2: An vao Bai 1: Register Page', async() => {
        await page.getByRole("link", {name : /Register Page \(có đủ các element\)/ }).click();
    })

    await test.step('Step 3: Dien username, email va an register', async() => {
        const user = 'test user name name name name';
        const email = 'abc@email.com';
        //dien username
        await page.locator("input[id='username']").fill(user);
        //dien email
        await page.locator("input[id='email']").fill(email);
        //an vao register
        await page.locator("button[type='submit']").click();
        //kiem tra user va email duoc tao da dung chua
        expect(page.locator("tr td").nth(1)).toHaveText(user);
        expect(page.locator("tr td").nth(2)).toHaveText(email);
    })
})