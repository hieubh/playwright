import {test, expect} from 'playwright/test'
let provider = [
    {
        id: 1,
        name: 'The gioi di dong'
    },
    {
        id: 2,
        name: 'Di Dong Viet'
    }
]
let resultTGDD: number;
let resultDDV: number;
test('compare first searched result of iphone 16 via 2 websites', async({browser}) => {
    const context = await browser.newContext();
    await test.step('get the price from thegioididong.vn', async () => {
        let page = await context.newPage();
        await page.goto('https://www.thegioididong.com/');
        //enter iphone 16 to search bar
        await page.getByPlaceholder('Bạn tìm gì...').fill('iphone 16');
        await page.getByPlaceholder('Bạn tìm gì...').press('Enter');
        let result: string | null = await page.locator('.listproduct li:first-child').getAttribute('data-price');
        if(result !== null) {
            resultTGDD = parseFloat(result);
        }
        
        
    })
    await test.step('get the price from didongviet.vn', async () => {
        let newPage = await context.newPage();
        await newPage.goto('https://didongviet.vn/');
        await newPage.getByRole('textbox',{ name : 'Siêu phẩm iPhone 16 Pro'}).fill('iphone 16');
        await newPage.getByRole('textbox',{ name : 'Siêu phẩm iPhone 16 Pro'}).press('Enter');
        await newPage.waitForTimeout(10000);
        let result: string | null = await newPage.locator("//div[@class='mt-4 grid grid-cols-5 gap-2']/div[1]//p[@class='font-bold !text-16']").textContent();
        if(result !== null) {
            resultDDV = parseFloat(result.replace(/[a-zA-Zà-ỹ\.]+/g,''));
        }
    })

    function validatePrice(price: number) {
        if(price < 25000000) {
            console.log('Toi da du tien mua');
        } else {
            console.log('Toi khong du tien mua')
        }
    }

    if(resultTGDD < resultDDV) {
        console.log(`${provider[0].name} co gia iphone 16 re hon`)
        validatePrice(resultTGDD);
    } else {
        console.log(`${provider[1].name} co gia iphone 16 re hon`)
        validatePrice(resultDDV);
    }


})

