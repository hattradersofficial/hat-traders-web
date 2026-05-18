const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapePorta() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log('Navigating to porta.pk...');
  await page.goto('https://porta.pk/product-category/bathroom/sanitary-ware/', { waitUntil: 'networkidle2' });

  // First we collect at least 20 product detail page URLs from the listing
  let productLinks = [];
  
  while (productLinks.length < 20) {
    const newLinks = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a[href*="/product/"]:not([href*="category"])'));
      return anchors.map(a => a.href).filter(href => href && href.includes('/product/'));
    });
    
    productLinks = [...new Set([...productLinks, ...newLinks])];
    console.log(`Found ${productLinks.length} unique product links.`);

    if (productLinks.length >= 20) break;
    
    // Try to go to next page if not enough
    const nextBtn = await page.$('a.next.page-numbers');
    if (nextBtn) {
      console.log('Going to next page...');
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
        nextBtn.click()
      ]);
    } else {
      console.log('No next page found. Exiting loop.');
      break;
    }
  }

  // Fallback if the first category didn't have enough
  if (productLinks.length < 20) {
    console.log('Navigating to Faucets category to get more products...');
    await page.goto('https://porta.pk/product-category/bathroom/faucets/', { waitUntil: 'networkidle2' });
    const newLinks = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a[href*="/product/"]:not([href*="category"])'));
      return anchors.map(a => a.href).filter(href => href && href.includes('/product/'));
    });
    productLinks = [...new Set([...productLinks, ...newLinks])];
  }
  
  productLinks = productLinks.slice(0, 20); // exactly 20 or less

  console.log(`Deep scraping ${productLinks.length} products...`);
  
  const products = [];
  
  for (const link of productLinks) {
    console.log(`Scraping: ${link}`);
    try {
      await page.goto(link, { waitUntil: 'domcontentloaded' });
      
      const productData = await page.evaluate(() => {
        const titleEl = document.querySelector('h1.product_title');
        const title = titleEl ? titleEl.innerText.trim() : '';
        
        const imgEl = document.querySelector('.woocommerce-product-gallery__image img, .wp-post-image');
        const image = imgEl ? (imgEl.src || imgEl.getAttribute('data-src')) : '';
        
        const descEl = document.querySelector('.woocommerce-product-details__short-description, #tab-description');
        let description = descEl ? descEl.innerText.trim() : '';
        if (description.length > 200) {
          description = description.substring(0, 200) + '...';
        }
        
        return { title, image, description };
      });
      
      if (productData.title) {
        products.push({
          slug: link.split('/').filter(Boolean).pop(),
          title: productData.title,
          image: productData.image,
          shortDesc: productData.description || `Premium product from Porta.`,
          longDesc: productData.description || `This is a high quality product from Porta. It offers durability and excellent finish.`,
          productDetailPage: link
        });
      }
    } catch (e) {
      console.error(`Error scraping ${link}:`, e.message);
    }
  }

  console.log(`Scraped ${products.length} products successfully.`);
  
  const fileContent = `export const portaProducts = ${JSON.stringify(products, null, 2)};`;
  fs.writeFileSync('e:/hat-traders/src/lib/data/portaProducts.ts', fileContent);
  console.log('Saved to src/lib/data/portaProducts.ts');
  
  await browser.close();
}

scrapePorta().catch(console.error);
