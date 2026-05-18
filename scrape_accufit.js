const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeAccufit() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  page.setDefaultNavigationTimeout(0); // Disable timeout

  console.log('Navigating to accufit.com.pk...');
  await page.goto('https://www.accufit.com.pk/', { waitUntil: 'networkidle2' });

  // Let's grab all links from the page to find product categories
  let allLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(a => a.href);
  });
  
  let productLinks = [...new Set(allLinks)].filter(href => href && (href.includes('/product') || href.includes('/category') || href.includes('/collection')));
  console.log(`Found potential links:`, productLinks);

  // If there are no clear links, let's look for "Products" menu item and click it
  if (productLinks.length === 0) {
    console.log("No direct product links found. Looking for 'Products' link...");
    const productsLink = await page.$x("//a[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'product')]");
    if (productsLink.length > 0) {
      console.log("Clicking on products link:", await (await productsLink[0].getProperty('href')).jsonValue());
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {}), // SPA might not trigger navigation
        productsLink[0].click()
      ]);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      allLinks = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a')).map(a => a.href);
      });
      productLinks = [...new Set(allLinks)].filter(href => href && (href.toLowerCase().includes('product') || href.toLowerCase().includes('category') || href.toLowerCase().includes('pipes') || href.toLowerCase().includes('tank') || href.toLowerCase().includes('solution')));
    }
  }

  // To be safe, let's just evaluate the DOM for category cards or images
  const products = await page.evaluate(() => {
    // Try to find blocks containing titles like "HDPE PIPES", "WATER STORAGE TANKS"
    const targetCategories = [
      "ELECTRICAL DUCT AND FITTINGS", "GARDEN PIPES", "HDPE PIPES", 
      "JOINTING SOLUTION", "PPRC PIPES AND FITTINGS", "PVC ELECTRICAL CONDUIT PIPES", 
      "UPVC PIPES AND FITTINGS", "WATER STORAGE TANKS"
    ];
    
    const results = [];
    
    // Look at all text elements
    const elements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, .title, .product-title, .card-title'));
    
    for (const el of elements) {
      const text = el.innerText.trim().toUpperCase();
      const isMatch = targetCategories.some(tc => text.includes(tc) || tc.includes(text));
      
      if (text.length > 3 && isMatch) {
        // Found a category/product! Let's get its container
        const container = el.closest('div, li, article, a') || el.parentElement;
        
        let image = '';
        const imgEl = container.querySelector('img');
        if (imgEl) image = imgEl.src;
        
        let desc = '';
        const descEl = container.querySelector('p, .description, span');
        if (descEl && descEl !== el) desc = descEl.innerText.trim();
        
        // let's grab some features if there's a list
        let features = [];
        const listEls = container.querySelectorAll('li');
        if (listEls.length > 0) {
          features = Array.from(listEls).map(li => li.innerText.trim());
        }
        
        const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        results.push({
          title: el.innerText.trim(),
          slug,
          image,
          description: desc,
          features
        });
      }
    }
    return results;
  });

  console.log(`Found ${products.length} products on the main/products page.`);
  
  if (products.length > 0) {
    const finalProducts = [];
    const seen = new Set();
    
    for (const p of products) {
      if (!seen.has(p.slug)) {
        seen.add(p.slug);
        
        // Add default features if empty to fulfill user request "where add some feature aout the prodcut"
        let features = p.features;
        if (!features || features.length === 0) {
          features = [
            "Premium quality material",
            "High durability and long life",
            "Resistant to corrosion and chemicals",
            "Manufactured to international standards"
          ];
        }
        
        finalProducts.push({
          slug: p.slug,
          title: p.title,
          image: p.image || "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
          shortDesc: p.description ? p.description.substring(0, 100) + '...' : `Premium ${p.title} manufactured by Accufit.`,
          longDesc: p.description || `Accufit ${p.title} provides superior durability and performance. Designed and manufactured in Pakistan using top-grade materials, perfect for all your construction and plumbing needs.`,
          features: features,
          // LOCAL product detail page
          productDetailPage: `/products/sanitary/accufit/${p.slug}`
        });
      }
    }
    
    const fileContent = `export const accufitProducts = ${JSON.stringify(finalProducts, null, 2)};`;
    const destDir = 'e:/hat-traders/src/lib/data';
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.writeFileSync(`${destDir}/accufitProducts.ts`, fileContent);
    console.log(`Saved to ${destDir}/accufitProducts.ts`);
  } else {
    console.log("Could not find the products via basic DOM query. Page HTML snippet:");
    const html = await page.content();
    console.log(html.substring(0, 1500));
  }

  await browser.close();
}

scrapeAccufit().catch(console.error);
