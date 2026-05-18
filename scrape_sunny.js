const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeSunny() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  console.log('Navigating to fittings.com.pk...');
  try {
    await page.goto('https://fittings.com.pk/brand/sunny-ceramics/?orderby=price-desc', { waitUntil: 'networkidle2', timeout: 60000 });
    
    const products = await page.evaluate(() => {
      const items = [];
      const productElements = Array.from(document.querySelectorAll('.product, li.product, .type-product'));
      
      for (const el of productElements) {
        // Specifically look for WooCommerce product title heading
        const titleEl = el.querySelector('.woocommerce-loop-product__title') || el.querySelector('.product-title') || el.querySelector('h2');
        let title = titleEl ? titleEl.innerText.trim() : '';
        
        // Remove sale text if it accidentally seeped in
        if (title.startsWith('-') && title.endsWith('%')) {
          title = '';
        }
        
        // Image
        const imgEl = el.querySelector('img');
        const image = imgEl ? (imgEl.dataset.src || imgEl.src) : '';
        
        // Description / Badge
        const linkEl = el.querySelector('a');
        const productDetailPage = linkEl ? linkEl.href : '';

        // Clean up title
        if (!title && linkEl) {
          // Fallback to title attribute of a tag or inner text excluding sale
          title = linkEl.innerText.trim();
        }

        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        if (title && image && !title.includes('%')) {
          items.push({
            slug,
            title,
            image,
            shortDesc: `Premium quality ${title} by Sunny Ceramics.`,
            longDesc: `Enhance your space with the ${title} from Sunny Ceramics. Known for durability, reliable performance, and affordable premium quality sanitary ware in Pakistan.`,
            productDetailPage
          });
        }
      }
      return items;
    });

    console.log(`Found ${products.length} products!`);
    if (products.length > 0) {
      console.log('Sample Product:', products[0]);
      fs.writeFileSync('e:/hat-traders/scraped_sunny_data.json', JSON.stringify(products, null, 2));
      console.log('Saved to scraped_sunny_data.json');
    }
  } catch (err) {
    console.error('Error navigating:', err.message);
  } finally {
    await browser.close();
  }
}

scrapeSunny().catch(console.error);
