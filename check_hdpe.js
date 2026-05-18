const puppeteer = require('puppeteer');

async function checkHdpe() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  console.log('Navigating to hdpe-pipes...');
  await page.goto('https://www.accufit.com.pk/products/hdpe-pipes', { waitUntil: 'networkidle2' });
  
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const text = await page.evaluate(() => document.body.innerText);
  console.log('Page Text:\n', text.substring(0, 1000));
  
  const imgs = await page.evaluate(() => Array.from(document.querySelectorAll('img')).map(img => img.src));
  console.log('Page Images:\n', imgs);
  
  await browser.close();
}

checkHdpe().catch(console.error);
