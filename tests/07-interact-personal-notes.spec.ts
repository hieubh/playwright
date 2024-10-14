import { test, expect, Page } from 'playwright/test'
let page: Page;
let totalNotes = 0;

test.describe('interact personal notes', () => {
    test.beforeAll( async( {browser} ) => {
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://material.playwrightvn.com/');
        await page.getByRole('link', { name: /Personal notes/ }).click();
    })

    // test.afterAll( async () => {
    //     await page.close();
    // })

    test('create new note | success', async () => {
        await page.getByPlaceholder('Enter note title').fill('first note');
        await page.getByPlaceholder('Enter note content').fill('this is first note');
        await page.getByRole('button', { name : 'Add Note'}).click();
        totalNotes = totalNotes + 1;
        await expect(page.locator('ul li')).toHaveCount(totalNotes);
        await expect(page.locator('ul li')).toBeVisible();
        await expect(page.locator('#note-count')).toContainText(`Total Notes: ${totalNotes}`);
    })

    test('create another note | success', async () => {
        await page.getByPlaceholder('Enter note title').fill('second note');
        await page.getByPlaceholder('Enter note content').fill('this is second note');
        await page.getByRole('button', { name : 'Add Note'}).click();
        totalNotes = totalNotes + 1;
        await expect(page.locator('ul li')).toHaveCount(totalNotes);
        await expect(page.locator('#note-count')).toContainText(`Total Notes: ${totalNotes}`);
    })

    test('Find existing note | success', async() => {
        await page.getByPlaceholder('Search notes...').fill('first note');
        await page.waitForTimeout(2000);
        await expect(page.locator('ul li')).toHaveCount(1);
        await expect(page.locator('#note-count')).toContainText('Total Notes: 1');
    })

    test('Find not existing note | success', async() => {
        await page.getByPlaceholder('Search notes...').fill('random');
        await page.waitForTimeout(2000);
        await expect(page.locator('ul li')).toHaveCount(0);
        await expect(page.locator('#note-count')).toContainText('Total Notes: 0');
        await expect(page.locator('ul li')).toBeHidden();
    })

    test('Edit existing note | success', async() => {
        // clear text in search notes
        await page.getByPlaceholder('Search notes...').clear();
        // click on edit button for first created note
        await page.getByRole('button', { name: 'Edit' }).nth(0).click();
        // Edit on Title and Content on the first-note
        await page.getByPlaceholder('Enter note title').fill('another title');
        await page.getByPlaceholder('Enter note content').fill('another content');
        //click on Add Note button
        await page.getByRole('button', { name : 'Add Note'}).click();
        //check updated content
        await expect(page.locator('li:first-child strong')).toHaveText('another title');
        await expect(page.locator('li:first-child p')).toHaveText('another content');
    })

    test('delete current note then click cancel | success', async () => {
        //click to delete the first note
        //handle prompt
        page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('Are you sure you want to delete this note?');
            await dialog.dismiss();
        })
        await page.getByRole('button', { name: 'Delete' }).nth(0).click();
        //previous first note is not deleted
        await expect(page.locator('li:first-child strong')).toHaveText('another title');
        await expect(page.locator('li:first-child p')).toHaveText('another content');
    })

    test('delete current note then click Ok | success', async () => {
        //click to delete the first note
        //handle prompt
        page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('Are you sure you want to delete this note?');
            await dialog.accept();
        })
        await page.getByRole('button', { name: 'Delete' }).nth(0).click();
        //previous first note is deleted
        await expect(page.locator('li:first-child strong')).not.toHaveText('another title');
        await expect(page.locator('li:first-child p')).not.toHaveText('another content');
    })




})