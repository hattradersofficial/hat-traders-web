const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('bluebird_products.json', 'utf8'));

const products = [];

raw.forEach(p => {
  if (p.title.includes('Test Product')) return;
  
  let image = '';
  if (p.images && p.images.length > 0) {
    image = p.images[0].src.split('?')[0]; // Remove query params
  }

  // Strip html from body
  let desc = p.body_html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  let shortDesc = desc.substring(0, 150) + (desc.length > 150 ? '...' : '');
  
  let category = p.product_type || 'Art Supplies';
  if (category === '') {
    if (p.title.toLowerCase().includes('canvas')) category = 'Canvas';
    else if (p.title.toLowerCase().includes('brush')) category = 'Brushes';
    else if (p.title.toLowerCase().includes('acrylic')) category = 'Acrylic Paints';
    else if (p.title.toLowerCase().includes('fabric')) category = 'Fabric Paints';
    else if (p.title.toLowerCase().includes('chalk')) category = 'Chalk Paints';
    else category = 'General Art Supplies';
  }

  products.push({
    slug: p.handle,
    title: p.title,
    image: image,
    shortDesc: shortDesc || `Premium ${category} by Bluebird Arts`,
    longDesc: desc || `High quality ${category} manufactured by Bluebird Arts.`,
    category: category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    features: [
      "Premium quality",
      "Authentic Bluebird Arts product",
      "Highly durable",
      "Professional grade"
    ]
  });
});

const fileContent = `export interface BluebirdProduct {
  slug: string;
  title: string;
  image: string;
  shortDesc: string;
  longDesc: string;
  category: string;
  features: string[];
}

export const bluebirdProducts: BluebirdProduct[] = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync('src/lib/data/bluebirdProducts.ts', fileContent);
console.log('Processed ' + products.length + ' bluebird products.');
