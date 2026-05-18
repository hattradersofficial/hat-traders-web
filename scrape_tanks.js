const puppeteer = require('puppeteer');

async function scrapeLamasatzim() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  
  console.log('Navigating to lamasatzim.com...');
  try {
    await page.goto('https://lamasatzim.com/water-tanks/', { waitUntil: 'networkidle2', timeout: 60000 });
    const text = await page.evaluate(() => document.body.innerText);
    console.log('Page Text:\n', text.substring(0, 1000));
    
    const imgs = await page.evaluate(() => Array.from(document.querySelectorAll('img')).map(img => img.src));
    console.log('Page Images:\n', imgs);
  } catch (err) {
    console.error('Error navigating:', err.message);
  } finally {
    await browser.close();
  }
}

scrapeLamasatzim().catch(console.error);
