const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeFaisalDetails() {
  const markdownText = fs.readFileSync('C:/Users/Anisul/.gemini/antigravity/brain/8bf953db-b44e-4cc2-b0fe-03604ce18573/.system_generated/steps/156/content.md', 'utf8');
  let links = [...markdownText.matchAll(/\]\((https:\/\/faisalsanitary\.com\/product\/[^)]+)\)/g)].map(m => m[1]);
  links = [...new Set(links)].slice(0, 20);
  
  if (links.length === 0) {
    console.log("No links found");
    return;
  }
  
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  console.log(`Deep scraping ${links.length} products...`);
  
  const products = [];
  
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    console.log(`Scraping [${i+1}/${links.length}]: ${link}`);
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

scrapeFaisalDetails().catch(console.error);
