const puppeteer = require('puppeteer');

async function getImages() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  await page.goto('https://www.accufit.com.pk/products', { waitUntil: 'networkidle0', timeout: 60000 });
  
  // wait a bit for lazy loaded images
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // scroll down to trigger lazy loading
  await page.evaluate(async () => {
    await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if(totalHeight >= scrollHeight - window.innerHeight){
                clearInterval(timer);
                resolve();
            }
        }, 100);
    });
  });

  const data = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.card, a[href*="/products/"], .product-card'));
    let results = [];
    
    // just grab all images on the page for debugging
    const allImages = Array.from(document.querySelectorAll('img')).map(img => img.src).filter(src => src && src.startsWith('http'));
    
    for (const card of cards) {
       const text = card.innerText.trim();
       const img = card.querySelector('img');
       if (text && img && img.src && img.src.startsWith('http')) {
           results.push({ text: text.substring(0, 50).replace(/\n/g, ' '), image: img.src });
       }
    }
    
    return { allImages, mapped: results };
  });
  
  console.log(JSON.stringify(data, null, 2));
  await browser.close();
}

getImages().catch(console.error);
