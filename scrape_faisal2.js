const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeFaisal() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  page.setDefaultNavigationTimeout(0); // Disable timeout

  console.log('Navigating to faisalsanitary.com/products/ ...');
  await page.goto('https://faisalsanitary.com/products/', { waitUntil: 'networkidle2' });

  let productLinks = [];
  
  while (productLinks.length < 20) {
    const newLinks = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a'));
      return anchors.map(a => a.href).filter(href => href && href.includes('/product/'));
    });
    
    productLinks = [...new Set([...productLinks, ...newLinks])];
    console.log(`Found ${productLinks.length} unique product links.`);

    if (productLinks.length >= 20) break;
    
    // pagination
    const nextBtn = await page.$('a.next.page-numbers');
    if (nextBtn) {
      console.log('Going to next page...');
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
        nextBtn.click()
      ]);
    } else {
      break;
    }
  }

  productLinks = productLinks.slice(0, 20);

  console.log(`Deep scraping ${productLinks.length} products...`);
  
  const products = [];
  
  for (let i = 0; i < productLinks.length; i++) {
    const link = productLinks[i];
    console.log(`Scraping [${i+1}/${productLinks.length}]: ${link}`);
    try {
      await page.goto(link, { waitUntil: 'domcontentloaded', timeout: 60000 });
      
      const productData = await page.evaluate(() => {
        const titleEl = document.querySelector('h1.product_title, .product_title');
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
          shortDesc: productData.description || `Premium product from Faisal Sanitary.`,
          longDesc: productData.description || `This is a high quality product from Faisal Sanitary. Built for durability and style.`,
          productDetailPage: link
        });
      }
    } catch (e) {
      console.error(`Error scraping ${link}:`, e.message);
    }
  }

  console.log(`Scraped ${products.length} products successfully.`);
  
  const fileContent = `export const faisalProducts = ${JSON.stringify(products, null, 2)};`;
  const destDir = 'e:/hat-traders/src/lib/data';
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.writeFileSync(`${destDir}/faisalProducts.ts`, fileContent);
  console.log(`Saved to ${destDir}/faisalProducts.ts`);
  
  await browser.close();
}

scrapeFaisal().catch(async (e) => {
  console.error(e);
  process.exit(1);
});
