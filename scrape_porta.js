const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('porta_test.html', 'utf8');
const $ = cheerio.load(html);

const products = [];
// Assuming woocommerce standard class or similar. Let's try multiple common selectors.
let productElements = $('.product');
if (productElements.length === 0) {
  productElements = $('.product-item, .item, .post, article');
}

console.log('Total potential products found:', productElements.length);

productElements.each((i, el) => {
  const title = $(el).find('h2, h3, .product-title, .title').first().text().trim();
  const link = $(el).find('a').first().attr('href') || $(el).attr('href');
  const img = $(el).find('img').first().attr('src') || $(el).find('img').first().attr('data-src');
  const desc = $(el).find('.description, .excerpt, p').first().text().trim();
  
  if (title) {
    products.push({ title, link, img, desc });
  }
});

console.log('Valid products:', products.length);
if (products.length > 0) {
  console.log(JSON.stringify(products.slice(0, 5), null, 2));
}

// Write to a temporary JSON to inspect
fs.writeFileSync('scraped_products.json', JSON.stringify(products, null, 2));
