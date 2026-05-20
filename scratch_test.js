const puppeteer = require('puppeteer');

async function test() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://faisalsanitary.com/product/spindle-under-ground/', { waitUntil: 'domcontentloaded' });
  
  const images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      class: img.className,
      parentClass: img.parentElement ? img.parentElement.className : '',
      grandParentClass: img.parentElement && img.parentElement.parentElement ? img.parentElement.parentElement.className : ''
    }));
  });
  
  console.log(JSON.stringify(images, null, 2));
  await browser.close();
}

test();
