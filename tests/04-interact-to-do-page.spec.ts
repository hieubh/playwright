import { test,expect } from 'playwright/test';

const taskName = 'Xin chào, đây là bài thực hành ngày 05 tháng 10';
const taskNameEdit = 'Xin chào, đây là bài thực hành ngày 05 tháng 10 - đã chỉnh sửa';

test('interact with to-do page', async({ page })=> {
    await test.step('Access the web', async() => {
        await page.goto('https://material.playwrightvn.com/');
    })
    await test.step('Click on todo Page', async() => {
        await page.getByRole('link', {name: /Todo page/}).click();
    })
    await test.step("insert : 'Xin chao, day la bai thuc hanh ngay 05 thang muoi'", async() => {
        await page.getByPlaceholder('Enter a new task').fill(taskName);
    })
    await test.step('Click on Add Task', async() => {
        await page.getByRole('button').click();
    })
    await test.step('validate after create task sucessfully', async() => {
        //task is created
        await expect(page.locator('ul li')).toHaveCount(1);
        //content is matched with input taskName previously
        await expect(page.locator('ul li span')).toHaveText(taskName);
        //There are 2 buttons
        await expect(page.locator('.actions button')).toHaveCount(2);
        //first button is Edit and last is Delete
        await expect(page.locator('.actions button').nth(0)).toHaveText('Edit');
        await expect(page.locator('.actions button').nth(1)).toHaveText('Delete');
    })
    await test.step('Click on edit then edit the taskName then click Ok to save', async() => {
        page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('Edit Task');
            await dialog.accept(taskNameEdit);
        })

        await page.getByRole('button', { name : 'Edit' }).click();
        await expect(page.getByText(taskNameEdit)).toBeVisible;

    })

    await test.step('Click on delete then check the result', async() => {
        page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('Are you sure you want to delete this task?');
            await dialog.accept();
        })

        await page.getByRole('button', { name : 'Delete'}).click();
        await expect(page.locator('ul li')).toHaveCount(0);

    })

})