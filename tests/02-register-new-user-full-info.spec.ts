import { expect, test } from '@playwright/test';
//@ts-ignore
import path from 'path';

const userInfo = {
    username: 'this a test username',
    email: 'test@email.com',
    gender: 'male',
    hobbies: ['reading', 'traveling'],
    interests: ['Technology', 'Science', 'Sports'],
    country: 'Canada',
    dob: '2023-03-15',
    bio: 'this is a long string',
    profileImage: {
        src: 'C:\\Users\\Admin\\Downloads',
        name: 'Intel-logo-2022.png'
    },
    rating: '10',
    favColor: '#ff0000'
}

test('Register new user with full info', async({page})=> {
    await test.step('Access the webpage', async() => {
        await page.goto('https://material.playwrightvn.com/');
    })

    await test.step('Click on Register Page', async() => {
        await page.getByRole('link', { name : /Register Page \(có đủ các element\)/}).click();
    })

    await test.step('Input all field then check on new created user', async() => {
        //input user
        await page.locator("input[id='username']").fill(userInfo.username);
        //input email
        await page.locator("input[id='email']").fill(userInfo.email);
        //tick on gender
        await page.locator(`input[value='${userInfo.gender}']`).check();
        //tick on hobbies
        await page.locator(`input[value='${userInfo.hobbies[0]}']`).check();
        await page.locator(`input[value='${userInfo.hobbies[1]}']`).check();
        //multiple select interests
        await page.locator('#interests').selectOption(userInfo.interests);
        //select country
        await page.locator('#country').selectOption(userInfo.country);
        //input DOB
        await page.locator('#dob').fill('2023-03-15');
        //upload profile picture
        await page.locator('#profile').setInputFiles(path.join(userInfo.profileImage.src, userInfo.profileImage.name));
        //insert bio
        await page.locator('#bio').fill(userInfo.bio);
        //rating slider
        await page.locator('#rating').fill(userInfo.rating);
        //favorite color
        await page.locator('#favcolor').fill(userInfo.favColor);
        //check the tooltip when hover
        await page.hover('.form-group .tooltip')
        await expect(page.locator("span[class='tooltiptext']")).toBeVisible();
        //click on subscribe
        await page.locator('#newsletter').click();
        await page.locator("//span[@class='slider round']").click();
        //click on register
        await page.getByRole('button', {name:'Register'}).click();

        //verify new record is created
        await expect(page.locator('tbody tr')).toHaveCount(1);
        //verify username
        await expect(page.locator('tr td').nth(1)).toHaveText(userInfo.username);
        //verify email
        await expect(page.locator('tr td').nth(2)).toHaveText(userInfo.email);
        //verify information
        //gender
        await expect(page.locator('tr td').nth(3)).toContainText(`Gender: ${userInfo.gender}`);
        //hobbies
        await expect(page.locator('tr td').nth(3)).toContainText(`Hobbies: ${userInfo.hobbies[0]}, ${userInfo.hobbies[1]}`);
        //country
        await expect(page.locator('tr td').nth(3)).toContainText(`Country: ${userInfo.country.toLowerCase()}`);
        //DOB
        await expect(page.locator('tr td').nth(3)).toContainText(`Date of Birth: ${userInfo.dob}`);
        //Biography
        await expect(page.locator('tr td').nth(3)).toContainText(`Biography: ${userInfo.bio}`);
        //rating
        await expect(page.locator('tr td').nth(3)).toContainText(`Rating: ${userInfo.rating}`);
        //Fav color
        await expect(page.locator('tr td').nth(3)).toContainText(`Favorite Color: ${userInfo.favColor}`);
    })
})