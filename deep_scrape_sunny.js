const puppeteer = require('puppeteer');
const fs = require('fs');

const urls = [
  'https://fittings.com.pk/product/leaf-one-piece-toilet-sunny-ceramics/',
  'https://fittings.com.pk/product/elephant/',
  'https://fittings.com.pk/product/mercury/',
  'https://fittings.com.pk/product/corel-wall-hang-toilet-sunny-ceramics/',
  'https://fittings.com.pk/product/daiki-studio/',
  'https://fittings.com.pk/product/alpha-under-counter-vanity-sunny-ceramics/',
  'https://fittings.com.pk/product/orient-wall-hang-toilet-sunny-ceramics/',
  'https://fittings.com.pk/product/persian-medium-sunny-ceramics/'
];

async function deepScrapeSunny() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const results = [];

  for (const url of urls) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    console.log(`Deep Scraping: ${url}`);
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const details = await page.evaluate((currentUrl) => {
        // Find title - usually inside h1.product_title or similar
        const titleEl = document.querySelector('h1.product_title, h1, .product-title');
        const title = titleEl ? titleEl.innerText.trim() : '';

        // Find all main product images
        const imgs = Array.from(document.querySelectorAll('.woocommerce-product-gallery img, .product-images img, img.wp-post-image'))
          .map(img => img.src)
          .filter(src => src && src.startsWith('http') && !src.includes('logo') && !src.includes('vite.svg'));

        // Remove duplicate images
        const uniqueImgs = Array.from(new Set(imgs));

        // Find descriptions
        const shortDescEl = document.querySelector('.woocommerce-product-details__short-description, .short-description');
        const shortDesc = shortDescEl ? shortDescEl.innerText.trim() : '';

        const longDescEl = document.querySelector('#tab-description, .description, .entry-content');
        let longDesc = longDescEl ? longDescEl.innerText.trim() : '';

        // If long description contains features, extract them, otherwise generate high-quality fallback
        let features = [];
        const lis = Array.from(document.querySelectorAll('.woocommerce-tabs li, #tab-description li'));
        if (lis.length > 0) {
          features = lis.map(li => li.innerText.trim()).filter(t => t.length > 5 && t.length < 150);
        }

        // Clean up features
        features = Array.from(new Set(features));

        const slug = currentUrl.split('/').filter(Boolean).pop();

        return {
          slug,
          title,
          image: uniqueImgs[0] || '',
          gallery: uniqueImgs,
          shortDesc,
          longDesc,
          features
        };
      }, url);

      results.push(details);
      console.log(`Successfully scraped: ${details.title}`);
    } catch (err) {
      console.error(`Error scraping ${url}:`, err);
    } finally {
      await page.close();
    }
  }

  await browser.close();

  console.log('Scraped Results:', JSON.stringify(results, null, 2));
  fs.writeFileSync('e:/hat-traders/scraped_sunny_deep_data.json', JSON.stringify(results, null, 2));
  console.log('Saved to scraped_sunny_deep_data.json');
}

deepScrapeSunny().catch(console.error);
