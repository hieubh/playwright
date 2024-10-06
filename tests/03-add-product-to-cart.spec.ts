import { expect, test } from "playwright/test";

const shoppingCart = [
    {
        idi: 1,
        name : 'Product 1',
        amount: 2,
        pricePerUnit: 10
    },
    {
        id: 2,
        name: 'Product 2',
        amount: 2,
        pricePerUnit: 20
    },
    {
        id: 3,
        name: 'Product 3',
        amount: 3,
        pricePerUnit: 30
    }
];

const totalPriceItem1 = shoppingCart[0].amount * shoppingCart[0].pricePerUnit;
const totalPriceItem2 = shoppingCart[1].amount * shoppingCart[1].pricePerUnit;
const totalPriceItem3 = shoppingCart[2].amount * shoppingCart[2].pricePerUnit;
const totalPrice = totalPriceItem1 + totalPriceItem2 + totalPriceItem3;

test('add product to cart', async( { page } ) => {
    await test.step('Access the webpage', async() => {
        await page.goto('https://material.playwrightvn.com/');
    })

    await test.step('Click on Product page', async() => {
        await page.getByRole('link', { name : /Product page/}).click();
    })

    await test.step('add product to cart', async() => {
        //product 1 : add 2 items
        await page.locator('.product:first-child .add-to-cart').dblclick();
        //product 2 : add 2 items
        await page.locator('.product:nth-child(2) .add-to-cart').dblclick();
        //product 3: add 3 items
        for(let i = 0; i < 3; i++) {
            await page.locator('.product:last-child .add-to-cart').click();
        }
    })

    await test.step('validate shopping cart', async() => {
        //check number of selected product
        await expect(page.locator('#cart-items tr')).toHaveCount(3);
        //validate product 1 has 2 items
        await expect(page.locator('#cart-items tr:first-child td').nth(2)).toHaveText(`${shoppingCart[0].amount}`);
        //validate product 2 has 2 items
        await expect(page.locator('#cart-items tr:nth-child(2) td').nth(2)).toHaveText(`${shoppingCart[1].amount}`);
        //validate product 3 has 3 items
        await expect(page.locator('#cart-items tr:last-child td').nth(2)).toHaveText(`${shoppingCart[2].amount}`);
        //validate product 1 total price
        await expect(page.locator('#cart-items tr:first-child td').nth(3)).toHaveText(`$${totalPriceItem1}.00`);
        //validate product 2 total price
        await expect(page.locator('#cart-items tr:nth-child(2) td').nth(3)).toHaveText(`$${totalPriceItem2}.00`);
        //validate product 3 total price
        await expect(page.locator('#cart-items tr:last-child td').nth(3)).toHaveText(`$${totalPriceItem3}.00`);
        //validate total price
        await expect(page.locator('.total-price')).toHaveText(`$${totalPrice}.00`);
    })

})
