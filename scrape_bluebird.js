const https = require('https');
const http = require('http');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', err => reject(err));
  });
}

async function scrape() {
  console.log("Fetching homepage...");
  let html;
  try {
    html = await fetchUrl('https://bluebirdarts.pk/');
  } catch(e) {
    console.error("Failed to fetch homepage:", e);
    return;
  }
  
  // Extract product links. Usually they have /product/ in them.
  const productLinks = [...new Set([...html.matchAll(/href="([^"]+\/product\/[^"]+)"/g)].map(m => m[1]))];
  console.log(`Found ${productLinks.length} product links on homepage.`);
  
  // Also look for categories to find more products
  const categoryLinks = [...new Set([...html.matchAll(/href="([^"]+\/product-category\/[^"]+)"/g)].map(m => m[1]))];
  console.log(`Found ${categoryLinks.length} category links.`);
  
  let allProductLinks = new Set(productLinks);
  
  for (const catLink of categoryLinks) {
    try {
      console.log("Fetching category:", catLink);
      const catHtml = await fetchUrl(catLink);
      const links = [...new Set([...catHtml.matchAll(/href="([^"]+\/product\/[^"]+)"/g)].map(m => m[1]))];
      links.forEach(l => allProductLinks.add(l));
    } catch(e) {
      console.error("Failed to fetch category:", catLink);
    }
  }
  
  const products = [];
  
  for (const link of allProductLinks) {
    try {
      console.log("Scraping product:", link);
      const pHtml = await fetchUrl(link);
      
      const titleMatch = pHtml.match(/<h1[^>]*class="[^"]*product_title[^"]*"[^>]*>([^<]+)<\/h1>/);
      const title = titleMatch ? titleMatch[1].trim() : 'Unknown Product';
      
      const imgMatch = pHtml.match(/<meta property="og:image" content="([^"]+)"/);
      let image = imgMatch ? imgMatch[1] : '';
      
      // Try to download image if exists
      let localImagePath = '';
      if (image) {
        const imgName = image.split('/').pop().split('?')[0];
        localImagePath = `/bluebird/${imgName}`;
        // We will just save the link for now, or download it?
        // Let's just keep the absolute URL for now, user can download later or use remotePattern
      }
      
      // Short description
      let shortDesc = '';
      const descMatch = pHtml.match(/<div class="woocommerce-product-details__short-description">([\s\S]*?)<\/div>/);
      if (descMatch) {
        shortDesc = descMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      } else {
        const ogDesc = pHtml.match(/<meta property="og:description" content="([^"]+)"/);
        shortDesc = ogDesc ? ogDesc[1] : '';
      }
      
      products.push({
        name: title,
        slug: link.split('/').filter(Boolean).pop(),
        image: image,
        description: shortDesc,
        url: link
      });
      
    } catch (e) {
      console.error("Failed to scrape product:", link);
    }
  }
  
  const fs = require('fs');
  fs.writeFileSync('bluebird_scraped.json', JSON.stringify(products, null, 2));
  console.log(`Saved ${products.length} products to bluebird_scraped.json`);
}

scrape();
