import { test, expect } from 'playwright/test';

const clickInfo = [
    {
        name: 'Single click',
        count: 1,
        type: 'Đơn',
        otherBtn: 'Không có'
    },
    {
        name: 'Double click',
        count: 2,
        type: 'Đúp',
        otherBtn: 'Không có'
    },
    {
        name: 'Single click with Shift',
        count: 1,
        type: 'Đơn',
        otherBtn: 'Shift'
    },
]

const msg = {
    clickCount : 'Số lần nhấn:',
    typeClick : 'Loại nhấn:',
    pressWithBtn :'Phím kèm theo:',
}

let sumClick = 0;

test('checking mouse event', async( {page} ) => {
    await test.step('Access the website', async() => {
        await page.goto('https://material.playwrightvn.com/');
    })
    await test.step('Click on xu ly mouse event', async() => {
        await page.getByRole('link', { name: /mouse event/ }).click();
    })
    await test.step('single click on button then check the result', async() => {
        await page.locator('#clickArea').click();
        await expect(page.locator('#clickCount')).toHaveText(`${msg.clickCount} ${sumClick = sumClick + clickInfo[0].count}`);
        await expect(page.locator('#clickType')).toHaveText(`${msg.typeClick} ${clickInfo[0].type}`);
        await expect(page.locator('#modifierKeys')).toHaveText(`${msg.pressWithBtn} ${clickInfo[0].otherBtn}`);
    })
    await test.step('double click on button then check the result', async() => {
        await page.locator('#clickArea').dblclick();
        await expect(page.locator('#clickCount')).toHaveText(`${msg.clickCount} ${sumClick = sumClick + clickInfo[1].count}`);
        await expect(page.locator('#clickType')).toHaveText(`${msg.typeClick} ${clickInfo[1].type}`);
        await expect(page.locator('#modifierKeys')).toHaveText(`${msg.pressWithBtn} ${clickInfo[1].otherBtn}`);
    })
    await test.step('single click with shift button then check the result', async() => {
        await page.locator('#clickArea').click({
            button: 'left',
            modifiers: ['Shift']
        })
        await expect(page.locator('#clickCount')).toHaveText(`${msg.clickCount} ${sumClick = sumClick + clickInfo[2].count}`);
        await expect(page.locator('#clickType')).toHaveText(`${msg.typeClick} ${clickInfo[2].type}`);
        await expect(page.locator('#modifierKeys')).toHaveText(`${msg.pressWithBtn} ${clickInfo[2].otherBtn}`);
    })
})