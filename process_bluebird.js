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
  
  let category = p.product_type;
  if (!category) {
    const title = p.title.toLowerCase();
    if (title.includes('canvas')) category = 'Canvas';
    else if (title.includes('brush')) category = 'Brushes';
    else if (title.includes('acrylic')) category = 'Acrylic Paints';
    else if (title.includes('fabric')) category = 'Fabric Paints';
    else if (title.includes('chalk')) category = 'Chalk Paints';
    else if (title.includes('pastel')) category = 'Pastels';
    else if (title.includes('medium') || title.includes('varnish') || title.includes('gesso')) category = 'Mediums & Varnishes';
    else if (title.includes('poster')) category = 'Poster Paints';
    else if (title.includes('bundle')) category = 'Bundles';
    else category = 'Art Supplies';
  }

  // Extract features from body_html if possible
  let features = [];
  const listMatches = p.body_html.match(/<li>(.*?)<\/li>/g);
  if (listMatches) {
    features = listMatches
      .map(m => m.replace(/<[^>]+>/g, '').trim())
      .filter(f => f.length > 5 && f.length < 100)
      .slice(0, 6);
  }
  
  if (features.length < 3) {
    // Try to find bold items or colon separated items
    const strongMatches = p.body_html.match(/<strong>(.*?)<\/strong>.*?:/g);
    if (strongMatches) {
      features = strongMatches
        .map(m => m.replace(/<[^>]+>/g, '').replace(':', '').trim())
        .filter(f => f.length > 3 && f.length < 40)
        .slice(0, 6);
    }
  }

  if (features.length < 3) {
    features = [
      "Premium quality",
      "Authentic Bluebird Arts product",
      "Highly durable",
      "Professional grade"
    ];
  }

  products.push({
    slug: p.handle,
    title: p.title,
    image: image,
    shortDesc: shortDesc || `Premium ${category} by Bluebird Arts`,
    longDesc: desc || `High quality ${category} manufactured by Bluebird Arts.`,
    category: category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    features: features
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
