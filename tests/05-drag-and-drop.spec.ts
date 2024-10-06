import { test, expect } from 'playwright/test';

const dragAndDrop = [
    {
        location: '#piece-1',
        destination: '.dropzones-container .dropzone:first-child'
    },
    {
        location: '#piece-2',
        destination: '.dropzones-container .dropzone:nth-child(2)'
    },
    {
        location: '#piece-3',
        destination: '.dropzones-container .dropzone:nth-child(3)'
    },
    {
        location: '#piece-4',
        destination: '.dropzones-container .dropzone:nth-child(4)'
    }
]

test('drag and drop', async( {page} ) => {
    await test.step('Access the website', async() => {
        await page.goto('https://material.playwrightvn.com/');
    })
    await test.step('Click on Puzzle drag and drop game', async() => {
        await page.getByRole('link', { name: /drag and drop game/} ).click();
    })
    await test.step('drag and drop then check the result', async() => {
        await page.dragAndDrop(dragAndDrop[0].location, dragAndDrop[0].destination);
        await page.waitForTimeout(2000);
        await page.dragAndDrop(dragAndDrop[1].location, dragAndDrop[1].destination);
        await page.waitForTimeout(2000);
        await page.dragAndDrop(dragAndDrop[2].location, dragAndDrop[2].destination);
        await page.waitForTimeout(2000);
        //validate alert
        page.once('dialog', async dialog => {
            expect(dialog.message()).toMatch('Congratulations! You completed the puzzle.')
            dialog.accept();
        })
        await page.dragAndDrop(dragAndDrop[3].location, dragAndDrop[3].destination);
        await page.waitForTimeout(2000);
        //after drag and drop, there will be no elements inside puzzle container
        await expect(page.locator('.puzzle-container .puzzle-piece')).toHaveCount(0);
    })
})